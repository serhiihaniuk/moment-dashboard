export const extractInstagramUsername = (inputString: string): string => {
  // Remove leading/trailing whitespace
  inputString = inputString.trim();

  // Regular expression pattern to match Instagram usernames
  const pattern =
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?!p\/|explore\/|accounts\/)([A-Za-z0-9_.](?:(?:[A-Za-z0-9_.]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_])))?\/?/;

  // Try to find a match using the pattern
  const match = inputString.match(pattern);

  if (match && match[1]) {
    // If matched, return the captured username
    return match[1];
  } else {
    // If no match found, assume the input might be just the username
    // Remove any leading @ symbol and return
    return inputString.replace(/^@/, "");
  }
};
