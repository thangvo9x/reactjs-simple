
var list;
var Note = React.createClass({
  getInitialState(){
    return {onEdit: false}
  },
  delete:function(){
    $.post("/delete",{idXoa : this.props.id}, function(data){
      list.setState({mang : data});
    })
  },
  edit : function(){
    this.setState({onEdit:true});
  },
  save:function(){
    var note = this;
    $.post("/update",{idSua: this.props.id , noidung: this.refs.txt.value},function(data){
      list.setState({mang:data});
      note.setState({onEdit:false});
    });
  },
  cancel:function(){
    this.setState({onEdit:false});
  },
  render: function (){
    if(!this.state.onEdit){
      return(
          <div className="div-note">
            <p className="note-item">{this.props.children}</p>
            <button onClick={this.delete}>Delete</button>
            <button onClick={this.edit}>Edit</button>
          </div>
      );
    }else{
      return(
          <div className="div-note">
            <input defaultValue={this.props.children} ref="txt" />
            <button onClick={this.cancel}>Cancel</button>
            <button onClick={this.save}>Save</button>
          </div>
      );
    }
  }

});

function addDiv(){
  ReactDOM.render(<InputDiv />, document.getElementById("div-add"));
}

var List = React.createClass({
  getInitialState:function(){
    list = this;
    return {mang: []};
  },
  add:function(){
    this.state.mang.push("NodeJs","ReactJS");
    this.setState(this.state);
  },

  render:function(){
    return(
      <div className="div-list">
        <div id="div-add"></div>
        <button onClick={addDiv}>ADD </button>
        {
          this.state.mang.map(function(note,index){
              return <Note key={index} id={index}>{note}</Note>
          })
        }
      </div>
    )
  },
  componentDidMount:function(){
    $.post("/getNotes",function(data) {
      list.setState({mang: data});
    });
  }
})

var InputDiv = React.createClass({
  send:function(){
    $.post("/add",{note : this.refs.txt.value} , function(data) {
      list.setState({mang: data});
    });
    ReactDOM.unmountComponentAtNode(document.getElementById("div-add"));
  },

  render:function(){
    return (
      <div>
        <input type="text" ref="txt" placeholder="Enter your note"/>
        <button onClick={this.send}> Gửi </button>
      </div>
    )
  }
});


ReactDOM.render(
  <div>
    <List />
  </div>,
  document.getElementById("root")
)
