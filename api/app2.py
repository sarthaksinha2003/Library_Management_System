from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bookCatalog"

CORS(app)

# Setup MongoDB connection
mongo = PyMongo(app)
client = MongoClient("mongodb://localhost:27017/")
db = client['bookCatalog']
books_collection = db['books']

# Define a default book (this will be added if the collection is empty)
default_book = {
    "title": "Default Book",
    "author": "Default Author"
}

# Function to initialize the database
def init_db():
    # Check if the collection is empty
    if books_collection.count_documents({}) == 0:
        books_collection.insert_one(default_book)  # Add default book
        print("Default book added to the collection.")

# Initialize the database when the server starts
init_db()

@app.route('/')
def home():
    return "Server is up and running!"

# Endpoint to search for books
@app.route('/books/search', methods=['GET'])
def search_books():
    query = request.args.get('query', '').strip()
    
    try:
        if len(query) > 0:  # Perform search if there is a query
            books = books_collection.find({
                "$or": [
                    {"title": {"$regex": query, "$options": "i"}},
                    {"author": {"$regex": query, "$options": "i"}}
                ]
            })
        else:  # Return all books if the query is empty
            books = books_collection.find()

        return dumps(books), 200  # Return JSON representation of the books

    except Exception as e:
        return str(e), 500  # Return error message in case of failure

# Endpoint to add a new book
@app.route('/books/add', methods=['POST'])
def add_book():
    new_book = request.json  # Get JSON data from the request
    try:
        result = books_collection.insert_one(new_book)  # Insert the new book into the collection
        return jsonify({"_id": str(result.inserted_id)}), 201  # Return the ID of the newly created book
    except Exception as e:
        return str(e), 500  # Return error message if something goes wrong

if __name__ == '__main__':
    app.run(port=5001, debug=True)
