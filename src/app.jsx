import React, { Component } from 'react'
import './app.css';
import Habits from './components/habits';
import Navbar from './components/navbar';


class App extends Component {
  state = {
    habits: [
        {id: 1, name: 'Reading', count: 0},
        {id: 2, name: 'Running', count: 0},
        {id: 3, name: 'Coding', count: 0},
    ]
  };

  handleIncrement = habit => {
    // Incorrect
    // const habits = [...this.state.habits];
    // const index = habits.indexOf(habit);
    // habits[index].count++; 
    //배열 안의 오브젝트를 바로 수정하는 것도 좋지않다.=>수정필요

    // correct-> 아래처럼 수정
    // 배열, 배열안의 오브젝트를 복사해서 수정
    // const habits = this.state.habits.map(item => {
    //   if(item.id === habit.id) {
    //     return {...habit, count: item.count + 1}
    //   }
    //   return item;
    // });

    // this.setState({ habits });
    // this.setState({ habits: habits }); 키와 값의 이름이 같으면 생략이 가능하다.

    //또는 이전 state를 받아서 이걸로 state.habits.map을 돌려서 새로운 state를 리턴.
    this.setState(state => {
      const habits = state.habits.map(item => {
        if(item.id === habit.id) {
          return {...habit, count: item.count + 1}
        }
        return item;
      })
      return {habits};
    })
  }

  handleDecrement = habit => {
    const habits = this.state.habits.map(item => {
      if(item.id === habit.id) {
        const count = item.count - 1;
        return {...habit, count: count < 0 ? 0 : count }
      }
      return item;
    });

    this.setState({ habits });
  };

  handleDelete = habit => {
      // const habits = [...this.state.habits];
      // filter자체가 새로운 배열을 만들어서 감싼다.
      const habits = this.state.habits.filter(item => item.id !== habit.id);
      this.setState({ habits });
  };

  handleAdd = name => {
    const habits = [...this.state.habits, {id: Date.now(), name, count: 0}];
    this.setState({ habits });
  };

  handleReset = () =>{
    // const habits = this.state.habits.map(habit => {
    //   habit.count = 0
    //   return habit;
    // })

    const habits = this.state.habits.map(habit => {
      // habit.count = 0
      if(habit.count !== 0) {
        return {...habit, count: 0}
      }
      return habit;
    })

    this.setState({ habits });
  }

  render() {
    return (
      <>
      <Navbar totalCount={this.state.habits.filter(item => item.count > 0).length}/>
      <Habits 
       habits={this.state.habits}
       onIncrement={this.handleIncrement}
       onDecrement={this.handleDecrement}
       onDelete={this.handleDelete} 
       onAdd={this.handleAdd} 
       onReset={this.handleReset} 
       />
       </>
    )
  }
}
export default App;