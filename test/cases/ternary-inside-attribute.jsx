const Button = (
  <button
    disabled={loading}
    style={
      loading
        ? { ...buttonStyles, ...buttonDisabledStyles }
         : buttonStyles
    }
  >
    test
  </button>
)
