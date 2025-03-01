try {
    const res = await fetch(url);
    const data = await res.json();
} catch (error) {
    console.error("Error fetching data:", error);
    alert("Failed to fetch data. Please try again.");
}
