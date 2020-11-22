const bookRoutes = (app, fs) => {
    // variables
    const dataPath = '../books.json';

    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
          if (err) {
            throw err;
          }
    
          callback(returnJson ? JSON.parse(data) : data);
        });
    };
    
    const writeFile = (fileData, callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
          if (err) {
            throw err;
          }
    
          callback();
        });
    };

    const findBookById = (id, data) => {
      const key = Object.keys(data).find(book => data[book].id === 'id')
      return users.users[key]
    }
    
    
  
    // READ
    app.get('/books', (req, res) => {
      readFile(data => {  
        res.send(data);
      }, true);
    });

    app.get('/books/:id', (req, res) => {
      readFile(data => {  
        const key = Object.keys(data).find(book => data[book].id === req.params.id)
        var book = data[key]
        res.send(book);
      }, true);
    });

    app.delete('/books/:id', function (req, res) {
      readFile(data => {  
        const key = Object.keys(data).find(book => data[book].id === req.params.id)
        if (key === undefined){
          res.status(404).send('cant find book')
          return;
        }

        data = data.filter(function(book){
          return book.id !== req.params.id
        });
        print(data)

        //delete data[key]
 

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(data);
        });
      }, true);
   });

   app.put('/books/:id', (req, res) => {
    readFile(data => {  
      const key = Object.keys(data).find(book => data[book].id === req.params.id)
      if (key === undefined){
        res.status(404).send('cant find book')
        return;
      }
      var book = data[key]
      console.log('BEFORE:\n',book)

      if(req.body.author !== undefined) book.author = req.body.author;
      if(req.body.title !== undefined) book.title = req.body.title;
      if(req.body.isbn !== undefined) book.isbn = req.body.isbn;
      if(req.body.url !== undefined) book.url = req.body.url;

      console.log('AFTER:\n',book)

      data[key] = book

      //delete data[key]


      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(data);
      });
    }, true);

   });

    app.post('/books', (req, res) => {
        const body = req.body

        if(body.title == undefined || body.author == undefined){
            res.status(401).send('Invalid parameters, should have at least title and author');
            return;
        }

        readFile(data => {
            const newBookId = Object.keys(data).length+1;
            
            // add the new book
            body.id = newBookId.toString()
            if(body.isbn == undefined)
              body.isbn = ""                          
            if(body.url == undefined)
                body.url = ""
            
                data[newBookId-1] = body;
    
            writeFile(JSON.stringify(data, null, 2), () => {
                //res.status(200).send('new book added');
                res.status(200).send('Book added to json file');
            });
        }, true);
    });

};
  
  module.exports = bookRoutes;