from mongoengine import Document, StringField, IntField

class Book(Document):
    title = StringField(required=True)
    author = StringField(required=True)
    image_url = StringField(required=True)  # Add an image URL field if needed
    books = IntField(required=True)
    users = IntField(required=True)
