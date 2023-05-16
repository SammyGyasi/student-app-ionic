import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';

const StudentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/students', { name, age, grade });
      console.log('Student created:', response.data);
      // Handle any success behavior or navigation logic here

      // Reset the form inputs
      setName('');
      setAge('');
      setGrade('');
    } catch (error) {
      console.error('Error creating student:', error);
      // Handle any error behavior here
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Student Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonInput
            type="text"
            placeholder="Name"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
            required
          />
          <IonInput
            type="number"
            placeholder="Age"
            value={age}
            onIonChange={(e) => setAge(e.detail.value!)}
            required
          />
          <IonInput
            type="text"
            placeholder="Grade"
            value={grade}
            onIonChange={(e) => setGrade(e.detail.value!)}
            required
          />
          <IonButton expand="full" type="submit" fill="solid">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default StudentForm;
