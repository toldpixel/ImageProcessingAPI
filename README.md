# ImageProcessingAPI


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints and Middleware](#endpoints-and-middleware)


## Introduction

An Image Processing API implemented in Node.js with endpoints for resizing images from an existing folder.

## Features

- takes given url parameters and resize according to given width and height
- Resizes the images with the integrated 3rd party application sharp
- Sends back the resized result to the user

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-project.git

## Usage

1. Test the application with 
    ```sh npm test```
    this will create the dist/ folder
2. Run the application with 
    ```sh node dist/```
3. Visit the url 
```localhost:3000/api/images?filename=encenadaport&width=200&height=200```
in your browser

4. Change the parameters 
    - use existing image names from full folder with ?filename=palmtunnel
    - use different sizes &width=500&height=200

5. Resized image output will be in thumbs folder

## Endpoints and Middleware

- Endpoint localhost:3000/api/images
- Middleware-1: readParams(req: CustomRequest, res: Response, next: NextFunction)
- Middleware-2: resizeImage(req: CustomRequest, res: Response, next: NextFunction) 
- Middleware-3: sendImage(req: CustomRequest, res: Response, next: NextFunction)