import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os
from fastapi import UploadFile

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

async def upload_files(file: UploadFile):
    file_content = await file.read()  

    upload_result = cloudinary.uploader.upload(file_content, resource_type="auto")
    print(upload_result)
    return upload_result["secure_url"]
