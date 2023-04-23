import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

const CustomLink = ({ node, ...props }) => (
  <a {...props} target="_blank" rel="noopener noreferrer" />
);

const MyComponent = ({markdownText}) => {
  
  return (
    <ReactMarkdown
      children={markdownText}
      components={{
        a: CustomLink,
      }}
    />
  );
};

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
    console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);

}
  return (
    <div className="root">
      <Head>
        <title>PiratePump</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>PiratePump</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ahoy pirates, get ready to set sail on your fitness adventure</h2>
          </div>
        </div>

      <div className="prompt-button-container">
        <div className="prompt-container">
          <textarea placeholder="What's yer burning question, matey?" className="prompt-box"   value={userInput} onChange={onUserChangedText} />
        </div>

        <button className="button" onClick={callGenerateEndpoint}> 
        </button>
       </div>
      </div>  

      {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <MyComponent markdownText={apiOutput} /> 
            {/* <ReactMarkdown >{apiOutput}</ReactMarkdown> */}
            {/* <p>{apiOutput}</p> */}
          </div>
        </div>
      )}

      <div className="badge-container grow">
        <a
          href="https://twitter.com/Micky__21_"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>build by @Micky__21_</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
