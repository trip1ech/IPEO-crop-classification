# **IPEO Crop Classification**

This project focuses on classifying crops in Brazil using the **LEM+ Dataset** and Sentinel-2 satellite imagery. The analysis includes data preprocessing, feature extraction, and random forest classification.

---

## **Project Overview**

### **1. Sentinel-2 Imagery**
- Processed through **Google Earth Engine** to extract imagery for the specified region and dates.
- Imagery is filtered by cloud cover and clipped to the regions of interest (ROIs).
- Spatial Resoultion: 20m
- All bands available
- **Feburary and March 2020 now are not available due to cloud coverages**
- Exported data available at: [Google Drive Folder](https://drive.google.com/drive/folders/1M8Yk7z0k6hdZa5hiuAXTNJ-zJkQgcefN?usp=sharing).

### **2. LEM+ Dataset**
- Source: [LEM+ Dataset on ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2352340920314359)
- Provides annotated polygons representing different crop types across multiple months, used for training and testing.

---

## **Project Structure**

```plaintext
IPEO-crop-classification/
│
├── EarthEngine-clipped-exports/   # Sentinel-2 imagery clipped to polygons
├── LEM_ROI/                       # Filtered shapefiles (Region of Interest)
│   ├── LEM_ROI.shp
│   ├── LEM_ROI.dbf
│   └── ...
├── LEM_raw/                       # Raw shapefiles from the LEM+ dataset
│   ├── LEM_dataset.shp
│   └── ...
├── gee-script.js                  # Google Earth Engine script for imagery extraction
├── LEM-rf.ipynb                   # Jupyter notebook for random forest implementation
├── LICENSE                        # License file
└── README.md                      # Project documentation (this file)
```

---

## **Methodology**

### **1. Data Preparation**
- Sentinel-2 imagery is filtered by cloud cover (`< 20%`) and clipped to match the LEM+ polygons.

### **2. Feature Extraction**
- Extracted features include:
  - **RGB + NIR bands**: Red, Green, Blue, and Near-Infrared.
  - **Statistical features**: Mean and standard deviation for each band.
  - **Histogram features**: 10 bins for each band.

### **3. Classification**
- A **random forest classifier** is trained on features extracted from imagery.
- Data is split into training and testing sets based on the "Type" field in the LEM dataset.

---

## **Scripts**

### **1. Google Earth Engine Script**
**File**: `gee-script.js`  
**Description**: Used for downloading Sentinel-2 imagery for specific polygons and dates.  
Key Features:
- Clipping imagery to polygons.
- Filtering by cloud cover and exporting data to Google Drive.

### **2. Random Forest Implementation**
**File**: `LEM-rf.ipynb`  
**Description**: Performs random forest classification on extracted features.  
Key Features:
- Feature extraction from Sentinel-2 imagery.
- Model training and evaluation using training/testing spatial splits.
