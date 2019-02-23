import requests

data = {
  'time': '10:00',
  'lux': '100'
}

# print(data['id'])
# print(data['lux'])

response = requests.put('http://localhost:17123/lux', data=data)
print (response.status_code)

