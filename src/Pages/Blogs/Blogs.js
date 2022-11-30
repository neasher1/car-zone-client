import React from 'react';

const Blogs = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6  max-w-[1440px] mx-auto my-12'>
            <div className='card shadow-sm p-4'>
                <h4 className='font-bold text-xl mb-2'>What are the different ways to manage a state in a React application?</h4>
                <p>
                    There are four main types of state you need to properly manage in your React apps: <br />
                    1. Local state <br />
                    2. Global state <br />
                    3. Server state <br />
                    4. URL state
                </p>
            </div>
            <div className='card shadow-sm p-4'>
                <h4 className='font-bold text-xl mb-2'>What is a unit test? Why should we write unit tests?</h4>
                <p>
                    The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                </p>
            </div>
            <div className='card shadow-sm p-4'>
                <h4 className='font-bold text-xl mb-2'>How does prototypical inheritance work?
                </h4>
                <p>
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object
                </p>
            </div>
            <div className='card shadow-sm p-4'>
                <h4 className='font-bold text-xl mb-2'>React vs. Angular vs. Vue?
                </h4>
                <p>
                    Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
                </p>
            </div>
        </div>
    );
};

export default Blogs;