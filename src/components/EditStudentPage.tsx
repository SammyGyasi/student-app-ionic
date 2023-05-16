import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import axios from 'axios';

interface EditStudentPageProps extends RouteComponentProps<{ id: string }> {}

const EditStudentPage: React.FC<EditStudentPageProps> = ({ match }) => {
  const [student, setStudent] = useState({ name: '', age: '', grade: '' });
  const history = useHistory();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/students/${match.params.id}`);
      const { name, age, grade } = response.data;
      setStudent({ name, age: age.toString(), grade: grade.toString() });
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const handleSave = async () => {
    try {
      const { name, age, grade } = student;
      const studentData = { name, age: parseInt(age), grade: parseInt(grade) };
      await axios.put(`http://localhost:3000/students/${match.params.id}`, studentData);
        history.push('/'); // Redirect to the home page after saving
        history.goBack()// Redirect to the
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Student</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSave}>
          <IonInput
            type="text"
            value={student.name}
            onIonChange={(e) => setStudent({ ...student, name: e.detail.value! })}
          ></IonInput>
          <IonInput
            type="number"
            value={student.age}
            onIonChange={(e) => setStudent({ ...student, age: e.detail.value! })}
          ></IonInput>
          <IonInput
            type="number"
            value={student.grade}
            onIonChange={(e) => setStudent({ ...student, grade: e.detail.value! })}
          ></IonInput>
          <IonButton type="submit">Save</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditStudentPage;
