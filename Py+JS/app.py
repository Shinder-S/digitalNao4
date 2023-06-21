from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about', strict_slashes=False)
def about():
    return render_template("about.html")

if __name__ == '__main__':
    app.run(debug=True)