import os
from flask import Flask,jsonify ,render_template, request

app = Flask(__name__, template_folder='templates')

@app.route('/pokeapi') 
def pokeApi():
    return render_template('pokeApi.html')

@app.route('/') 
def get():
    return "hello"

#Levanta el servidor con un puerto especifico
if __name__ == '__main__':
    app.run(None,3000,debug=True)

