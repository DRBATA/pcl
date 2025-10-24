"""
MCP Client Bridge for Python Agent
Communicates with Node.js MCP servers via stdio
"""
import asyncio
import json
import logging
from typing import Dict, Any, Optional
import subprocess
import os
from pathlib import Path

logger = logging.getLogger(__name__)

class MCPClient:
    """Client to communicate with MCP servers"""
    
    def __init__(self, server_path: str):
        """
        Initialize MCP client
        
        Args:
            server_path: Path to the MCP server executable (e.g., waterbar-emails)
        """
        self.server_path = server_path
        self.process: Optional[subprocess.Popen] = None
        self.request_id = 0
        
    async def start(self):
        """Start the MCP server process"""
        try:
            import os
            # Get the directory containing the MCP server
            server_dir = os.path.dirname(self.server_path)
            server_file = os.path.basename(self.server_path)
            
            logger.info(f"🔧 Starting MCP server in directory: {server_dir}")
            logger.info(f"🔧 Running: node {server_file}")
            
            # Start the MCP server as subprocess with stdio
            self.process = subprocess.Popen(
                ['node', server_file],
                cwd=server_dir,  # Set working directory
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1
            )
            logger.info(f"✅ MCP server started: {self.server_path}")
        except Exception as e:
            logger.error(f"❌ Failed to start MCP server: {e}")
            raise
    
    async def call_tool(self, name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        """
        Call a tool on the MCP server
        
        Args:
            name: Tool name (e.g., 'send_waterbar_email')
            arguments: Tool arguments
            
        Returns:
            Tool response
        """
        if not self.process:
            raise RuntimeError("MCP server not started")
        
        self.request_id += 1
        
        request = {
            "jsonrpc": "2.0",
            "id": self.request_id,
            "method": "tools/call",
            "params": {
                "name": name,
                "arguments": arguments
            }
        }
        
        try:
            # Send request
            request_json = json.dumps(request) + "\n"
            self.process.stdin.write(request_json)
            self.process.stdin.flush()
            
            # Read response (blocking - MCP should respond quickly)
            response_line = self.process.stdout.readline()
            response = json.loads(response_line)
            
            if "error" in response:
                logger.error(f"❌ MCP tool error: {response['error']}")
                return {"success": False, "error": response["error"]}
            
            # Extract content from MCP response
            if "result" in response and "content" in response["result"]:
                content = response["result"]["content"]
                if content and len(content) > 0:
                    # Parse the text content (it's JSON stringified)
                    text = content[0].get("text", "{}")
                    return json.loads(text)
            
            return {"success": False, "error": "Invalid response format"}
            
        except Exception as e:
            logger.error(f"❌ MCP call failed: {e}")
            return {"success": False, "error": str(e)}
    
    async def close(self):
        """Close the MCP server process"""
        if self.process:
            self.process.terminate()
            self.process.wait()
            logger.info("🔴 MCP server stopped")


class WaterBarMCP:
    """High-level wrapper for Water Bar email MCP"""
    
    def __init__(self):
        # Path to the built MCP server
        mcp_path = os.getenv(
            "WATERBAR_MCP_PATH",
            "C:\\Users\\azamb\\OneDrive\\Desktop\\THE.WATER.BAR\\mcp-waterbar-emails\\build\\index.js"  # Windows default
        )
        self.client = MCPClient(mcp_path)
        
    async def start(self):
        """Start the MCP client"""
        await self.client.start()
    
    async def send_follow_up_email(
        self,
        customer_name: str,
        customer_email: str,
        consumed_drinks: list,
        remaining_drinks: list,
        booking_context: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        Send follow-up email for drink consumption
        
        Args:
            customer_name: Customer's name
            customer_email: Customer's email
            consumed_drinks: List of consumed drink names
            remaining_drinks: List of remaining drinks with names/quantities
            booking_context: Optional booking/experience info
        """
        # Build the email data
        data = {
            "customerName": customer_name,
            "consumedCount": len(consumed_drinks),
            "consumedDrinks": consumed_drinks,
            "remainingDrinks": remaining_drinks,
            "totalDrinks": len(consumed_drinks) + len(remaining_drinks)
        }
        
        # Add booking context if available
        if booking_context:
            data["experienceName"] = booking_context.get("experience_name")
            data["experienceAdvice"] = booking_context.get("advice")
        
        # Call the MCP tool
        return await self.client.call_tool(
            name="send_waterbar_email",
            arguments={
                "flow": "water-bar-followup",
                "to": customer_email,
                "data": data
            }
        )
    
    async def send_completion_email(
        self,
        customer_name: str,
        customer_email: str,
        order_id: str,
        total_drinks: int
    ) -> Dict[str, Any]:
        """Send completion email when all drinks consumed"""
        data = {
            "customerName": customer_name,
            "orderId": order_id,
            "totalDrinks": total_drinks,
            "completionMessage": "Amazing! You've completed your hydration plan. 🎉"
        }
        
        return await self.client.call_tool(
            name="send_waterbar_email",
            arguments={
                "flow": "water-bar-followup",
                "to": customer_email,
                "data": data
            }
        )
    
    async def close(self):
        """Close the MCP client"""
        await self.client.close()
