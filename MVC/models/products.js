const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Products {
    constructor(photo,product_name, price,detail,catagory,total, id) {
        this._photo = photo;
        this.product_name = product_name;  //this = {"product_name" : val, "price": val, _id : val}
        this.price = price;
        this.detail = detail;
        this.catagory = catagory;
        this.total = total;
        this.id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product db.products.updateOne({condition},{action:data});
            // Update the product db.products.updateOne({_id: ObjectId(..)},{$set:{}});
            dbOp = db
                .collection('products')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product db.products.insertOne({"key1":val1, "key2":val2});
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')      //db.products.find({}) ค้นหาทั้งหมด
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('products')   //db.products.find({_id, ObjectId('...)})
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })    //db.products.deleteOne({_id : ObjectID('...)})
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Products;