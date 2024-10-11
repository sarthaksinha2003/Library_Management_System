from root import create_app

api = create_app()

if __name__ == "__main__":  # Corrected the name check
    api.run(debug=True)
