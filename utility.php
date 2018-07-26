<?php 
/**
 * Pluto Attacxks
 *
 *
 * @author Doug Park <doug@povingames.com>
 * @copyright 2018 Povingames.com
 * @license MIT License
 */
 
class debug_log {

	public $debug_enabled = False;
	public $debug_name = " ";
	public $debug_label = " ------------------------------------";
	public $debug_file = "debug_log-";

	public function start($debug_name) {
		$this->debug_enabled = True;
		$this->debug_name .= $debug_name;
		$this->debug_file .= $debug_name;
		error_log(print_r("\n[" . date(c) . $this->debug_name . $this->debug_label . " - Start]\n", TRUE), 3, $this->debug_file);
	}
	
	public function cookie() {
		if ($this->debug_enabled) {
			error_log(print_r('$_COOKIE ', TRUE), 3, $this->debug_file);
			error_log(print_r($_COOKIE, TRUE), 3, $this->debug_file);
		}
	}

	public function request() {
		if ($this->debug_enabled) {
			error_log(print_r('$_REQUEST ', TRUE), 3, $this->debug_file);
			error_log(print_r($_REQUEST, TRUE), 3, $this->debug_file);
		}
	}

	public function session() {
		if ($this->debug_enabled) {
			error_log(print_r('$_SESSION ', TRUE), 3, $this->debug_file);
			error_log(print_r($_SESSION, TRUE), 3, $this->debug_file);
		}
	}

	public function end() {
		if ($this->debug_enabled) {	
			$this->debug_enabled = False;
			error_log(print_r("\n[" . date(c) . $this->debug_name . $this->debug_label . " - End]\n", TRUE), 3, $this->debug_file);
		}
	}
	
	public function msg($label, $var) {
		if ($this->debug_enabled) {				
			error_log(print_r("\n $label ", TRUE), 3, $this->debug_file);
			error_log(print_r($var, TRUE), 3, $this->debug_file);
		}
	}

}

// Encode array as JSON response
class ArrayValue implements JsonSerializable {
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }
}

// Encode string as JSON response
class StringValue implements JsonSerializable {
    public function __construct($string) {
        $this->string = (string) $string;
    }

    public function jsonSerialize() {
        return $this->string;
    }
}
