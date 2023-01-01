import { StatusBar } from "expo-status-bar";
import { Alert, Text, TextInput } from "react-native";
import styled from "@emotion/native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
 
  //add todo

  // input 창에서 엔터 누르면 todo 추가

  const [todos,setTodos] = useState([]);
  const [category,setCategory] = useState('js')
  const [list, setList] = useState('')
  const [editText,setEditText] = useState('')
  const newTodo = {
    id : Date.now(),
    list,
    isDone: false,
    isEdit:false,
    category
  }

  const addTodo= () => {
    setTodos((prev)=>[...prev,newTodo]);
    setList('');
  }
  const setDone = (id)=> {
    const newList = [...todos];
    const idx = newList.findIndex((todo)=>todo.id === id);
    newList[idx].isDone = !newList[idx].isDone;
    setTodos(newList);
  };

  const deleteList = (id)=>{
    Alert.alert("Todo 삭제", "정말 삭제 하시겠습니까?",[
      {
      text:"취소",
      style:"cancel",
      onPress:()=>console.log("취소 클릭")
    },
    {
      text:"삭제",
      style:"destructive",
      onPress:()=>{
        const newLists = todos.filter(el=> el.id !== id);
        setTodos(newLists)}
    },
  ])}

  const isEdit = (id) => {
    const newList = [...todos];
    const idx = newList.findIndex((todo)=>todo.id === id);
    newList[idx].isEdit = !newList[idx].isEdit;
    setTodos(newList);
  }

  const editTodo =(id)=>{
    const newTodos = [...todos];
    const idx = newTodos.findIndex(todo=> todo.id ===id);
    newTodos[idx].list = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  }


  return (
    <StView>
      <StatusBar style="auto" />
      {/* 카테고리 */}
      <StBtnBox>
        <StToggleBtn  background={category === "js"  ? "yellow" : "gray"} onPress={() => setCategory("js")}>
          <Text>Javascript</Text>
        </StToggleBtn>
        <StToggleBtn background={category === "re" ? "yellow" : "gray"} onPress={() => setCategory("re")}>
          <Text>React</Text>
        </StToggleBtn>
        <StToggleBtn background={category === "ct"? "yellow" : "gray"} onPress={() => setCategory("ct")}>
          <Text>Coding Test</Text>
        </StToggleBtn>
        {/* input box */}
      </StBtnBox>
      <StTextInput placeholder="할일을 입력해주세요" value={list} onSubmitEditing={addTodo} onChangeText={setList}   />
      <StatusBar style="auto" />
      {/* list  */}
      <StScrollView>
      {todos.map((e)=>{
        if(category === e.category){
          return(
            <TodoList key={e.id}>
              {e.isEdit ? <EditWrite value={editText} onChangeText={setEditText} onSubmitEditing={()=>editTodo(e.id)}></EditWrite>:<Text style={{textDecorationLine: e.isDone ? "line-through":"none"}}>{e.list}</Text>}
              <TDLBtnBox>
                {/* done */}
                <TDLBtn onPress={()=> setDone(e.id)}>
                  <FontAwesome name="check-square" size={33} color="black" />
                </TDLBtn>
                {/* edit */}
                <TDLBtn onPress={()=>isEdit(e.id)}>
                  <FontAwesome name="pencil-square" size={33} color="black" />
                </TDLBtn>
                {/* delete */}
                <TDLBtn onPress={()=> deleteList(e.id)}>
                  <FontAwesome name="trash" size={33} color="black" />
                </TDLBtn>
              </TDLBtnBox>
            </TodoList>
          )
        }
        
          })}
      </StScrollView>
    </StView>
  );
}

const StView = styled.SafeAreaView`
  width: 100%;
  align-items: center;
`;

const StBtnBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100px;
  margin-top: 30px;
  border-bottom-width: 2px;
`;

const StToggleBtn = styled.TouchableOpacity`
  width: 110px;
  height: 60px;
  background: ${(x) => x.background};
  justify-content: center;
  align-items: center;
`;

const StTextInput = styled.TextInput`
  width: 90%;
  height: 50px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
`;

const StScrollView = styled.ScrollView`
  width: 90%;
  height: 70%;
  border-top-width: 2px;
`;

const TodoList = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  background-color: #d9d9d9;
`;

const TDLBtnBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TDLBtn = styled.TouchableOpacity`
  margin-right: 8px;
`;

const EditWrite = styled.TextInput`
background : white;
flex: 0.8;
`;
