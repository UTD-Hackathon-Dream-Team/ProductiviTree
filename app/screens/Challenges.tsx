import React, { useContext } from "react";
import { Container, Content, Text, Header } from "native-base";

var styles = {
  listBox: {
    backgroundColor: "#ff8",
    margin: 20,
    height: 250,
  },
  header: {

    textAlign: "center",
    fontSize: 32,
    padding: 20,
  }
};

const Challenges = () => {
  return (
    <Container>
      <Content>
        <Text style={styles.header}>Challenges</Text>
        <Text style={styles.header}>Weekly</Text>
        <Container style={styles.listBox}>
          <Text>Challenge 1</Text>
        </Container>
        <Text style={styles.header}>Daily</Text>
        <Container style={styles.listBox}>
          <Text>Challenge 2</Text>
        </Container>
      </Content>
    </Container>
  );
};

export default Challenges;
