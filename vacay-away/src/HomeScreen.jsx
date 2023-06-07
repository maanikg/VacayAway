export default function HomeScreen() {
    function buttonClick() {
        alert("hi");
    }
    return (
        <div>
            <h1>HomeScreen</h1>
            <div style={{ display: 'flex' }}>
                <h1 style={{ backgroundColor: 'green' }}>Title</h1>
                <button>Explore!</button>
                <button>Curate your plan</button>
            </div>
            <div style={{ display: 'flex' }}>
                <button >My trips</button>
            </div>
            <div style={{ display: 'flex' }}>
                <button onClick={buttonClick} >Log In</button>
            </div>
        </div>
    );
}