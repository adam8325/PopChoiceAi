import { useState } from 'react'
import popImage from './assets/pop.png';


function App() {

  const [loadingResponse, setLoadingResponse] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [matchedMovie, setMatchedMovie] = useState(null);

  async function handleClick() {
  if (!matchedMovie) {
    setLoadingResponse(true);

    const userQuery = `${input1} ${input2} ${input3}`;

    try {
      const response = await fetch(
        "https://popchoiceai-worker.openai-api-worker-eleraky.workers.dev",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: userQuery })
        }
      );

      const data = await response.json();
      setMatchedMovie(data[0] || null);
    } catch (err) {
      console.error("Error fetching match:", err);
    }

    setLoadingResponse(false);
  } else {
    setLoadingResponse(false);
    setInput1('');
    setInput2('');
    setInput3('');
    setMatchedMovie(null);
  }
}

  return (
    <div className='w-screen h-screen flex '>
      <div className="w-1/4 h-[80vh] py-5 px-5 border m-auto flex flex-col items-center gap-4 bg-slate-800">
        <header className='flex flex-col items-center mb-4'>
          <img className="h-15" src={popImage} />
          <h1 className='text-white font-bold text-3xl'>PopChoice</h1>
        </header>

        <main className='flex flex-col gap-1'>
          {!matchedMovie ? (
            <>
              <label className='text-xs text-slate-100' htmlFor="lab1">What’s your favorite movie and why?</label>
              <input
                className="bg-slate-500 text-white px-2 py-3 text-xs rounded-sm mb-4"
                type="text"
                id="lab1"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                placeholder="Enter some words"
              />
              <label className='text-xs text-slate-100' htmlFor="lab2">Are you in the mood for something new or a classic?</label>
              <input
                className="bg-slate-500 text-white px-2 py-3 text-xs rounded-sm mb-4"
                type="text"
                id="lab2"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                placeholder="Enter some words"
              />
              <label className='text-xs text-slate-100' htmlFor="lab3">Do you wanna have fun or do you want something serious?</label>
              <input
                className="bg-slate-500 text-white px-2 py-3 text-xs rounded-sm mb-4"
                type="text"
                id="lab3"
                value={input3}
                onChange={(e) => setInput3(e.target.value)}
                placeholder="Enter some words"
              />
            </>
          ) : (
            <section className='text-white flex flex-col gap-4'>
              <h1 className='text-xl font-bold text-center'>{matchedMovie.title} ({matchedMovie.releaseyear})</h1>
              <h3 className='text-xs text-left'>{matchedMovie.content}</h3>
            </section>
          )}

          <button
            onClick={handleClick}
            className='w-full bg-green-300 border rounded-sm h-10 font-bold mt-5 hover:cursor-pointer'
          >
            {!matchedMovie ? "Let's Go" : "Go Again"}
          </button>
        </main>
      </div>
    </div>
  );
}

export default App;
