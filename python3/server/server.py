from flask import Flask, request, render_template
app = Flask(__name__)
file_name = "./sensorData.csv"
myPort = 17123

@app.route('/', methods=['GET'])
def get_html():
  return render_template('./index.html')

@app.route('/lux', methods=['GET'])
def get_lux():
  try:
    f = open(file_name, 'r')
    for row in f:
      lux = row.split(",")[1]
    return lux
  except Exception as e:
    print(e)
    return e
  finally:
    f.close()
  
@app.route('/lux', methods=['PUT'])
def update_lux():
  id = request.form["id"]
  lux = request.form["lux"]
  try:
    f = open(file_name, 'w')
    f.write(id + "," + lux)
    return "succeeded to write"
  except Exception as e:
    print(e)
    return "failed to write"
  finally:
    f.close()

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=myPort)
