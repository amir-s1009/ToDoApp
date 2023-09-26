import { createContext, useEffect, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {

  let [popUp, setPopUp] = useState(false);
  let [input, setInput] = useState("");
  let [list, setList] = useState([]);

  useEffect(()=> {
    /*FileSystem.writeAsStringAsync(FileSystem.documentDirectory+"list.txt", "این مورد در قایل نوشته شده است پس نشان میدهد درست عمل میکند")
    .then(res => console.log(res))
    .catch(err => console.error(err));*/

    FileSystem.readAsStringAsync(FileSystem.documentDirectory+"list.txt")
    .then(res => {
      if(res !== ""){
        let data = res.split("\n");
        while(data[data.length-1] === "")
          data.pop();
        setList(data);
      }
    })
    .catch(err => console.error(err));
  }, [])

  function update(){
    let content = "";
      for(item of list)
        content += `${item}\n`;
      FileSystem.writeAsStringAsync(FileSystem.documentDirectory+"list.txt", content)
      .then(res => {})
      .catch(err => console.error(err));
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ایونت های من</Text>
        <Pressable style={styles.add} onPress={()=> setPopUp(true)}>
          <Text style={styles.addText}>افزودن +</Text>
        </Pressable>
      </View>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {
            list.length === 0? 
            <Text style={{color:"purple", fontSize:18, fontWeight:"700"}}>لیست ایونت های شما خالی است</Text>:
            list.map((act, index) => {
              return(
                <View style={styles.itemBox} key={index}>
                  <Pressable style={styles.delete} onPress={()=> {
                    let updated = [];
                    for(let i = 0 ; i< list.length; i++){
                      if(i !== index)
                        updated.push(list[i]);
                    }
                    list.splice(index, 1);
                    update();
                    setList(updated);
                  }}>
                    <Text style={styles.deleteText}>حذف</Text>
                  </Pressable>
                  <Text style={styles.description}>{act}</Text>
                  <Text style={styles.index}>{index+1}</Text>
                </View>
              )
            })
          }
        </ScrollView>
        <Modal visible={popUp} transparent animationType='fade' onRequestClose={()=> setPopUp(false)}>
          <View style={styles.popUpContainer}>
            <TextInput multiline placeholder='فعالیت رو وارد کن:)' placeholderTextColor={"#DA70D6"} style={styles.input} onChangeText={val => setInput(val)}></TextInput>
            <Pressable style={styles.submit} onPress={()=> {
              list.push(input);
              update();
              setPopUp(false);
            }}>
              <Text style={styles.submitText}>ذخیره</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection : "column",
    width:"100%",
    height:"100%",
  },
  header:{
    flex:2,
    width:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-around",
    paddingTop:70,
    backgroundColor:"#F0F0F0",
    borderBottomColor:"purple",
    borderBottomWidth:1
  },
  title:{
    fontSize:28,
    fontWeight:"900",
    color:"black",
  },
  add:{
    width:"50%",
    borderRadius:100,
    borderColor:"#DA70D6",
    borderWidth:1.5,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    padding:10
  },
  addText:{
    color:"#DA70D6",
    fontSize:18,
    fontWeight:"900"
  },
  listContainer:{
    flex:8,
    width:"100%",
  },
  scrollContainer:{
    width:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    paddingTop:50,
  },
  itemBox:{
    width:"85%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    marginBottom:25,
    borderRadius:100,
    backgroundColor:"#F0F0F0",
    padding:8,
    paddingBottom:20,
    paddingTop:20,
    borderBottomColor:"purple",
    borderBottomWidth:1
  },
  index:{
    flex:1,
    color:"purple",
    fontSize:18,
    fontWeight:"600",
    paddingLeft:20,
  },
  description:{
    flex:7,
    fontSize:16,
    fontWeight:"800",
    flexWrap:"wrap",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    direction:"rtl",
    textAlign:"right",
  },
  delete:{
    flex:2,
    display:"flex",
    padding:2,
    borderRadius:100,
    backgroundColor:"#DA70D6",
  },
  deleteText:{
    color:"white",
    fontSize:18,
    fontWeight:"800",
    textAlign:"center",
    direction:"rtl",
    flexWrap:"wrap",
  },
  popUpContainer:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
    left:"0%",
    height:"75%",
    top:"25%",
    backgroundColor:"white",
  },
  input:{
    width:"80%",
    padding:10,
    borderBottomColor:"#DA70D6",
    borderBottomWidth:1,
    fontSize:18,
    fontWeight:"800",
    direction:"rtl",
    textAlign:"right",
  },
  submit:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    padding:10,
    marginTop:50,
    borderRadius:100,
    borderColor:"#DA70D6",
    borderWidth:1,
    width:"80%",
  },
  submitText:{
    color:"#DA70D6",
    fontSize:20,
    fontWeight:"900",
  }
});
