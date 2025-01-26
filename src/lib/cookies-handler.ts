export const getCookie = (name: string) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return undefined; // Không tìm thấy cookie
};

export const setCookie = (name: string, value: string) => {
  console.log("setting new ", name, " with ", value);
  document.cookie = `${name}=${value};path=/;exprires=;Secure;SameSite=Strict`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;path=/;exprires=Thu, 01 Jan 1970 00:00:01 GMT;Secure;SameSite=Strict`;
};
