// import React, { useState, useEffect } from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
// import axios from 'axios';
// import { withRouter, RouteComponentProps } from 'react-router-dom';

// interface StudentListProps extends RouteComponentProps {}

// const StudentList: React.FC<StudentListProps> = ({ history }) => {
//   const [students, setStudents] = useState<any[]>([]);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const deleteStudent = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:3000/students/${id}`);
//       fetchStudents();
//     } catch (error) {
//       console.error('Error deleting student:', error);
//     }
//   };

//   const editStudent = (id: number) => {
//     // Find the student to edit using their ID
//     const studentToEdit = students.find(student => student.id === id);
  
//     // Navigate to the StudentForm page with the student data to edit
//     history.push({
//       pathname: '/student-form',
//       state: { student: studentToEdit }
//     });
//   };
  
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Student List</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonList>
//           {students.map((student) => (
//             <IonItem key={student.id}>
//               <IonLabel>
//                 <h2>{student.name}</h2>
//                 <p>Age: {student.age}</p>
//                 <p>Grade: {student.grade}</p>
//               </IonLabel>
//               <IonButton fill="outline" color="danger" onClick={() => deleteStudent(student.id)}>
//                 Delete
//               </IonButton>
//               <IonButton fill="outline" color="primary" onClick={() => editStudent(student.id)}>
//                 Edit
//               </IonButton>
//             </IonItem>
//           ))}
//         </IonList>
//         <IonButton expand="full" routerLink="/student-form" fill="solid">Add Student</IonButton>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default withRouter(StudentList);


import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface StudentListProps extends RouteComponentProps {}

const StudentList: React.FC<StudentListProps> = ({ history }) => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const editStudent = (id: number) => {
    // Find the student by ID
    const student = students.find((student) => student.id === id);

    // Redirect to the student form page and pass the student information as state
    history.push({
      pathname: '/student-form',
      state: { student }
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Benita App Student List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {students.map((student) => (
            <IonItem key={student.id}>
              <IonLabel>
                <h2>{student.name}</h2>
                <p>Age: {student.age}</p>
                <p>Grade: {student.grade}</p>
              </IonLabel>
              <IonButton fill="outline" color="danger" onClick={() => deleteStudent(student.id)}>
                Delete
              </IonButton>
              <IonButton color="primary" routerLink={`/edit-student/${student.id}`}>
                  Edit
            </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="full" routerLink="/student-form" fill="solid">Add Student</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(StudentList);
