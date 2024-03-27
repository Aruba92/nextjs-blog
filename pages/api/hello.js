//make the javaController function: when a page do a apiCall (to a bd for example), this "handler" call the api and get the results.

export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' });
  }