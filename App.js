import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  AppRegistry,
} from "react-native";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newtodos, setNewtodos] = useState("");
  const [isEnabled, setIsenabled] = useState(true);

  useEffect(() => {
    fetch("http://192.168.0.108:3000/todos", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json)
      .then((todos) => setTodos(todos));
  }, []);

  const handleInput = (value) => {
    setNewtodos(value);
  };
  const handleClick = (e) => {
    setIsenabled((previous) => !previous);
    fetch("http://192.168.0.108:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        name: newtodos,
      }),
      headers: {
        Accept: "application.json",
        "content-type": "application/json",
      },
    })
      .then((res) => res.json)
      .then((data) => {
        todos.push(data);
        setTodos(todos);
        setNewtodos(" ");
      });


  };

  const toggleSwitch = (i) => {
    let newList = todos;
    newList.splice(i, 1);
    setTodos([...newList]);
    setIsenabled(true);

    console.log(todos);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          placeholderTextColor="black"
          placeholder="   Enter Todo"
          style={styles.input}
          onChangeText={handleInput}
          value={newtodos}
        />
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text>Add</Text>
        </TouchableOpacity>
        <View style={styles.todolist}>
          {todos.map((item, i) => (
            <Text style={styles.todoitem}>
              {i} {item.name}
              <View style={styles.toggle}>
                <Switch
                  key={i}
                  value={isEnabled}
                  onValueChange={toggleSwitch}
                />
              </View>
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: 350,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#b3cff7",
    textAlign: "center",
    marginBottom: 15,
    height: 45,
  },
  button: {
    backgroundColor: "#b3cff7",
    width: 80,
    height: 40,
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  todolist: {
    marginVertical: 10,
    width: 380,
    alignItems: "center",
    justifyContent: "center",
  },
  todoitem: {
    flex: 1,
    borderColor: "#8FBC8F",
    borderWidth: 4,
    marginVertical: 30,
    width: 350,
    height: 54,
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontWeight: "900",
    fontSize: 17,
    fontFamily: "serif",
    overflow: "scroll",
  },
  toggle: {
    marginTop: 10,
    paddingTop: 10,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    height: 32,
    width: 100,
  },
});

export default Todo;
