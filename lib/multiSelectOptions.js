module.exports = (option, config, announce, groupChanged, element) => {
  const selectedOptions = Array.from(
    element.querySelectorAll('option[aria-selected="true"]')
  );
  const selectedText = config.announcement.selected;

  let msg = selectedOptions.map((option) => option.innerText).join(' ');
  msg = selectedText ? `${msg} ${selectedText}` : msg;

  announce(msg.trim(), 500);
};
