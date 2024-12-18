const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/users');
      if (!response.ok) {
        throw new Error('Netwerkfout');
      }
      const data = await response.json();
      console.log('Data van de backend:', data);
    } catch (error) {
      console.error('Fout:', error);
    }
  };
  
  fetchData();
  