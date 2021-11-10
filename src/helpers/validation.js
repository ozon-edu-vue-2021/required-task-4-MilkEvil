export const validation = {
  messages: {
    required: 'Поле обязательно для заполнения',
    numeric: 'Введите только цифры',
    ruWord: 'Введите только русские буквы',
    enWord: 'Введите только английские буквы',
    email: 'Введите корректный e-mail',
    date: 'Введите корректную дату в указанном формате (дд.мм.гггг)',
    currentLength: (length) => `Введите ${length} символов`,
  },
  required: function(value) {
    return (value === "") ? this.messages.required : null;
  },
  ruWord: function(value) {
    return (/^[а-яА-ЯёЁ]+$/i.test(value)) ? null : this.messages.ruWord;
  },
  enWord: function(value) {
    return (/^[a-zA-Z]+$/i.test(value)) ? null : this.messages.enWord;
  },
  email: function(value) {
    return (/^.+@.+\..+$/i.test(value)) ? null : this.messages.email;
  },
  date: function(value) {
    try {
      let [d, m, y] = value.split('.');
      if (d < 10) d = parseInt(d);
      if (m < 10) m = parseInt(m);

      const date = new Date(y, m - 1, d, 0, 0, 0, 0);
      const day = date.getDate().toString();
      const month = (date.getMonth() + 1).toString();
      const year = (date.getYear() + 1900).toString();
      const currentDate = new Date();

      return (day === d && month === m && year === y && year.length === 4 && date <= currentDate)
        ? null : this.messages.date;
    } catch (e) {
      return this.messages.date;
    }
  },
  currentLength: function(value, length) {
    return (value.length !== length) ? this.messages.currentLength(length) : null;
  },
}