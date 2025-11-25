# Test User Credentials

## Login Information

**Email:** `azambata.1984@gmail.com`  
**Password:** Use your existing Supabase authentication

## Test Data Loaded

### MRI Study
- **Study Date:** October 15, 2025
- **Prostate Volume:** 48.99 cc
- **PSA Density:** 0.19 ng/mL²

### MRI Lesions (3 lesions)
1. **Lesion 1** - Left PZ
   - PI-RADS Score: 5 (Very High Risk)
   - Volume: 0.82 cc
   - ADC Mean: 376.27
   - Position: Mid-apex

2. **Lesion 2** - Right PZ
   - PI-RADS Score: 4 (Likely Cancer)
   - Volume: 0.52 cc
   - ADC Mean: 330.17
   - Position: Midland

3. **Lesion 3** - Bilateral TZ
   - PI-RADS Score: 1 (Low Risk)
   - Volume: 0.0 cc
   - Position: Apex

### Biopsy Procedure
- **Biopsy Date:** October 22, 2025
- **Procedure Type:** Fusion-guided
- **Approach:** Transrectal
- **Cores Planned:** 12
- **Cores Actual:** 12
- **Anesthesia:** Local

### Biopsy Cores (6 cores with Gleason grades)
1. **Core 1** - Gleason 4+3 (85% cancer)
   - Core Length: 12mm, Cancer Length: 10mm
   - Perineural Invasion: Yes
   - Extraprostatic Extension: No

2. **Core 2** - Gleason 3+3 (40% cancer)
   - Core Length: 11mm, Cancer Length: 4mm
   - Perineural Invasion: No
   - Extraprostatic Extension: No

3. **Core 3** - Gleason 4+4 (95% cancer)
   - Core Length: 13mm, Cancer Length: 12mm
   - Perineural Invasion: Yes
   - Extraprostatic Extension: Yes

4. **Core 4** - Gleason 3+4 (60% cancer)
   - Core Length: 12mm, Cancer Length: 7mm
   - Perineural Invasion: No
   - Extraprostatic Extension: No

5. **Core 5** - Gleason 2+2 (0% cancer - benign)
   - Core Length: 10mm, Cancer Length: 0mm
   - Perineural Invasion: No
   - Extraprostatic Extension: No

6. **Core 6** - Gleason 3+3 (35% cancer)
   - Core Length: 11mm, Cancer Length: 3mm
   - Perineural Invasion: No
   - Extraprostatic Extension: No

## Dashboard Features

### 4-View Prostate Analysis
The dashboard now displays an integrated 4-view visualization:

1. **3D View (Top-Left)**
   - Rotatable 3D prostate model
   - MRI lesions shown as colored spheres (PI-RADS 1-5)
   - Biopsy cores shown as colored cylinders (Gleason grades)
   - Click to select and view details

2. **Axial Slice (Top-Right)**
   - Top-down view of prostate
   - Slider to move through Y-axis (-1.5 to 1.5)
   - Shows lesions and cores at current slice

3. **Sagittal Slice (Bottom-Left)**
   - Side view of prostate
   - Slider to move through X-axis (-2 to 2)
   - Shows lesions and cores at current slice

4. **Coronal Slice (Bottom-Right)**
   - Front view of prostate
   - Slider to move through Z-axis (-2.5 to 2.5)
   - Shows lesions and cores at current slice

### Color Coding
- **PI-RADS Scores (MRI Lesions):**
  - Green: 1-2 (Low Risk)
  - Yellow: 3 (Equivocal)
  - Orange: 4 (Likely Cancer)
  - Red: 5 (Very High Risk)

- **Gleason Grades (Biopsy Cores):**
  - Green: ≤6 (Low Risk)
  - Yellow: 3+4 (Favorable Intermediate)
  - Orange: 4+3 (Unfavorable Intermediate)
  - Red: ≥8 (High Risk)

## How to Test

1. Navigate to `/dashboard`
2. You should see the 4-View Prostate Analysis section
3. Interact with the visualization:
   - Rotate the 3D model with mouse
   - Click lesions/cores to see details
   - Drag sliders to move through slices
   - Toggle MRI/Biopsy visibility with buttons

## Data Location in Supabase

- **Table:** `mri_studies` - MRI metadata
- **Table:** `mri_lesions` - Individual lesion data with PI-RADS scores
- **Table:** `biopsies` - Biopsy procedure information
- **Table:** `biopsy_cores` - Individual core results with Gleason grades
- **User ID:** `661f29c7-94be-4c4b-99d2-431314daf433`
