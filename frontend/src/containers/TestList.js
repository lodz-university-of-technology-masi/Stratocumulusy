import React from "react";
import "./TestList.css";
import Test from "./Test";

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


const list = [
    {
      id: '1',
      testTitle: 'Próba ognia',
      numberOfQuestions: 10,
      dateAdded: formatDate(Date.now()),
        questions : [
            {
                id: 1,
                questionTitle: "Ile nóg ma stół?",
                questionContent: "4"
            },
            {
                id: 2,
                questionTitle: "Czy pies może skakać?",
                questionContent: "Nie"
            },
            {
                id: 3,
                questionTitle: "Pozbawiony śluzu żołądek strawi sam siebie?",
                questionContent: "Tak"
            }
        ]
    },
    {
        id: '2',
        testTitle: 'Ogniem i wódą',
        numberOfQuestions: 20,
        dateAdded: formatDate(Date.now()),
        questions : [
            {
                id: 1,
                questionTitle: "Czy ISDP jest proste?",
                questionContent: "No przecież"
            },
            {
                id: 2,
                questionTitle: "Testowe pytanie 1?",
                questionContent: "Nie"
            },
            {
                id: 3,
                questionTitle: "Testowe pytanie 2",
                questionContent: "Tak"
            },
            {
                id: 4,
                questionTitle: "Testowe pytanie 3",
                questionContent: "Nie"
            }
        ]

    },
  ];
export default function Tests() {
  return (
    <div>
    {list.map(c => <Test id={c.id} testTitle={c.testTitle} numberOfQuestions={c.numberOfQuestions} dateAdded={c.dateAdded} questions={c.questions}/>)}
   </div> 
  );
}
