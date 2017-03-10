var Search = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleChange: function(event) {
        var text =  event.target.value;

        this.props.onSearch(text);

        this.setState({
            text: text
        });
    },

    render: function() {
        return (
            <div className="search">
                <div className="search__wrapper">
                    <div className="search__content">
                        <input type="text" className="search__input" onChange={this.handleChange}/>
                        <button className="search__button"></button>
                    </div>
                </div>
            </div>
        );
    }
});

var ColorPicker = React.createClass({
    getInitialState: function() {
        return {
            color: '#6195ED'
        };
    },

    componentDidMount: function() {
        this.props.onColorChange(this.state.color);
    },

    handleClick: function(event) {
        event.preventDefault();

        var target = event.target,
            newColor = target.dataset.color;

        this.props.onColorChange(newColor);

        this.setState({
            color: newColor
        });
    },

    render: function() {
        var colors = [
            {
                id: 1,
                color: '#6195ED'
            },
            {
                id: 2,
                color: '#C561ED'
            },
            {
                id: 3,
                color: '#ED6177'
            },
            {
                id: 4,
                color: '#EDD961'
            },
            {
                id: 5,
                color: '#6BED61'
            }
        ];

        return (
            <div className="colorPicker">
                <ul className="colorPicker__list">
                    {
                        colors.map(function(item) {
                            var isActive = item.color === this.state.color ? 'active' : '';

                            return <li key={item.id} className="colorPicker__item"><a href="#" data-color={item.color} style={{backgroundColor: item.color}} className={"colorPicker__link " + isActive} onClick={this.handleClick}></a></li>;
                        }, this)
                    }
                </ul>
            </div>
        );
    }
});

var Note = React.createClass({
    render: function() {
        var style = {
            backgroundColor: this.props.color
        };

        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> x </span>
                {this.props.children}
            </div>
        );
    }
});

var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: '',
            color: 'yellow'
        };
    },

    handleColorChange: function(color) {
        this.setState({
            color: color
        });
    },

    handleTextChange: function(event) {
        var text = event.target.value;

        this.setState({
            text: text
        });
    },

    handleClick: function() {
        var newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);

        this.setState({
            text: ''
        });
    },

    render: function() {
        return (
            <div className="note-editor">
                <textarea placeholder="Enter your text here.." rows={5} className="textarea" value={this.state.text} onChange={this.handleTextChange} />
                <button className="add-button" onClick={this.handleClick}>Add</button>
                <ColorPicker onColorChange={this.handleColorChange} />
            </div>
        );
    }
});

var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {

            this.msnry.reloadItems();
            this.msnry.layout();

        }
    },

    render: function() {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function(note) {
                        return <Note key={note.id} color={note.color} onDelete={onNoteDelete.bind(null, note)}> {note.text} </Note>
                    })
                }
            </div>
        );
    }
});

var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: []
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));

        if (localNotes) {

            this.setState({
                notes: localNotes
            })

        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });

        this.setState({
            notes: newNotes
        });
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({
            notes: newNotes
        });
    },

    handleNoteSearch: function(query) {
        if (!this.notesAll) {
            this.notesAll = this.state.notes;
        }

        var newNotes = this.notesAll.filter(function(item) {
            return item.text.indexOf(query) !== -1;
        });

        this.setState({
            notes: newNotes
        });
    },

    render: function() {
        return (
            <div className="notes-app">
                <div className="app-header">NotesApp</div>
                <Search onSearch={this.handleNoteSearch} />
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.state.notes);

        localStorage.setItem('notes', notes);
    }
});

ReactDOM.render(
<NotesApp />,
    document.querySelector('#mount-point')
);