$(function () {

    var model = {
        init: function () {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function (obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function () {
            return JSON.parse(localStorage.notes);
        },
        getcurrentDate: function () {
            const date = new Date();
            let day = date.getDay();
            let month = date.getMonth();
            const year = date.getFullYear();
            var months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            month = months[month];
            switch (day) {
                case 0:
                    day = 'Sunday';
                    break;
                case 1:
                    day = 'Monday';
                    break;
                case 2:
                    day = 'Tuesday';
                    break;
                case 3:
                    day = 'Wednesday';
                    break;
                case 4:
                    day = 'Thursday';
                    break;
                case 5:
                    day = 'Friday';
                    break;
                case 6:
                    day = 'Saturday';
                    break;
            }
            return {
                day,
                month,
                year,
            }
        }
    };

    var octopus = {
        addNewNote: function (noteStr) {

            model.add({
                content: noteStr,
                time: model.getcurrentDate(),
            });
            view.render();
        },

        getNotes: function () {
            return model.getAllNotes().reverse();
        },

        init: function () {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function () {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function (e) {
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function () {
            var htmlStr = '';
            octopus.getNotes().forEach(function (note) {
                htmlStr += '<li class="note">' +
                    note.content +
                    '<br>' +
                    '<span class="note-date">' + note.time.day + ' </span>' +
                    '<span class="note-date">' + note.time.month + ' </span>' +
                    '<span class="note-date">' + note.time.year + ' </span>' +
                    '</li>';
            });
            this.noteList.html(htmlStr);
        }
    };

    octopus.init();
});