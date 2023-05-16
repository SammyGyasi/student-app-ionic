import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { Student } from './Student';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  // Implement CRUD operations here (add, update, delete)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Student List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {students.map((student) => (
            <IonItem key={student.id}>
              <IonLabel>{student.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default StudentList;
