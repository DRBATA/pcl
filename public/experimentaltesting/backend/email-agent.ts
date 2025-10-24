/**
 * Autonomous Email Follow-Up Agent (TypeScript)
 * - Native Supabase Realtime (WebSocket)
 * - Claude AI personalization
 * - React Email templates
 * - Production-ready for Fly.io
 */

import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WaterBarFollowup from './emails/water-bar-followup';
import { config } from 'dotenv';

// Load environment variables
config();

interface OrderItem {
  id: string;
  order_id: string;
  item_id: string;
  name: string;
  qty: number;
  consumed: boolean;
  updated_at: string;
}

interface Order {
  id: string;
  customer_name: string;
  email: string;
  booking_id?: string;
  items: OrderItem[];
}

interface BookingContext {
  experience_name?: string;
  experience_tags?: string[];
  venue?: string;
}

class EmailFollowUpAgent {
  private supabase: SupabaseClient;
  private anthropic: Anthropic;
  private resend: Resend;
  private channel: RealtimeChannel | null = null;
  private processedItems: Set<string> = new Set();

  constructor() {
    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);

    // Initialize Claude
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      throw new Error('Missing Anthropic API key');
    }
    this.anthropic = new Anthropic({ apiKey: anthropicKey });

    // Initialize Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      throw new Error('Missing Resend API key');
    }
    this.resend = new Resend(resendKey);

    console.log('✅ Email Follow-Up Agent initialized');
  }

  /**
   * Start listening to Supabase Realtime for order_items updates
   */
  async start() {
    console.log('🚀 Starting Email Follow-Up Agent with Realtime...');
    console.log('🔍 Checking Supabase connection...');

    // Test database connection first
    try {
      const { data, error } = await this.supabase
        .from('order_items')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('❌ Database connection error:', error);
        return;
      }
      console.log('✅ Database connection successful');
    } catch (error) {
      console.error('❌ Failed to connect to Supabase:', error);
      return;
    }

    // Subscribe to ALL orders using a wildcard-style listener
    // The trigger sends to: order:{order_id}:items
    // We'll listen to a general channel and handle all order broadcasts
    console.log('📡 Setting up Realtime broadcast subscription...');
    console.log('📢 Listening for item_consumed events from database trigger');
    
    this.channel = this.supabase
      .channel('all-order-items', {
        config: { 
          private: true,
          broadcast: { self: true }
        }
      })
      .on(
        'broadcast',
        { event: 'item_consumed' },
        (payload: any) => {
          console.log('🔔 Realtime broadcast received!', payload);
          // payload.payload contains: { item_id, order_id, item_name, consumed_at }
          this.handleBroadcastConsumption(payload.payload);
        }
      )
      .subscribe((status: string, error: any) => {
        console.log(`📊 Subscription status: ${status}`);
        
        if (status === 'SUBSCRIBED') {
          console.log('✅ Subscribed to order items broadcast updates');
          console.log('👂 Listening for drink consumption via database trigger...');
          console.log('💡 Using broadcast with DB trigger (recommended approach)');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ Realtime subscription error:', error);
          console.log('⚠️  Falling back to polling...');
          this.startPolling();
        } else if (status === 'TIMED_OUT') {
          console.error('⏱️  Realtime subscription timed out');
          console.log('⚠️  Project-level Realtime may not be enabled');
          console.log('🔄 Falling back to polling (30s intervals)...');
          this.startPolling();
        } else if (status === 'CLOSED') {
          console.log('🔴 Realtime channel closed');
          this.startPolling();
        } else {
          console.log(`ℹ️  Realtime status: ${status}`);
        }
      });
  }

  /**
   * Fallback polling method
   */
  private async startPolling() {
    let lastCheck = new Date().toISOString();
    
    console.log('🔄 Starting polling mode...');
    
    setInterval(async () => {
      try {
        const { data: items, error } = await this.supabase
          .from('order_items')
          .select('*')
          .eq('consumed', true)
          .gte('updated_at', lastCheck);
        
        if (error) {
          console.error('❌ Polling error:', error);
          return;
        }
        
        if (items && items.length > 0) {
          console.log(`📊 Found ${items.length} consumed item(s)`);
          
          for (const item of items) {
            if (!this.processedItems.has(item.id)) {
              await this.handleConsumption({ new: item });
            }
          }
        }
        
        lastCheck = new Date().toISOString();
      } catch (error) {
        console.error('❌ Polling error:', error);
      }
    }, 30000); // Poll every 30 seconds
  }

  /**
   * Handle consumption broadcast from database trigger
   */
  private async handleBroadcastConsumption(data: any) {
    try {
      const { item_id, order_id, item_name, consumed_at } = data;
      
      console.log(`📊 Consumption detected: ${item_name} in order ${order_id}`);
      
      // Prevent duplicate processing
      if (this.processedItems.has(item_id)) {
        console.log(`⏭️  Already processed item ${item_id}`);
        return;
      }
      
      this.processedItems.add(item_id);
      
      // Process the consumption update
      await this.processConsumptionUpdate(order_id);
    } catch (error) {
      console.error('❌ Error handling broadcast consumption:', error);
    }
  }

  /**
   * Handle consumption update from Realtime (legacy/fallback)
   */
  private async handleConsumption(payload: any) {
    try {
      const newRecord = payload.new as OrderItem;
      
      // Prevent duplicate processing
      if (this.processedItems.has(newRecord.id)) {
        console.log(`⏭️  Already processed item ${newRecord.id}`);
        return;
      }

      console.log(`📊 Consumption detected: ${newRecord.name} in order ${newRecord.order_id}`);
      this.processedItems.add(newRecord.id);

      // Process the consumption update
      await this.processConsumptionUpdate(newRecord.order_id);
    } catch (error) {
      console.error('❌ Error handling consumption:', error);
    }
  }

  /**
   * Process consumption update and send appropriate email
   */
  private async processConsumptionUpdate(orderId: string) {
    try {
      console.log(`🔄 Processing consumption update for order: ${orderId}`);

      // 1. Fetch order details
      const order = await this.getOrderDetails(orderId);
      if (!order) {
        console.error(`❌ Order not found: ${orderId}`);
        return;
      }

      // 2. Filter out mocktails/pop-up items (category = 'drink') - only track fridge products
      const trackableItems = [];
      for (const item of order.items) {
        const product = await this.getProductDetails(item.item_id);
        if (product && product.category !== 'drink') {
          trackableItems.push(item);
        }
      }
      
      if (trackableItems.length === 0) {
        console.log(`⏭️  No trackable items in order ${orderId} (all mocktails/pop-up products)`);
        return;
      }

      // 3. Analyze consumption (only trackable items)
      const consumedItems = trackableItems.filter(item => item.consumed);
      const remainingItems = trackableItems.filter(item => !item.consumed);
      const totalItems = trackableItems.length;

      console.log(
        `📊 Order ${orderId}: ${consumedItems.length}/${totalItems} consumed, ${remainingItems.length} remaining (${order.items.length - trackableItems.length} mocktails skipped)`
      );

      // 3. Get booking context (if exists)
      const bookingContext = await this.getBookingContext(order);

      // 4. Generate AI personalized message
      const aiAdvice = await this.generatePersonalizedAdvice({
        consumedItems,
        remainingItems,
        bookingContext,
      });

      // 5. Send appropriate email
      if (remainingItems.length > 0) {
        // Follow-up email (still drinks left)
        await this.sendFollowUpEmail(order, consumedItems, remainingItems, aiAdvice);
      } else {
        // Completion email (all drinks consumed)
        await this.sendCompletionEmail(order, consumedItems, aiAdvice);
      }

      console.log(`✅ Email sent to ${order.email}`);
    } catch (error) {
      console.error(`❌ Error processing consumption:`, error);
    }
  }

  /**
   * Fetch order details with items
   */
  private async getOrderDetails(orderId: string): Promise<Order | null> {
    try {
      // Get order
      const { data: order, error: orderError } = await this.supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderError || !order) {
        console.error('Error fetching order:', orderError);
        return null;
      }

      // Get order items
      const { data: items, error: itemsError } = await this.supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (itemsError) {
        console.error('Error fetching order items:', itemsError);
        return null;
      }

      return {
        id: order.id,
        customer_name: order.customer_name || 'Valued Customer',
        email: order.email || order.customer_email,
        booking_id: order.booking_id,
        items: items || [],
      };
    } catch (error) {
      console.error('Error in getOrderDetails:', error);
      return null;
    }
  }

  /**
   * Get booking context for personalization
   */
  private async getBookingContext(order: Order): Promise<BookingContext | null> {
    if (!order.booking_id) return null;

    try {
      const { data: booking, error } = await this.supabase
        .from('bookings')
        .select('experience_name, experience_tags, venue')
        .eq('id', order.booking_id)
        .single();

      if (error || !booking) return null;

      return booking as BookingContext;
    } catch (error) {
      console.error('Error fetching booking context:', error);
      return null;
    }
  }

  /**
   * Look up product details from Supabase
   */
  private async getProductDetails(itemId: string): Promise<any> {
    try {
      const { data: product, error } = await this.supabase
        .from('products')
        .select('name, description, bio_mechanisms, tags, category')
        .eq('id', itemId)
        .single();
      
      if (error || !product) return null;
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  /**
   * Generate personalized advice using Claude AI with rich product context
   */
  private async generatePersonalizedAdvice(context: {
    consumedItems: OrderItem[];
    remainingItems: OrderItem[];
    bookingContext: BookingContext | null;
  }): Promise<string> {
    try {
      const { consumedItems, remainingItems, bookingContext } = context;

      // Look up product details for consumed items (skip category = 'drink' - those are mocktails for pop-ups)
      const productsContext = await Promise.all(
        consumedItems.map(async (item) => {
          const product = await this.getProductDetails(item.item_id);
          if (!product) return null;
          // Skip mocktails (category = 'drink') - only for pop-ups, not fridge items
          if (product.category === 'drink') return null;
          return {
            name: product.name,
            description: product.description,
            benefits: product.bio_mechanisms,
            tags: product.tags
          };
        })
      );

      const validProducts = productsContext.filter(p => p !== null);
      
      // If no valid products (all were mocktails), return generic message
      if (validProducts.length === 0) {
        console.log('⏭️  No trackable products found (all were mocktails/pop-up items)');
        return 'Great job staying hydrated! Keep up the excellent work.';
      }

      // Build rich prompt with product context
      let prompt = `You are a hydration coach. A customer just consumed these drinks:

`;

      validProducts.forEach((product, i) => {
        prompt += `${i + 1}. ${product.name}\n`;
        if (product.description) prompt += `   Description: ${product.description}\n`;
        if (product.benefits) prompt += `   Benefits: ${JSON.stringify(product.benefits)}\n`;
        if (product.tags?.length) prompt += `   Properties: ${product.tags.join(', ')}\n`;
        prompt += `\n`;
      });

      if (remainingItems.length > 0) {
        prompt += `\nRemaining drinks: ${remainingItems.map(i => i.name).join(', ')}`;
      }

      if (bookingContext) {
        prompt += `\n\nExperience context: ${bookingContext.experience_name}`;
        if (bookingContext.experience_tags?.length) {
          prompt += ` (${bookingContext.experience_tags.join(', ')})`;
        }
      }

      prompt += '\n\nProvide a brief, encouraging message (2-3 sentences) that mentions specific benefits of the drinks they consumed. Be scientific but friendly.';

      const message = await this.anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      return message.content[0].type === 'text' ? message.content[0].text : 'Keep up the great hydration!';
    } catch (error) {
      console.error('❌ Error generating AI advice:', error);
      return 'Great job staying hydrated! Keep up the excellent work.';
    }
  }

  /**
   * Send follow-up email (remaining drinks)
   */
  private async sendFollowUpEmail(
    order: Order,
    consumedItems: OrderItem[],
    remainingItems: OrderItem[],
    aiAdvice: string
  ) {
    console.log(`📧 Sending follow-up email to ${order.email}`);

    const emailHtml = await render(
      WaterBarFollowup({
        customerName: order.customer_name,
        consumedCount: consumedItems.length,
        consumedDrinks: consumedItems.map(i => i.name),
        remainingDrinks: remainingItems.map(i => i.name),
        totalDrinks: order.items.length,
        advice: aiAdvice,
        orderId: order.id,
      })
    );

    await this.resend.emails.send({
      from: 'The Water Bar <hello@updates.thewater.bar>',
      to: order.email,
      subject: 'Keep up the hydration! 💧',
      html: emailHtml,
    });
  }

  /**
   * Send completion email (all drinks consumed)
   */
  private async sendCompletionEmail(
    order: Order,
    consumedItems: OrderItem[],
    aiAdvice: string
  ) {
    console.log(`🎉 Sending completion email to ${order.email}`);

    const emailHtml = await render(
      WaterBarFollowup({
        customerName: order.customer_name,
        consumedCount: consumedItems.length,
        consumedDrinks: consumedItems.map(i => i.name),
        remainingDrinks: [],
        totalDrinks: order.items.length,
        advice: aiAdvice,
        orderId: order.id,
      })
    );

    await this.resend.emails.send({
      from: 'The Water Bar <hello@updates.thewater.bar>',
      to: order.email,
      subject: '🎉 Hydration Complete! Great job!',
      html: emailHtml,
    });
  }

  /**
   * Graceful shutdown
   */
  async stop() {
    console.log('🛑 Stopping Email Follow-Up Agent...');
    if (this.channel) {
      await this.supabase.removeChannel(this.channel);
    }
    console.log('✅ Agent stopped');
  }
}

// Start the agent
const agent = new EmailFollowUpAgent();

process.on('SIGINT', async () => {
  await agent.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await agent.stop();
  process.exit(0);
});

agent.start().catch(console.error);

export default EmailFollowUpAgent;
