export default function RadioGroup({ options, selected, onChange }) {
  return (
    <div className="checkbox-group" style={{
      display: "flex", flexDirection: "column"
    }}>
      {options.map((opt) => (
        <label style={{padding:"10px", fontSize:"22px"}} key={opt.id}>
          <input
            type="radio"
            className="input"
            name="timer"
            id={opt.id}
            checked={selected === opt.id}
            onChange={() => onChange(opt.id)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
