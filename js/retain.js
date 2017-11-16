$(function(){

    var model = {
        // create localStorage
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        // create data array to be added notes
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        //  show all notes in localStorage
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };

    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        // initialize model and view
        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
          // the operate container with tools which can be a input blank or a button
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        // loop every element in array , add it to notelist and render it
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                              '<span class="note-date">' + new Date(note.date).toString() + '</span>' +
                               note.content +
                            '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    // initialize app
    octopus.init();
});
