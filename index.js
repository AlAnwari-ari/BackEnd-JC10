const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const port = 1996

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Ari',
    password: 'abc123',
    database: 'tokoberkah',
    port: '3306',
    timezone: 'UTC'
})

app.use(bodyParser.json())

app.get('/', (req, res)=> {
    res.status(200).send('<h1>Welcome To Our API</h1>')
})

app.get('/getkota', (req,res)=> {
    var nama = req.query.nama ? req.query.nama : ''

    var sql = `SELECT * FROM kota WHERE nama LIKE '%${nama}%';`
    
    db.query(sql, (err, results)=>{
        if(err) {
            console.log(err);
            return res.status(500).send(err)
                    
        }

        res.status(200).send(results)
    })
})

app.get('/getkota/:kotaid', (req,res)=> {
    var idKota = req.params.kotaid

    var sql = `SELECT * FROM kota WHERE id = ${idKota};`
    
    db.query(sql, (err, results)=>{
        if(err) {
            console.log(err);
            return res.status(500).send(err)
                    
        }

        res.status(200).send(results)
    })
})

app.get('/gettoko', (req,res)=> {
    // var d = new Date
    var nama = req.query.nama || ''
    var alamat = req.query.alamat ? req.query.alamat : ''
    // var kotaId = req.query.kotaId ? req.query.kotaId : ''
    // var totIncome = req.query.totIncome ? req.query.totIncome : 0
    // var dateFrom = req.query.dateFrom ? req.query.dateFrom : 0
    // var dateTo = req.query.dateTo ? req.query.dateTo : d.getFullYear()
    
    var sql = `SELECT * FROM toko WHERE nama LIKE '%${nama}%'
                                    AND alamat LIKE '%${alamat}%'`

    if(req.query.kotaid) {
        sql += ` AND kotaId = ${req.query.kotaid}`
    }
    if(req.query.incmin) {
        sql += ` AND totalIncome >= ${req.query.incmin}`
    }
    if(req.query.incmax) {
        sql += ` AND totalIncome <= ${req.query.incmax}`
    }
    if(req.query.datefrom) {
        sql += ` AND tanggalBerdiri >= '${req.query.datefrom}'`
    }
    if(req.query.dateto) {
        sql += ` AND tanggalBeridiri <= '${req.query.dateto}'   `
    }

    console.log(req.query);
    
    db.query(sql, (err, results)=>{
        if(err) {
            console.log(err);
            return res.status(500).send(err)
                    
        }

        res.status(200).send(results)
    })
})

app.get('/gettoko/:id', (req,res)=> {
    var sql = `SELECT * FROM kota WHERE id = ${req.params.id};`
    
    db.query(sql, (err, results)=>{
        if(err) {
            console.log(err);
            return res.status(500).send(err)
                    
        }

        res.status(200).send(results)
    })
})

app.post('/addkota', (req,res) => {    
    var listKota = req.body.insertkota

    if (listKota) {
        var sql = `INSERT INTO kota (nama) VALUES ?`
        // for (var i = 1; i < listKota.length; i++) {
        //     sql += `,(${listKota[i]})`
        // }
    
        db.query(sql, [listKota], (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send(results)
        })

    } else {
        res.status(500).send('Tolong isi query insertkota')
    }


})

app.delete('/deletedata/:id', (req,res) => {
    var sql = `DELETE FROM kota 
                WHERE id = ${req.params.id};`
    
    db.query(sql, (err, results)=>{
        if(err) {
            console.log(err);
            return res.status(500).send(err)
                    
        }

        res.status(200).send(results)
    })

})

app.put('/updatedata/:id', (req,res) => {
    var dataUpdate = req.body.kota
    var sql = `UPDATE kota SET ?
                WHERE id = ${req.params.id};`
    
    db.query(sql, dataUpdate, (err, results)=>{
        if(err) {
            console.log(err);
            return res.status(500).send(err)
                    
        }

        res.status(200).send(results)
    })

})

app.listen(port, ()=> console.log(`API akitf di port ${port}`))

