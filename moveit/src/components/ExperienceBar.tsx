export function ExpirenceBar(){
  return(
    <header className="expirience-bar">
      <span>0xp</span>
        <div>
          <div style={{width:"50%"}}/>

          <span className="current-expirence" style={{left:"50%"}}>
            300xp
          </span>
        </div>
      <span>600xp</span>
    </header>
  );
}