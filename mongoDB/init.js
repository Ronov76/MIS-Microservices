db = db.getSiblingDB("nutzerDB")
db.nutzerColl.insertMany([
    {id: 101, name: "Frank", alter: 25},
    {id: 102, name: "Paul", alter: 43},
    {id: 103, name: "Zhou", alter: 46}
])