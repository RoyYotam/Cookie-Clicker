let cookies_per_click = 1;

const NADA = 0; // zero
const FIRST_INDEX = 0; // zero

const checkpoint_0 = 0;
const checkpoint_1 = 100;
const checkpoint_2 = 1000;
const checkpoint_3 = 100000;
const checkpoint_4 = 10000000;
const checkpoint_5 = 1000000000;

const black = "rgb(0, 0, 0)";
const red = "rgb(255, 0, 0)";
const yellow = "rgb(255, 255, 0)";
const white = "rgb(255, 255, 255)";
const turquoise = "rgb(0, 255, 255)";
const blue = "rgb(0, 0, 255)";


const cookie_btn = document.getElementById("cookie");
const cookies_counter = document.getElementById("cookies_counter");

cookie_btn.addEventListener("click", increase_coockies);

increase_coockies(null, false);

// feature number 1
function change_color_by_cookies(cookies_counter) {
	// Get the cookie counter, check for the cookies amount and change the color by it.
	num_of_cookies = parseInt(cookies_counter.innerHTML);
	var color = cookies_counter.style.color;
	color = (color == "") ? "rgb(255, 255, 255)" : color;

	if (num_of_cookies < checkpoint_1) {
		color = increase_color(black, red, checkpoint_1, checkpoint_0, num_of_cookies);
	} else if (num_of_cookies < checkpoint_2) {
		color = increase_color(red, yellow, checkpoint_2, checkpoint_1, num_of_cookies);
	} else if (num_of_cookies < checkpoint_3) {
		color = increase_color(yellow, white, checkpoint_3, checkpoint_2, num_of_cookies);
	} else if (num_of_cookies < checkpoint_4) {
		color = increase_color(white, turquoise, checkpoint_4, checkpoint_3, num_of_cookies);
	} else {
		color = increase_color(turquoise, blue, checkpoint_5, checkpoint_4, num_of_cookies);
	}
	// to be continued...
	cookies_counter.style.color = color;
}

function increase_color(lst_color, dst_color, high, low, clicks) {
	console.log("the num is " + (high - low) + " , " + clicks);
	console.log((clicks - low) / (high - low) * 100 + " %");

	percentage_past = (clicks - low) / (high - low);

	str1_lst_color = lst_color.split("rgb(");
	str1_dst_color = dst_color.split("rgb(");
	str1_lst_color.shift();
	str1_dst_color.shift();

	str2_lst_color = str1_lst_color.join().split(')');
	str2_dst_color = str1_dst_color.join().split(')');
	str2_lst_color.pop();
	str2_dst_color.pop();

	str3_lst_color = str2_lst_color.join().split(", ");
	str3_dst_color = str2_dst_color.join().split(", ");

	var final = [];
	for (loop = FIRST_INDEX; loop < 3; loop ++) {
		rgb_lst = parseInt(str3_lst_color[loop]);
		rgb_dst = parseInt(str3_dst_color[loop]);
		final[loop] = ((Math.abs(rgb_dst - rgb_lst) * percentage_past) + Math.min(rgb_dst, rgb_lst));
	}

	almost1 = final.join(", ");
	almost2 = "rgb(" + almost1 + ")";

	return almost2;
}

function increase_coockies(event, default_cookie_increment = true) {
	// The function takes the current number of cookies stores in the local storage,
	// and updated him with cookie_increment variable.
	
	var num_of_cookies = NADA;

	// if the number of cookies is saved in local stoarge,
	if (localStorage.getItem("cookies")){
		// than try to get it.
    		num_of_cookies = parseInt(my_decryption_for_numbers(localStorage.getItem("cookies")));
    		if (! num_of_cookies) { 
    			// In case the data is not a number (NaN).
			num_of_cookies = NADA;
		}
	}

	// Do the increament.
	num_of_cookies += (default_cookie_increment ? cookies_per_click : NADA);

	// Update the data on the page.
	cookies_counter.innerHTML = num_of_cookies;
        change_color_by_cookies(cookies_counter);

        // Update the new cookie number in the storage.
	localStorage.setItem("cookies", my_encryption_for_numbers(num_of_cookies));
}

function my_encryption_for_numbers(number) {
	// This is an functions encrypt numbers between 0 -> (10^10 - 1).


	// The following section convert the number into String.

	const encrypt_key = "7468301925"; // represent locations.
	const char_lib = "!@#$%^&*()"

	str_decrypt = "";
	zeroes_length = 10 - (number.toString().length);

	for (zeroes_loops = FIRST_INDEX; zeroes_loops < zeroes_length; zeroes_loops ++) {
		str_decrypt += '0';
	}
	str_decrypt += number.toString();

	// The following section encrypt the number with the encrypt_key.

	str_encrypt = "";

	for (current_place = FIRST_INDEX; current_place < 10; current_place ++)  {
		str_encrypt += str_decrypt[parseInt(encrypt_key[current_place])];
	}

	// This loop takes the encrypted number, and encrypt it with signs.
	str_encrypt_signs = "";
	for (current_place = FIRST_INDEX; current_place < 10; current_place ++)  {
		str_encrypt_signs += char_lib[parseInt(str_encrypt[current_place])];
	}
	
	return str_encrypt_signs;
}

function my_decryption_for_numbers(str_encrypt) {
	// This is an functions decrypt numbers between 0 -> (10^10 - 1).

	const encrypt_key = "7468301925"; // represent locations.
	const char_lib = "!@#$%^&*()"

	// The following section decrypt the number with the encrypt_key.

	str_decrypt = ""; // = "0000000000";

	for (current_place = FIRST_INDEX; current_place < 10; current_place ++)  {
		//str_decrypt = replace_char_at(str_decrypt, char_lib.indexOf(str_encrypt[current_place]), parseInt(encrypt_key[current_place]));
		str_decrypt += char_lib.indexOf(str_encrypt[encrypt_key.indexOf(current_place)]);
	}
	
	return parseInt(str_decrypt);
}

function replace_char_at(str, char, index) {
	// Function get a String and change the char at index 'index' to be char 'char'.
	// $$$ currently not in use, founded a better way. $$$
	const start_str = str.substring(FIRST_INDEX, index);
	const end_str = str.substring(index + 1);
    	return start_str + char + end_str;
}