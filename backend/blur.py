from PIL import Image
import io
import numpy as np
import sha3

def blur_image(image, kernel_size):
    width, height = image.size
    # Create a new image for the output
    blurred_image = Image.new("RGB", (width, height))
    pixels = np.array(image)
    
    # Calculate the offset for the kernel
    offset = kernel_size // 2

    # Iterate over each pixel in the image
    for y in range(height):
        for x in range(width):
            r_total, g_total, b_total = np.int32(0), np.int32(0), np.int32(0)
            count = 0
            
            # Iterate over the kernel
            for ky in range(-offset, offset + 1):
                for kx in range(-offset, offset + 1):
                    nx, ny = x + kx, y + ky
                    
                    # Check if the neighbor is within bounds
                    if 0 <= nx < width and 0 <= ny < height:
                        r, g, b = pixels[ny, nx]
                        r_total += r
                        g_total += g
                        b_total += b
                        count += 1
            
            # Calculate the average color
            if count > 0:
                r_avg = r_total // count
                g_avg = g_total // count
                b_avg = b_total // count
                blurred_image.putpixel((x, y), (r_avg, g_avg, b_avg))

    return blurred_image

def box_blur_from_image_binary(image_binary, kernel_size):
    # Open the image
    try:
        image = Image.open(io.BytesIO(image_binary))
        image = image.convert("RGB")  # Ensure image is in RGB format
    except IOError:
        print("Error: Unable to open image from binary data. Please ensure it is valid image data.")
        return None

    return blur_image(image, kernel_size)

def box_blur_from_image_path(image_path, kernel_size):
    # Open the image
    try:
        image = Image.open(image_path)
        image = image.convert("RGB")  # Ensure image is in RGB format
    except IOError:
        print(f"Error: Unable to open image file {image_path}. Please ensure it is a valid image.")
        return None

    return blur_image(image, kernel_size)

def keccak_hash_image(image, format):
    # Ensure the input is a PIL Image object
    if not isinstance(image, Image.Image):
        print("Error: Input must be a PIL Image object.")
        return None


    # Create a new Keccak hash object
    keccak = sha3.keccak_256()  # You can use keccak_512() for a larger hash

    # Read the image data in binary mode
    image_bytes = io.BytesIO()
    image.save(image_bytes, format)  # Save the image to a BytesIO object
    image_bytes.seek(0)  # Move to the beginning of the BytesIO object
    keccak.update(image_bytes.read())  # Update the hash with the binary data

    # Return the hexadecimal representation of the hash
    return keccak.hexdigest()

def hexdump_image(image_path):
    try:
        with open(image_path, 'rb') as image_file:
            # Read the image file in binary mode
            image_bytes = image_file.read()
            return image_bytes
    except IOError:
        print(f"Error: Unable to open image file {image_path}. Please ensure it is a valid image.")
        return None

# Test 1
hex_bytes = hexdump_image("input_image.png")
blurred = box_blur_from_image_binary(hex_bytes, kernel_size=8)  # You can also use "input_image.jpg"
if blurred:
    blurred.save("blurred_image.png")  # Save as PNG or JPG as needed
    image_hash = keccak_hash_image(blurred, 'PNG')
    
    expected_hash = "c4a9e2dfb233a86cf55cbe7bd7c9c08a5b9c7fca198e3577f96ad17ae0581e62"  # Replace with your expected hash
    # Assert that the computed hash matches the expected value
    assert image_hash == expected_hash, f"Hash mismatch: expected {expected_hash}, got {image_hash}"
    print(f"Keccak hash of the image: {image_hash}")
    
# Test 2
blurred = box_blur_from_image_path("input_image.png", kernel_size=8)  # You can also use "input_image.jpg"
if blurred:
    blurred.save("blurred_image.png")  # Save as PNG or JPG as needed
    image_hash = keccak_hash_image(blurred, 'PNG')
    
    expected_hash = "c4a9e2dfb233a86cf55cbe7bd7c9c08a5b9c7fca198e3577f96ad17ae0581e62"  # Replace with your expected hash
    # Assert that the computed hash matches the expected value
    assert image_hash == expected_hash, f"Hash mismatch: expected {expected_hash}, got {image_hash}"
    print(f"Keccak hash of the image: {image_hash}")