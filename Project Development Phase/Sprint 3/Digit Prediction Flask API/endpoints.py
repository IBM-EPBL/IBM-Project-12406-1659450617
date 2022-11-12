from flask_pymongo import pymongo 
from flask import request,send_file
from keras.models import load_model
from PIL import Image
import numpy as np

model = load_model("digit-recognition.h5")
uri = 'mongodb+srv://harsh:harsh@cluster0.rxvjk.mongodb.net/?retryWrites=true&w=majority'
client = pymongo.MongoClient(uri)
db = client.check_db
coll = db.check_coll
print('connection has made')

def api_endpoints(endpoints):
    @endpoints.route('/verify', methods=['POST'])
    def verify():
        try:
            email = request.form.get('email')
            pwd = request.form.get("pwd")
            flag = coll.find_one({"email":email, "pwd":pwd})
            status={
                'statuscode' : 200,
            }
            if(flag!=None):
                status['statusmessage'] = "true"
            else:
                status['statusmessage'] = "false"
        except Exception as e:
            status={
                'statuscode' : 400,
                'statusmessage' : str(e)
            }
        return status

    @endpoints.route('/upload', methods=['POST'])
    def upload():
        input = request.files.get("image")
        global format
        format = request.form.get("format")
        img= Image.open(input)
        img = img.resize((200,200))
        img.save("files/input."+format)
        return send_file(path_or_file = "files/input."+format)

    @endpoints.route('/predict', methods=['GET'])
    def predict():
        result = {};
        img=Image.open("files/input."+format).convert("L")
        img = img.resize((28,28))
        im2arr=np.array(img)
        im2arr = im2arr.reshape(1,28,28,1)
        y_pred = model.predict(im2arr)
        result["value"] = int(np.argmax(y_pred))
        print("Predicted value is",result)
        return result

    @endpoints.route('/image', methods=['GET'])
    def image():
        return send_file(path_or_file = "files/input."+format)

    return endpoints
