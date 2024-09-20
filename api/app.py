from root import create_app


api = create_app()

if __name__ == "_main_":
    api.run(debug=True)