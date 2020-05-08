export const TOKEN_KEY = "@API-TOKEN";
export const EMAIL_KEY = "@API-EMAIL";
export const ID_LOGADO_KEY = "@API-ID-LOGADO";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getEmail = () => localStorage.getItem(EMAIL_KEY);
export const getIdLogado = () => localStorage.getItem(ID_LOGADO_KEY);
export const login = (id, token, email) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
  localStorage.setItem(ID_LOGADO_KEY, id);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(ID_LOGADO_KEY);
};