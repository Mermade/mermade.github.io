;(function(){'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function($target$$, $property$$, $descriptor$$) {
  if ($target$$ == Array.prototype || $target$$ == Object.prototype) {
    return $target$$;
  }
  $target$$[$property$$] = $descriptor$$.value;
  return $target$$;
};
$jscomp.getGlobal = function($passedInThis_possibleGlobals$$) {
  $passedInThis_possibleGlobals$$ = ["object" == typeof globalThis && globalThis, $passedInThis_possibleGlobals$$, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var $i$$ = 0; $i$$ < $passedInThis_possibleGlobals$$.length; ++$i$$) {
    var $maybeGlobal$$ = $passedInThis_possibleGlobals$$[$i$$];
    if ($maybeGlobal$$ && $maybeGlobal$$.Math == Math) {
      return $maybeGlobal$$;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function($target$$, $property$$) {
  var $obfuscatedName_polyfill$$ = $jscomp.propertyToPolyfillSymbol[$property$$];
  if (null == $obfuscatedName_polyfill$$) {
    return $target$$[$property$$];
  }
  $obfuscatedName_polyfill$$ = $target$$[$obfuscatedName_polyfill$$];
  return void 0 !== $obfuscatedName_polyfill$$ ? $obfuscatedName_polyfill$$ : $target$$[$property$$];
};
$jscomp.polyfill = function($target$$, $polyfill$$, $fromLang$$, $toLang$$) {
  $polyfill$$ && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated($target$$, $polyfill$$, $fromLang$$, $toLang$$) : $jscomp.polyfillUnisolated($target$$, $polyfill$$, $fromLang$$, $toLang$$));
};
$jscomp.polyfillUnisolated = function($property$jscomp$7_split_target$$, $impl_polyfill$$, $fromLang$jscomp$1_obj$$, $i$jscomp$4_orig_toLang$$) {
  $fromLang$jscomp$1_obj$$ = $jscomp.global;
  $property$jscomp$7_split_target$$ = $property$jscomp$7_split_target$$.split(".");
  for ($i$jscomp$4_orig_toLang$$ = 0; $i$jscomp$4_orig_toLang$$ < $property$jscomp$7_split_target$$.length - 1; $i$jscomp$4_orig_toLang$$++) {
    var $key$$ = $property$jscomp$7_split_target$$[$i$jscomp$4_orig_toLang$$];
    if (!($key$$ in $fromLang$jscomp$1_obj$$)) {
      return;
    }
    $fromLang$jscomp$1_obj$$ = $fromLang$jscomp$1_obj$$[$key$$];
  }
  $property$jscomp$7_split_target$$ = $property$jscomp$7_split_target$$[$property$jscomp$7_split_target$$.length - 1];
  $i$jscomp$4_orig_toLang$$ = $fromLang$jscomp$1_obj$$[$property$jscomp$7_split_target$$];
  $impl_polyfill$$ = $impl_polyfill$$($i$jscomp$4_orig_toLang$$);
  $impl_polyfill$$ != $i$jscomp$4_orig_toLang$$ && null != $impl_polyfill$$ && $jscomp.defineProperty($fromLang$jscomp$1_obj$$, $property$jscomp$7_split_target$$, {configurable:!0, writable:!0, value:$impl_polyfill$$});
};
$jscomp.polyfillIsolated = function($isSimpleName_target$$, $impl$jscomp$1_polyfill$$, $BIN_ID_fromLang$$, $ownerObject_root$jscomp$3_toLang$$) {
  var $property$jscomp$8_split$$ = $isSimpleName_target$$.split(".");
  $isSimpleName_target$$ = 1 === $property$jscomp$8_split$$.length;
  $ownerObject_root$jscomp$3_toLang$$ = $property$jscomp$8_split$$[0];
  $ownerObject_root$jscomp$3_toLang$$ = !$isSimpleName_target$$ && $ownerObject_root$jscomp$3_toLang$$ in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var $i$$ = 0; $i$$ < $property$jscomp$8_split$$.length - 1; $i$$++) {
    var $key$$ = $property$jscomp$8_split$$[$i$$];
    if (!($key$$ in $ownerObject_root$jscomp$3_toLang$$)) {
      return;
    }
    $ownerObject_root$jscomp$3_toLang$$ = $ownerObject_root$jscomp$3_toLang$$[$key$$];
  }
  $property$jscomp$8_split$$ = $property$jscomp$8_split$$[$property$jscomp$8_split$$.length - 1];
  $BIN_ID_fromLang$$ = $jscomp.IS_SYMBOL_NATIVE && "es6" === $BIN_ID_fromLang$$ ? $ownerObject_root$jscomp$3_toLang$$[$property$jscomp$8_split$$] : null;
  $impl$jscomp$1_polyfill$$ = $impl$jscomp$1_polyfill$$($BIN_ID_fromLang$$);
  null != $impl$jscomp$1_polyfill$$ && ($isSimpleName_target$$ ? $jscomp.defineProperty($jscomp.polyfills, $property$jscomp$8_split$$, {configurable:!0, writable:!0, value:$impl$jscomp$1_polyfill$$}) : $impl$jscomp$1_polyfill$$ !== $BIN_ID_fromLang$$ && (void 0 === $jscomp.propertyToPolyfillSymbol[$property$jscomp$8_split$$] && ($BIN_ID_fromLang$$ = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[$property$jscomp$8_split$$] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol($property$jscomp$8_split$$) : 
  $jscomp.POLYFILL_PREFIX + $BIN_ID_fromLang$$ + "$" + $property$jscomp$8_split$$), $jscomp.defineProperty($ownerObject_root$jscomp$3_toLang$$, $jscomp.propertyToPolyfillSymbol[$property$jscomp$8_split$$], {configurable:!0, writable:!0, value:$impl$jscomp$1_polyfill$$})));
};
$jscomp.polyfill("globalThis", function($orig$$) {
  return $orig$$ || $jscomp.global;
}, "es_2020", "es3");
$jscomp.polyfill("String.prototype.trimRight", function($orig$$) {
  function $polyfill$$() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return $orig$$ || $polyfill$$;
}, "es_2019", "es3");
var LOG_ALL = -1, LOG_NONE = 0, LOG_OTHER = 1, LOG_CPU = 2, LOG_FPU = 4, LOG_MEM = 8, LOG_DMA = 16, LOG_IO = 32, LOG_PS2 = 64, LOG_PIC = 128, LOG_VGA = 256, LOG_PIT = 512, LOG_MOUSE = 1024, LOG_PCI = 2048, LOG_BIOS = 4096, LOG_FLOPPY = 8192, LOG_SERIAL = 16384, LOG_DISK = 32768, LOG_RTC = 65536, LOG_HPET = 131072, LOG_ACPI = 262144, LOG_APIC = 524288, LOG_NET = 1048576, LOG_VIRTIO = 2097152, LOG_9P = 4194304, LOG_SB16 = 8388608, LOG_NAMES = [[1, ""], [LOG_CPU, "CPU"], [LOG_DISK, "DISK"], [LOG_FPU, 
"FPU"], [LOG_MEM, "MEM"], [LOG_DMA, "DMA"], [LOG_IO, "IO"], [LOG_PS2, "PS2"], [LOG_PIC, "PIC"], [LOG_VGA, "VGA"], [LOG_PIT, "PIT"], [LOG_MOUSE, "MOUS"], [LOG_PCI, "PCI"], [LOG_BIOS, "BIOS"], [LOG_FLOPPY, "FLOP"], [LOG_SERIAL, "SERI"], [LOG_RTC, "RTC"], [LOG_HPET, "HPET"], [LOG_ACPI, "ACPI"], [LOG_APIC, "APIC"], [LOG_NET, "NET"], [LOG_VIRTIO, "VIO"], [LOG_9P, "9P"], [LOG_SB16, "SB16"]], FLAG_CARRY = 1, FLAG_PARITY = 4, FLAG_ADJUST = 16, FLAG_ZERO = 64, FLAG_SIGN = 128, FLAG_TRAP = 256, FLAG_INTERRUPT = 
512, FLAG_DIRECTION = 1024, FLAG_OVERFLOW = 2048, FLAG_IOPL = 12288, FLAG_NT = 16384, FLAG_RF = 65536, FLAG_VM = 131072, FLAG_AC = 262144, FLAG_VIF = 524288, FLAG_VIP = 1048576, FLAG_ID = 2097152, FLAGS_DEFAULT = 2, REG_EAX = 0, REG_ECX = 1, REG_EDX = 2, REG_EBX = 3, REG_ESP = 4, REG_EBP = 5, REG_ESI = 6, REG_EDI = 7, REG_ES = 0, REG_CS = 1, REG_SS = 2, REG_DS = 3, REG_FS = 4, REG_GS = 5, REG_LDTR = 7, MMAP_BLOCK_BITS = 17, MMAP_BLOCK_SIZE = 1 << MMAP_BLOCK_BITS, CR0_PG = -2147483648, CR4_PAE = 32, 
FW_CFG_SIGNATURE = 0, FW_CFG_ID = 1, FW_CFG_RAM_SIZE = 3, FW_CFG_NB_CPUS = 5, FW_CFG_MAX_CPUS = 15, FW_CFG_NUMA = 13, FW_CFG_FILE_DIR = 25, FW_CFG_CUSTOM_START = 32768, FW_CFG_FILE_START = 49152, FW_CFG_SIGNATURE_QEMU = 1431127377, WASM_TABLE_SIZE = 900, WASM_TABLE_OFFSET = 1024, MIXER_CHANNEL_LEFT = 0, MIXER_CHANNEL_RIGHT = 1, MIXER_CHANNEL_BOTH = 2, MIXER_SRC_MASTER = 0, MIXER_SRC_PCSPEAKER = 1, MIXER_SRC_DAC = 2;
function ScreenAdapter($charmap_high_screen_container$$, $bus$$) {
  function $number_as_color$$($n$$) {
    $n$$ = $n$$.toString(16);
    return "#" + "0".repeat(6 - $n$$.length) + $n$$;
  }
  function $elem_set_scale$$($elem$$, $scale_x$$, $scale_y$$, $device_pixel_ratio_use_scale$$) {
    $elem$$.style.width = "";
    $elem$$.style.height = "";
    $device_pixel_ratio_use_scale$$ && ($elem$$.style.transform = "");
    var $rectangle$$ = $elem$$.getBoundingClientRect();
    $device_pixel_ratio_use_scale$$ ? $elem$$.style.transform = (1 === $scale_x$$ ? "" : " scaleX(" + $scale_x$$ + ")") + (1 === $scale_y$$ ? "" : " scaleY(" + $scale_y$$ + ")") : (0 === $scale_x$$ % 1 && 0 === $scale_y$$ % 1 ? ($graphic_screen$$.style.imageRendering = "crisp-edges", $graphic_screen$$.style.imageRendering = "pixelated", $graphic_screen$$.style["-ms-interpolation-mode"] = "nearest-neighbor") : ($graphic_screen$$.style.imageRendering = "", $graphic_screen$$.style["-ms-interpolation-mode"] = 
    ""), $device_pixel_ratio_use_scale$$ = window.devicePixelRatio || 1, 0 !== $device_pixel_ratio_use_scale$$ % 1 && ($scale_x$$ /= $device_pixel_ratio_use_scale$$, $scale_y$$ /= $device_pixel_ratio_use_scale$$));
    1 !== $scale_x$$ && ($elem$$.style.width = $rectangle$$.width * $scale_x$$ + "px");
    1 !== $scale_y$$ && ($elem$$.style.height = $rectangle$$.height * $scale_y$$ + "px");
  }
  console.assert($charmap_high_screen_container$$, "1st argument must be a DOM container");
  var $graphic_screen$$ = $charmap_high_screen_container$$.getElementsByTagName("canvas")[0], $graphic_context$$ = $graphic_screen$$.getContext("2d", {alpha:!1}), $text_screen$$ = $charmap_high_screen_container$$.getElementsByTagName("div")[0], $cursor_element$$ = document.createElement("div"), $cursor_row$$, $cursor_col$$, $scale_x$$ = 1, $scale_y$$ = 1, $base_scale$$ = 1, $changed_rows$$, $is_graphical$$ = !1, $text_mode_data$$, $text_mode_width$$, $text_mode_height$$, $stopped$$ = !1, $screen$$ = 
  this;
  $charmap_high_screen_container$$ = new Uint16Array([8962, 199, 252, 233, 226, 228, 224, 229, 231, 234, 235, 232, 239, 238, 236, 196, 197, 201, 230, 198, 244, 246, 242, 251, 249, 255, 214, 220, 162, 163, 165, 8359, 402, 225, 237, 243, 250, 241, 209, 170, 186, 191, 8976, 172, 189, 188, 161, 171, 187, 9617, 9618, 9619, 9474, 9508, 9569, 9570, 9558, 9557, 9571, 9553, 9559, 9565, 9564, 9563, 9488, 9492, 9524, 9516, 9500, 9472, 9532, 9566, 9567, 9562, 9556, 9577, 9574, 9568, 9552, 9580, 9575, 9576, 9572, 
  9573, 9561, 9560, 9554, 9555, 9579, 9578, 9496, 9484, 9608, 9604, 9612, 9616, 9600, 945, 223, 915, 960, 931, 963, 181, 964, 934, 920, 937, 948, 8734, 966, 949, 8745, 8801, 177, 8805, 8804, 8992, 8993, 247, 8776, 176, 8729, 183, 8730, 8319, 178, 9632, 160]);
  for (var $charmap_low$$ = new Uint16Array([32, 9786, 9787, 9829, 9830, 9827, 9824, 8226, 9688, 9675, 9689, 9794, 9792, 9834, 9835, 9788, 9658, 9668, 8597, 8252, 182, 167, 9644, 8616, 8593, 8595, 8594, 8592, 8735, 8596, 9650, 9660]), $charmap$$ = [], $chr$$, $i$jscomp$0$$ = 0; 256 > $i$jscomp$0$$; $i$jscomp$0$$++) {
    $chr$$ = 126 < $i$jscomp$0$$ ? $charmap_high_screen_container$$[$i$jscomp$0$$ - 127] : 32 > $i$jscomp$0$$ ? $charmap_low$$[$i$jscomp$0$$] : $i$jscomp$0$$, $charmap$$[$i$jscomp$0$$] = String.fromCharCode($chr$$);
  }
  $graphic_context$$.imageSmoothingEnabled = !1;
  $cursor_element$$.style.position = "absolute";
  $cursor_element$$.style.backgroundColor = "#ccc";
  $cursor_element$$.style.width = "7px";
  $cursor_element$$.style.display = "inline-block";
  $text_screen$$.style.display = "block";
  $graphic_screen$$.style.display = "none";
  this.bus = $bus$$;
  $bus$$.register("screen-set-mode", function($data$$) {
    this.set_mode($data$$);
  }, this);
  $bus$$.register("screen-fill-buffer-end", function($data$$) {
    this.update_buffer($data$$);
  }, this);
  $bus$$.register("screen-put-char", function($data$$) {
    this.put_char($data$$[0], $data$$[1], $data$$[2], $data$$[3], $data$$[4]);
  }, this);
  $bus$$.register("screen-update-cursor", function($data$$) {
    this.update_cursor($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("screen-update-cursor-scanline", function($data$$) {
    this.update_cursor_scanline($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("screen-clear", function() {
    this.clear_screen();
  }, this);
  $bus$$.register("screen-set-size-text", function($data$$) {
    this.set_size_text($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("screen-set-size-graphical", function($data$$) {
    this.set_size_graphical($data$$[0], $data$$[1], $data$$[2], $data$$[3]);
  }, this);
  this.init = function() {
    this.set_size_text(80, 25);
    this.timer();
  };
  this.make_screenshot = function() {
    const $image$$ = new Image;
    if ($is_graphical$$) {
      $image$$.src = $graphic_screen$$.toDataURL("image/png");
    } else {
      const $char_size$$ = [9, 16], $canvas$$ = document.createElement("canvas");
      $canvas$$.width = $text_mode_width$$ * $char_size$$[0];
      $canvas$$.height = $text_mode_height$$ * $char_size$$[1];
      const $context$$ = $canvas$$.getContext("2d");
      $context$$.imageSmoothingEnabled = !1;
      $context$$.font = window.getComputedStyle($text_screen$$).font;
      $context$$.textBaseline = "top";
      for (let $x$$ = 0; $x$$ < $text_mode_width$$; $x$$++) {
        for (let $y$$ = 0; $y$$ < $text_mode_height$$; $y$$++) {
          const $index$$ = 3 * ($y$$ * $text_mode_width$$ + $x$$);
          $context$$.fillStyle = $number_as_color$$($text_mode_data$$[$index$$ + 1]);
          $context$$.fillRect($x$$ * $char_size$$[0], $y$$ * $char_size$$[1], $char_size$$[0], $char_size$$[1]);
          $context$$.fillStyle = $number_as_color$$($text_mode_data$$[$index$$ + 2]);
          $context$$.fillText($charmap$$[$text_mode_data$$[$index$$]], $x$$ * $char_size$$[0], $y$$ * $char_size$$[1]);
        }
      }
      "none" !== $cursor_element$$.style.display && ($context$$.fillStyle = $cursor_element$$.style.backgroundColor, $context$$.fillRect($cursor_col$$ * $char_size$$[0], $cursor_row$$ * $char_size$$[1] + parseInt($cursor_element$$.style.marginTop, 10) - 1, parseInt($cursor_element$$.style.width, 10), parseInt($cursor_element$$.style.height, 10)));
      $image$$.src = $canvas$$.toDataURL("image/png");
    }
    try {
      window.open("").document.write($image$$.outerHTML);
    } catch ($e$$) {
    }
  };
  this.put_char = function($row$$, $col_p$$, $chr$$, $bg_color$$, $fg_color$$) {
    $row$$ < $text_mode_height$$ && $col_p$$ < $text_mode_width$$ && ($col_p$$ = 3 * ($row$$ * $text_mode_width$$ + $col_p$$), dbg_assert(0 <= $chr$$ && 256 > $chr$$), $text_mode_data$$[$col_p$$] = $chr$$, $text_mode_data$$[$col_p$$ + 1] = $bg_color$$, $text_mode_data$$[$col_p$$ + 2] = $fg_color$$, $changed_rows$$[$row$$] = 1);
  };
  this.timer = function() {
    $stopped$$ || requestAnimationFrame($is_graphical$$ ? $update_graphical$$ : $update_text$$);
  };
  var $update_text$$ = function() {
    for (var $i$$ = 0; $i$$ < $text_mode_height$$; $i$$++) {
      $changed_rows$$[$i$$] && ($screen$$.text_update_row($i$$), $changed_rows$$[$i$$] = 0);
    }
    this.timer();
  }.bind(this), $update_graphical$$ = function() {
    this.bus.send("screen-fill-buffer");
    this.timer();
  }.bind(this);
  this.destroy = function() {
    $stopped$$ = !0;
  };
  this.set_mode = function($graphical$$) {
    ($is_graphical$$ = $graphical$$) ? ($text_screen$$.style.display = "none", $graphic_screen$$.style.display = "block") : ($text_screen$$.style.display = "block", $graphic_screen$$.style.display = "none");
  };
  this.clear_screen = function() {
    $graphic_context$$.fillStyle = "#000";
    $graphic_context$$.fillRect(0, 0, $graphic_screen$$.width, $graphic_screen$$.height);
  };
  this.set_size_text = function($cols_i$$, $rows$$) {
    if ($cols_i$$ !== $text_mode_width$$ || $rows$$ !== $text_mode_height$$) {
      $changed_rows$$ = new Int8Array($rows$$);
      $text_mode_data$$ = new Int32Array($cols_i$$ * $rows$$ * 3);
      $text_mode_width$$ = $cols_i$$;
      for ($text_mode_height$$ = $rows$$; $text_screen$$.childNodes.length > $rows$$;) {
        $text_screen$$.removeChild($text_screen$$.firstChild);
      }
      for (; $text_screen$$.childNodes.length < $rows$$;) {
        $text_screen$$.appendChild(document.createElement("div"));
      }
      for ($cols_i$$ = 0; $cols_i$$ < $rows$$; $cols_i$$++) {
        this.text_update_row($cols_i$$);
      }
      $elem_set_scale$$($text_screen$$, $scale_x$$, $scale_y$$, !0);
    }
  };
  this.set_size_graphical = function($width$$, $height$$, $buffer_width$$, $buffer_height$$) {
    DEBUG_SCREEN_LAYERS && ($width$$ = $buffer_width$$, $height$$ = $buffer_height$$);
    $graphic_screen$$.style.display = "block";
    $graphic_screen$$.width = $width$$;
    $graphic_screen$$.height = $height$$;
    $base_scale$$ = 640 >= $width$$ && 2 * $width$$ < window.innerWidth && 2 * $width$$ < window.innerHeight ? 2 : 1;
    $elem_set_scale$$($graphic_screen$$, $scale_x$$ * $base_scale$$, $scale_y$$ * $base_scale$$, !1);
  };
  this.set_scale = function($s_x$$, $s_y$$) {
    $scale_x$$ = $s_x$$;
    $scale_y$$ = $s_y$$;
    $elem_set_scale$$($text_screen$$, $scale_x$$, $scale_y$$, !0);
    $elem_set_scale$$($graphic_screen$$, $scale_x$$ * $base_scale$$, $scale_y$$ * $base_scale$$, !1);
  };
  this.set_scale($scale_x$$, $scale_y$$);
  this.update_cursor_scanline = function($start$$, $end$$) {
    $start$$ & 32 ? $cursor_element$$.style.display = "none" : ($cursor_element$$.style.display = "inline", $cursor_element$$.style.height = Math.min(15, $end$$ - $start$$) + "px", $cursor_element$$.style.marginTop = Math.min(15, $start$$) + "px");
  };
  this.update_cursor = function($row$$, $col$$) {
    if ($row$$ !== $cursor_row$$ || $col$$ !== $cursor_col$$) {
      $changed_rows$$[$row$$] = 1, $changed_rows$$[$cursor_row$$] = 1, $cursor_row$$ = $row$$, $cursor_col$$ = $col$$;
    }
  };
  this.text_update_row = function($row$$) {
    var $offset$$ = 3 * $row$$ * $text_mode_width$$, $text$$;
    var $row_element$$ = $text_screen$$.childNodes[$row$$];
    var $fragment$$ = document.createElement("div");
    for (var $i$$ = 0; $i$$ < $text_mode_width$$;) {
      var $color_element$$ = document.createElement("span");
      var $bg_color$$ = $text_mode_data$$[$offset$$ + 1];
      var $fg_color$$ = $text_mode_data$$[$offset$$ + 2];
      $color_element$$.style.backgroundColor = $number_as_color$$($bg_color$$);
      $color_element$$.style.color = $number_as_color$$($fg_color$$);
      for ($text$$ = ""; $i$$ < $text_mode_width$$ && $text_mode_data$$[$offset$$ + 1] === $bg_color$$ && $text_mode_data$$[$offset$$ + 2] === $fg_color$$;) {
        var $ascii$$ = $text_mode_data$$[$offset$$];
        $text$$ += $charmap$$[$ascii$$];
        dbg_assert($charmap$$[$ascii$$]);
        $i$$++;
        $offset$$ += 3;
        if ($row$$ === $cursor_row$$) {
          if ($i$$ === $cursor_col$$) {
            break;
          } else {
            if ($i$$ === $cursor_col$$ + 1) {
              $fragment$$.appendChild($cursor_element$$);
              break;
            }
          }
        }
      }
      $color_element$$.textContent = $text$$;
      $fragment$$.appendChild($color_element$$);
    }
    $row_element$$.parentNode.replaceChild($fragment$$, $row_element$$);
  };
  this.update_buffer = function($layers$$) {
    DEBUG_SCREEN_LAYERS ? ($graphic_context$$.strokeStyle = "#0F0", $graphic_context$$.lineWidth = 4, $layers$$.forEach($layer$$ => {
      $graphic_context$$.strokeRect($layer$$.buffer_x, $layer$$.buffer_y, $layer$$.buffer_width, $layer$$.buffer_height);
    }), $graphic_context$$.lineWidth = 1) : $layers$$.forEach($layer$$ => {
      $graphic_context$$.putImageData($layer$$.image_data, $layer$$.screen_x - $layer$$.buffer_x, $layer$$.screen_y - $layer$$.buffer_y, $layer$$.buffer_x, $layer$$.buffer_y, $layer$$.buffer_width, $layer$$.buffer_height);
    });
  };
  this.init();
}
;const VIRTIO_9P_F_MOUNT_TAG = 0, VIRTIO_9P_MAX_TAGLEN = 254;
var EPERM = 1, ENOENT = 2, EEXIST = 17, EINVAL = 22, EOPNOTSUPP = 95, ENOTEMPTY = 39, EPROTO = 71, P9_SETATTR_MODE = 1, P9_SETATTR_UID = 2, P9_SETATTR_GID = 4, P9_SETATTR_SIZE = 8, P9_SETATTR_ATIME = 16, P9_SETATTR_MTIME = 32, P9_SETATTR_CTIME = 64, P9_SETATTR_ATIME_SET = 128, P9_SETATTR_MTIME_SET = 256, P9_STAT_MODE_DIR = 2147483648, P9_STAT_MODE_APPEND = 1073741824, P9_STAT_MODE_EXCL = 536870912, P9_STAT_MODE_MOUNT = 268435456, P9_STAT_MODE_AUTH = 134217728, P9_STAT_MODE_TMP = 67108864, P9_STAT_MODE_SYMLINK = 
33554432, P9_STAT_MODE_LINK = 16777216, P9_STAT_MODE_DEVICE = 8388608, P9_STAT_MODE_NAMED_PIPE = 2097152, P9_STAT_MODE_SOCKET = 1048576, P9_STAT_MODE_SETUID = 524288, P9_STAT_MODE_SETGID = 262144, P9_STAT_MODE_SETVTX = 65536;
const P9_LOCK_TYPE_RDLCK = 0, P9_LOCK_TYPE_WRLCK = 1, P9_LOCK_TYPE_UNLCK = 2, P9_LOCK_TYPES = Object.freeze(["shared", "exclusive", "unlock"]), P9_LOCK_FLAGS_BLOCK = 1, P9_LOCK_FLAGS_RECLAIM = 2, P9_LOCK_SUCCESS = 0, P9_LOCK_BLOCKED = 1, P9_LOCK_ERROR = 2, P9_LOCK_GRACE = 3;
var FID_NONE = -1, FID_INODE = 1, FID_XATTR = 2;
function Virtio9p($filesystem$$, $cpu$$, $bus$$) {
  this.fs = $filesystem$$;
  this.bus = $bus$$;
  this.configspace_tagname = [104, 111, 115, 116, 57, 112];
  this.configspace_taglen = this.configspace_tagname.length;
  this.VERSION = "9P2000.L";
  this.msize = this.BLOCKSIZE = 8192;
  this.replybuffer = new Uint8Array(2 * this.msize);
  this.replybuffersize = 0;
  this.fids = [];
  this.virtio = new VirtIO($cpu$$, {name:"virtio-9p", pci_id:48, device_id:4169, subsystem_device_id:9, common:{initial_port:43008, queues:[{size_supported:32, notify_offset:0, }, ], features:[VIRTIO_9P_F_MOUNT_TAG, VIRTIO_F_VERSION_1, VIRTIO_F_RING_EVENT_IDX, VIRTIO_F_RING_INDIRECT_DESC, ], on_driver_ok:() => {
  }, }, notification:{initial_port:43264, single_handler:!1, handlers:[$bufchain_queue_id$$ => {
    if (0 !== $bufchain_queue_id$$) {
      dbg_assert(!1, "Virtio9P Notified for non-existent queue: " + $bufchain_queue_id$$ + " (expected queue_id of 0)");
    } else {
      for (; this.virtqueue.has_request();) {
        $bufchain_queue_id$$ = this.virtqueue.pop_request(), this.ReceiveRequest($bufchain_queue_id$$);
      }
      this.virtqueue.notify_me_after(0);
    }
  }, ], }, isr_status:{initial_port:42752, }, device_specific:{initial_port:42496, struct:[{bytes:2, name:"mount tag length", read:() => this.configspace_taglen, write:$data$$ => {
  }, }, ].concat(v86util.range(VIRTIO_9P_MAX_TAGLEN).map($index$$ => ({bytes:1, name:"mount tag name " + $index$$, read:() => this.configspace_tagname[$index$$] || 0, write:$data$$ => {
  }, }))), }, });
  this.virtqueue = this.virtio.queues[0];
}
Virtio9p.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.configspace_tagname;
  $state$$[1] = this.configspace_taglen;
  $state$$[2] = this.virtio;
  $state$$[3] = this.VERSION;
  $state$$[4] = this.BLOCKSIZE;
  $state$$[5] = this.msize;
  $state$$[6] = this.replybuffer;
  $state$$[7] = this.replybuffersize;
  $state$$[8] = this.fids.map(function($f$$) {
    return [$f$$.inodeid, $f$$.type, $f$$.uid, $f$$.dbg_name];
  });
  $state$$[9] = this.fs;
  return $state$$;
};
Virtio9p.prototype.set_state = function($state$$) {
  this.configspace_tagname = $state$$[0];
  this.configspace_taglen = $state$$[1];
  this.virtio.set_state($state$$[2]);
  this.virtqueue = this.virtio.queues[0];
  this.VERSION = $state$$[3];
  this.BLOCKSIZE = $state$$[4];
  this.msize = $state$$[5];
  this.replybuffer = $state$$[6];
  this.replybuffersize = $state$$[7];
  this.fids = $state$$[8].map(function($f$$) {
    return {inodeid:$f$$[0], type:$f$$[1], uid:$f$$[2], dbg_name:$f$$[3]};
  });
  this.fs.set_state($state$$[9]);
};
Virtio9p.prototype.Createfid = function($inodeid$$, $type$$, $uid$$, $dbg_name$$) {
  return {inodeid:$inodeid$$, type:$type$$, uid:$uid$$, dbg_name:$dbg_name$$};
};
Virtio9p.prototype.update_dbg_name = function($idx$$, $newname$$) {
  for (const $fid$$ of this.fids) {
    $fid$$.inodeid === $idx$$ && ($fid$$.dbg_name = $newname$$);
  }
};
Virtio9p.prototype.Reset = function() {
  this.fids = [];
};
Virtio9p.prototype.BuildReply = function($id$$, $tag$$, $payloadsize$$) {
  dbg_assert(0 <= $payloadsize$$, "9P: Negative payload size");
  marshall.Marshall(["w", "b", "h"], [$payloadsize$$ + 7, $id$$ + 1, $tag$$], this.replybuffer, 0);
  $payloadsize$$ + 7 >= this.replybuffer.length && message.Debug("Error in 9p: payloadsize exceeds maximum length");
  this.replybuffersize = $payloadsize$$ + 7;
};
Virtio9p.prototype.SendError = function($tag$$, $errormsg_size$$, $errorcode$$) {
  $errormsg_size$$ = marshall.Marshall(["w"], [$errorcode$$], this.replybuffer, 7);
  this.BuildReply(6, $tag$$, $errormsg_size$$);
};
Virtio9p.prototype.SendReply = function($bufchain$$) {
  dbg_assert(0 <= this.replybuffersize, "9P: Negative replybuffersize");
  $bufchain$$.set_next_blob(this.replybuffer.subarray(0, this.replybuffersize));
  this.virtqueue.push_reply($bufchain$$);
  this.virtqueue.flush_replies();
};
Virtio9p.prototype.ReceiveRequest = async function($bufchain$$) {
  var $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = new Uint8Array($bufchain$$.length_readable);
  $bufchain$$.get_next_blob($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
  var $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = {offset:0}, $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "b", "h"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$), $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0], 
  $id$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1], $tag$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
  switch($id$$) {
    case 8:
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = this.fs.GetTotalSize();
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = this.fs.GetSpace();
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = [16914839];
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] = this.BLOCKSIZE;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2] = Math.floor($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ / $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1]);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3] = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2] - Math.floor($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ / $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1]);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4] = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2] - Math.floor($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ / $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1]);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[5] = this.fs.CountUsedInodes();
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[6] = this.fs.CountFreeInodes();
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[7] = 0;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[8] = 256;
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = marshall.Marshall("wwddddddw".split(""), $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      this.SendReply($bufchain$$);
      break;
    case 112:
    case 12:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      var $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      message.Debug("[open] fid=" + $fid$$ + ", mode=" + $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = this.fids[$fid$$].inodeid;
      var $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      message.Debug("file open " + this.fids[$fid$$].dbg_name);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = this.fs.OpenInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      this.fs.AddEvent(this.fids[$fid$$].inodeid, function() {
        message.Debug("file opened " + this.fids[$fid$$].dbg_name + " tag:" + $tag$$);
        var $req$$ = [];
        $req$$[0] = $inode$$.qid;
        $req$$[1] = this.msize - 24;
        marshall.Marshall(["Q", "w"], $req$$, this.replybuffer, 7);
        this.BuildReply($id$$, $tag$$, 17);
        this.SendReply($bufchain$$);
      }.bind(this));
      break;
    case 70:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "w", "s"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      message.Debug("[link] dfid=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = this.fs.Link(this.fids[$buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$].inodeid, this.fids[$fid$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      if (0 > $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$) {
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "";
        $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ === -EPERM ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "Operation not permitted" : ($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "Unknown error: " + -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, 
        dbg_assert(!1, "[link]: Unexpected error code: " + -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$));
        this.SendError($tag$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$);
        this.SendReply($bufchain$$);
        break;
      }
      this.BuildReply($id$$, $tag$$, 0);
      this.SendReply($bufchain$$);
      break;
    case 16:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "s", "s", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3];
      message.Debug("[symlink] fid=" + $fid$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + ", symgt=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ + ", gid=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = this.fs.CreateSymlink($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, this.fids[$fid$$].inodeid, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      $inode$$.uid = this.fids[$fid$$].uid;
      $inode$$.gid = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$;
      marshall.Marshall(["Q"], [$inode$$.qid], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 13);
      this.SendReply($bufchain$$);
      break;
    case 18:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall("wswwww".split(""), $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3];
      var $count$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4];
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[5];
      message.Debug("[mknod] fid=" + $fid$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + ", major=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ + ", minor=" + $count$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = this.fs.CreateNode($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, this.fids[$fid$$].inodeid, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $count$$);
      $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      $inode$$.mode = $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$;
      $inode$$.uid = this.fids[$fid$$].uid;
      $inode$$.gid = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$;
      marshall.Marshall(["Q"], [$inode$$.qid], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 13);
      this.SendReply($bufchain$$);
      break;
    case 22:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $inode$$ = this.fs.GetInode(this.fids[$fid$$].inodeid);
      message.Debug("[readlink] fid=" + $fid$$ + " name=" + this.fids[$fid$$].dbg_name + " target=" + $inode$$.symlink);
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = marshall.Marshall(["s"], [$inode$$.symlink], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      this.SendReply($bufchain$$);
      break;
    case 72:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "s", "w", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3];
      message.Debug("[mkdir] fid=" + $fid$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + ", mode=" + $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ + ", gid=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = this.fs.CreateDirectory($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, this.fids[$fid$$].inodeid);
      $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      $inode$$.mode = $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ | S_IFDIR;
      $inode$$.uid = this.fids[$fid$$].uid;
      $inode$$.gid = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$;
      marshall.Marshall(["Q"], [$inode$$.qid], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 13);
      this.SendReply($bufchain$$);
      break;
    case 14:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "s", "w", "w", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3];
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4];
      this.bus.send("9p-create", [$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, this.fids[$fid$$].inodeid]);
      message.Debug("[create] fid=" + $fid$$ + ", name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + ", flags=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ + ", mode=" + $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ + ", gid=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = this.fs.CreateFile($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, this.fids[$fid$$].inodeid);
      this.fids[$fid$$].inodeid = $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$;
      this.fids[$fid$$].type = FID_INODE;
      this.fids[$fid$$].dbg_name = $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$;
      $inode$$ = this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      $inode$$.uid = this.fids[$fid$$].uid;
      $inode$$.gid = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$;
      $inode$$.mode = $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$;
      marshall.Marshall(["Q", "w"], [$inode$$.qid, this.msize - 24], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 17);
      this.SendReply($bufchain$$);
      break;
    case 52:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall("wbwddws".split(""), $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = 0 === $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4] ? Infinity : $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = this.fs.DescribeLock($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1], $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3], $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, 
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[5], $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[6]);
      message.Debug("[lock] fid=" + $fid$$ + ", type=" + P9_LOCK_TYPES[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.type] + ", start=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.start + ", length=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.length + 
      ", proc_id=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.proc_id);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = this.fs.Lock(this.fids[$fid$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      marshall.Marshall(["b"], [$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 1);
      this.SendReply($bufchain$$);
      break;
    case 54:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall("wbddws".split(""), $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = 0 === $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3] ? Infinity : $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = this.fs.DescribeLock($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1], $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2], $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, 
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4], $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[5]);
      message.Debug("[getlock] fid=" + $fid$$ + ", type=" + P9_LOCK_TYPES[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.type] + ", start=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.start + ", length=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.length + 
      ", proc_id=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.proc_id);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = this.fs.GetLock(this.fids[$fid$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ || ($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$.type = P9_LOCK_TYPE_UNLCK);
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = marshall.Marshall(["b", "d", "d", "w", "s"], [$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$.type, $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$.start, Infinity === $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$.length ? 
      0 : $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$.length, $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$.proc_id, $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$.client_id], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      this.SendReply($bufchain$$);
      break;
    case 24:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "d"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $inode$$ = this.fs.GetInode(this.fids[$fid$$].inodeid);
      message.Debug("[getattr]: fid=" + $fid$$ + " name=" + this.fids[$fid$$].dbg_name + " request mask=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1]);
      if (!$inode$$ || $inode$$.status === STATUS_UNLINKED) {
        message.Debug("getattr: unlinked");
        this.SendError($tag$$, "No such file or directory", ENOENT);
        this.SendReply($bufchain$$);
        break;
      }
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0] |= 4096;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0] = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] = $inode$$.qid;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2] = $inode$$.mode;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3] = $inode$$.uid;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4] = $inode$$.gid;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[5] = $inode$$.nlinks;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[6] = $inode$$.major << 8 | $inode$$.minor;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[7] = $inode$$.size;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[8] = this.BLOCKSIZE;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[9] = Math.floor($inode$$.size / 512 + 1);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[10] = $inode$$.atime;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[11] = 0;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[12] = $inode$$.mtime;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[13] = 0;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[14] = $inode$$.ctime;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[15] = 0;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[16] = 0;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[17] = 0;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[18] = 0;
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[19] = 0;
      marshall.Marshall("dQwwwddddddddddddddd".split(""), $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 153);
      this.SendReply($bufchain$$);
      break;
    case 26:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall("wwwwwddddd".split(""), $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $inode$$ = this.fs.GetInode(this.fids[$fid$$].inodeid);
      message.Debug("[setattr]: fid=" + $fid$$ + " request mask=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] + " name=" + this.fids[$fid$$].dbg_name);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_MODE && ($inode$$.mode = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2]);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_UID && ($inode$$.uid = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3]);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_GID && ($inode$$.gid = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4]);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_ATIME && ($inode$$.atime = Math.floor((new Date).getTime() / 1000));
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_MTIME && ($inode$$.mtime = Math.floor((new Date).getTime() / 1000));
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_CTIME && ($inode$$.ctime = Math.floor((new Date).getTime() / 1000));
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_ATIME_SET && ($inode$$.atime = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[6]);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_MTIME_SET && ($inode$$.mtime = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[8]);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] & P9_SETATTR_SIZE && await this.fs.ChangeSize(this.fids[$fid$$].inodeid, $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[5]);
      this.BuildReply($id$$, $tag$$, 0);
      this.SendReply($bufchain$$);
      break;
    case 50:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "d"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      this.BuildReply($id$$, $tag$$, 0);
      this.SendReply($bufchain$$);
      break;
    case 40:
    case 116:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "d", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $count$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $inode$$ = this.fs.GetInode(this.fids[$fid$$].inodeid);
      40 == $id$$ && message.Debug("[treaddir]: fid=" + $fid$$ + " offset=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + " count=" + $count$$);
      116 == $id$$ && message.Debug("[read]: fid=" + $fid$$ + " (" + this.fids[$fid$$].dbg_name + ") offset=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + " count=" + $count$$ + " fidtype=" + this.fids[$fid$$].type);
      if (!$inode$$ || $inode$$.status === STATUS_UNLINKED) {
        message.Debug("read/treaddir: unlinked");
        this.SendError($tag$$, "No such file or directory", ENOENT);
        this.SendReply($bufchain$$);
        break;
      }
      if (this.fids[$fid$$].type == FID_XATTR) {
        for ($inode$$.caps.length < $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + $count$$ && ($count$$ = $inode$$.caps.length - $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$), $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = 0; $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ < 
        $count$$; $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$++) {
          this.replybuffer[11 + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$] = $inode$$.caps[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$];
        }
      } else {
        this.fs.OpenInode(this.fids[$fid$$].inodeid, void 0), $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = this.fids[$fid$$].inodeid, $count$$ = Math.min($count$$, this.replybuffer.length - 11), $inode$$.size < $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + $count$$ ? $count$$ = $inode$$.size - $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ : 
        40 == $id$$ && ($count$$ = this.fs.RoundToDirentry($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + $count$$) - $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$), $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ > 
        $inode$$.size && ($count$$ = 0), this.bus.send("9p-read-start", [this.fids[$fid$$].dbg_name]), $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = await this.fs.Read($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, $count$$), 
        this.bus.send("9p-read-end", [this.fids[$fid$$].dbg_name, $count$$]), $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ && this.replybuffer.set($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, 11);
      }
      marshall.Marshall(["w"], [$count$$], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 4 + $count$$);
      this.SendReply($bufchain$$);
      break;
    case 118:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "d", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $count$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = this.fids[$fid$$].dbg_name;
      message.Debug("[write]: fid=" + $fid$$ + " (" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ + ") offset=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + " count=" + $count$$ + " fidtype=" + this.fids[$fid$$].type);
      if (this.fids[$fid$$].type === FID_XATTR) {
        this.SendError($tag$$, "Setxattr not supported", EOPNOTSUPP);
        this.SendReply($bufchain$$);
        break;
      } else {
        await this.fs.Write(this.fids[$fid$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, $count$$, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$.subarray($attr_size_dirfd_mode$jscomp$15_olddirfid_state$$.offset));
      }
      this.bus.send("9p-write-end", [$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, $count$$]);
      marshall.Marshall(["w"], [$count$$], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 4);
      this.SendReply($bufchain$$);
      break;
    case 74:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "s", "w", "s"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $count$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3];
      message.Debug("[renameat]: oldname=" + $count$$ + " newname=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = await this.fs.Rename(this.fids[$attr_size_dirfd_mode$jscomp$15_olddirfid_state$$].inodeid, $count$$, this.fids[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$].inodeid, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      if (0 > $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$) {
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "";
        $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ === -ENOENT ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "No such file or directory" : $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ === -EPERM ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = 
        "Operation not permitted" : $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ === -ENOTEMPTY ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "Directory not empty" : ($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "Unknown error: " + 
        -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, dbg_assert(!1, "[renameat]: Unexpected error code: " + -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$));
        this.SendError($tag$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$);
        this.SendReply($bufchain$$);
        break;
      }
      TRACK_FILENAMES && ($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = this.fs.Search(this.fids[$error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$].inodeid, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$), this.update_dbg_name($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, 
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$));
      this.BuildReply($id$$, $tag$$, 0);
      this.SendReply($bufchain$$);
      break;
    case 76:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "s", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      message.Debug("[unlink]: dirfd=" + $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ + " name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + " flags=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      $fid$$ = this.fs.Search(this.fids[$attr_size_dirfd_mode$jscomp$15_olddirfid_state$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      if (-1 == $fid$$) {
        this.SendError($tag$$, "No such file or directory", ENOENT);
        this.SendReply($bufchain$$);
        break;
      }
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = this.fs.Unlink(this.fids[$attr_size_dirfd_mode$jscomp$15_olddirfid_state$$].inodeid, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      if (0 > $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$) {
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "";
        $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ === -ENOTEMPTY ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "Directory not empty" : $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ === -EPERM ? $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = 
        "Operation not permitted" : ($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = "Unknown error: " + -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$, dbg_assert(!1, "[unlink]: Unexpected error code: " + -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$));
        this.SendError($tag$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, -$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$);
        this.SendReply($bufchain$$);
        break;
      }
      this.BuildReply($id$$, $tag$$, 0);
      this.SendReply($bufchain$$);
      break;
    case 100:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "s"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      message.Debug("[version]: msize=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0] + " version=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1]);
      this.msize = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = marshall.Marshall(["w", "s"], [this.msize, this.VERSION], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
      this.SendReply($bufchain$$);
      break;
    case 104:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "w", "s", "s", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[4];
      message.Debug("[attach]: fid=" + $fid$$ + " afid=" + hex8($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1]) + " uname=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2] + " aname=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3]);
      this.fids[$fid$$] = this.Createfid(0, FID_INODE, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, "");
      $inode$$ = this.fs.GetInode(this.fids[$fid$$].inodeid);
      marshall.Marshall(["Q"], [$inode$$.qid], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, 13);
      this.SendReply($bufchain$$);
      this.bus.send("9p-attach");
      break;
    case 108:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["h"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      message.Debug("[flush] " + $tag$$);
      this.BuildReply($id$$, $tag$$, 0);
      this.SendReply($bufchain$$);
      break;
    case 110:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "w", "h"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $count$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      var $nwname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      message.Debug("[walk]: fid=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0] + " nwfid=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] + " nwname=" + $nwname$$);
      if (0 == $nwname$$) {
        this.fids[$count$$] = this.Createfid(this.fids[$fid$$].inodeid, FID_INODE, this.fids[$fid$$].uid, this.fids[$fid$$].dbg_name);
        marshall.Marshall(["h"], [0], this.replybuffer, 7);
        this.BuildReply($id$$, $tag$$, 2);
        this.SendReply($bufchain$$);
        break;
      }
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = [];
      for ($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = 0; $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ < $nwname$$; $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$++) {
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$.push("s");
      }
      $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = marshall.Unmarshall($error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$, $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = this.fids[$fid$$].inodeid;
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = 9;
      var $nwidx$$ = 0;
      message.Debug("walk in dir " + this.fids[$fid$$].dbg_name + " to: " + $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$.toString());
      for ($data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = 0; $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ < $nwname$$; $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$++) {
        $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = this.fs.Search($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$[$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$]);
        if (-1 == $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$) {
          message.Debug("Could not find: " + $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$[$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$]);
          break;
        }
        $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ += marshall.Marshall(["Q"], [this.fs.GetInode($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$).qid], this.replybuffer, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$);
        $nwidx$$++;
        this.fids[$count$$] = this.Createfid($buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, FID_INODE, this.fids[$fid$$].uid, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$[$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$]);
      }
      marshall.Marshall(["h"], [$nwidx$$], this.replybuffer, 7);
      this.BuildReply($id$$, $tag$$, $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ - 7);
      this.SendReply($bufchain$$);
      break;
    case 120:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      message.Debug("[clunk]: fid=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0]);
      this.fids[$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0]] && 0 <= this.fids[$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0]].inodeid && (await this.fs.CloseInode(this.fids[$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0]].inodeid), this.fids[$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0]].inodeid = 
      -1, this.fids[$data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0]].type = FID_NONE);
      this.BuildReply($id$$, $tag$$, 0);
      this.SendReply($bufchain$$);
      break;
    case 32:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "s", "d", "w"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1];
      $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[3];
      message.Debug("[txattrcreate]: fid=" + $fid$$ + " name=" + $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ + " attr_size=" + $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$ + " flags=" + $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$);
      this.fids[$fid$$].type = FID_XATTR;
      this.BuildReply($id$$, $tag$$, 0);
      this.SendReply($bufchain$$);
      break;
    case 30:
      $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$ = marshall.Unmarshall(["w", "w", "s"], $buffer$jscomp$16_dfid_flags$jscomp$5_idx$jscomp$1_major_newname$$, $attr_size_dirfd_mode$jscomp$15_olddirfid_state$$);
      $fid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0];
      $error_message_error_message$jscomp$1_error_message$jscomp$2_lock_length_lock_request_name$jscomp$74_newdirfid_offset$jscomp$27_size$jscomp$22_uid$$ = $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2];
      message.Debug("[xattrwalk]: fid=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[0] + " newfid=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[1] + " name=" + $data$jscomp$88_filename$jscomp$2_gid_header$jscomp$2_i$jscomp$10_inodeid$jscomp$1_newidx_req_ret_version$$[2]);
      this.SendError($tag$$, "Setxattr not supported", EOPNOTSUPP);
      this.SendReply($bufchain$$);
      break;
    default:
      message.Debug("Error in Virtio9p: Unknown id " + $id$$ + " received"), message.Abort();
  }
};
var DEBUG = !0, LOG_TO_FILE = !1, LOG_ALL_IO = !1, DUMP_GENERATED_WASM = !1, DUMP_UNCOMPILED_ASSEMBLY = !1, TRACK_FILENAMES = !1, LOG_LEVEL = LOG_ALL & ~LOG_PS2 & ~LOG_PIT & ~LOG_VIRTIO & ~LOG_9P & ~LOG_PIC & ~LOG_DMA & ~LOG_SERIAL & ~LOG_NET & ~LOG_FLOPPY & ~LOG_DISK & ~LOG_VGA & ~LOG_SB16, DEBUG_SCREEN_LAYERS = DEBUG && !1, ENABLE_HPET = DEBUG && !1, TIME_PER_FRAME = 1, TSC_RATE = 1E6, APIC_TIMER_FREQ = TSC_RATE;
function IO($cpu$$) {
  this.ports = [];
  this.cpu = $cpu$$;
  for (var $i$$ = 0; 65536 > $i$$; $i$$++) {
    this.ports[$i$$] = this.create_empty_entry();
  }
  var $memory_size$$ = $cpu$$.memory_size[0];
  for ($i$$ = 0; $i$$ << MMAP_BLOCK_BITS < $memory_size$$; $i$$++) {
    $cpu$$.memory_map_read8[$i$$] = $cpu$$.memory_map_write8[$i$$] = void 0, $cpu$$.memory_map_read32[$i$$] = $cpu$$.memory_map_write32[$i$$] = void 0;
  }
  this.mmap_register($memory_size$$, 4294967296 - $memory_size$$, function($addr$$) {
    dbg_log("Read from unmapped memory space, addr=" + h($addr$$ >>> 0, 8), LOG_IO);
    return 255;
  }, function($addr$$, $value$$) {
    dbg_log("Write to unmapped memory space, addr=" + h($addr$$ >>> 0, 8) + " value=" + h($value$$, 2), LOG_IO);
  }, function($addr$$) {
    dbg_log("Read from unmapped memory space, addr=" + h($addr$$ >>> 0, 8), LOG_IO);
    return -1;
  }, function($addr$$, $value$$) {
    dbg_log("Write to unmapped memory space, addr=" + h($addr$$ >>> 0, 8) + " value=" + h($value$$ >>> 0, 8), LOG_IO);
  });
}
IO.prototype.create_empty_entry = function() {
  return {read8:this.empty_port_read8, read16:this.empty_port_read16, read32:this.empty_port_read32, write8:this.empty_port_write, write16:this.empty_port_write, write32:this.empty_port_write, device:void 0, };
};
IO.prototype.empty_port_read8 = function() {
  return 255;
};
IO.prototype.empty_port_read16 = function() {
  return 65535;
};
IO.prototype.empty_port_read32 = function() {
  return -1;
};
IO.prototype.empty_port_write = function($x$$) {
};
IO.prototype.register_read = function($port_addr$$, $device$$, $r8$$, $r16$$, $r32$$) {
  dbg_assert("number" === typeof $port_addr$$);
  dbg_assert("object" === typeof $device$$);
  dbg_assert(!$r8$$ || "function" === typeof $r8$$);
  dbg_assert(!$r16$$ || "function" === typeof $r16$$);
  dbg_assert(!$r32$$ || "function" === typeof $r32$$);
  dbg_assert($r8$$ || $r16$$ || $r32$$);
  if (DEBUG) {
    var $fail$$ = function($n$$) {
      dbg_assert(!1, "Overlapped read" + $n$$ + " " + h($port_addr$$, 4) + " (" + $device$$.name + ")");
      return -1 >>> 32 - $n$$ | 0;
    };
    $r8$$ || ($r8$$ = $fail$$.bind(this, 8));
    $r16$$ || ($r16$$ = $fail$$.bind(this, 16));
    $r32$$ || ($r32$$ = $fail$$.bind(this, 32));
  }
  $r8$$ && (this.ports[$port_addr$$].read8 = $r8$$);
  $r16$$ && (this.ports[$port_addr$$].read16 = $r16$$);
  $r32$$ && (this.ports[$port_addr$$].read32 = $r32$$);
  this.ports[$port_addr$$].device = $device$$;
};
IO.prototype.register_write = function($port_addr$$, $device$$, $w8$$, $w16$$, $w32$$) {
  dbg_assert("number" === typeof $port_addr$$);
  dbg_assert("object" === typeof $device$$);
  dbg_assert(!$w8$$ || "function" === typeof $w8$$);
  dbg_assert(!$w16$$ || "function" === typeof $w16$$);
  dbg_assert(!$w32$$ || "function" === typeof $w32$$);
  dbg_assert($w8$$ || $w16$$ || $w32$$);
  if (DEBUG) {
    var $fail$$ = function($n$$) {
      dbg_assert(!1, "Overlapped write" + $n$$ + " " + h($port_addr$$) + " (" + $device$$.name + ")");
    };
    $w8$$ || ($w8$$ = $fail$$.bind(this, 8));
    $w16$$ || ($w16$$ = $fail$$.bind(this, 16));
    $w32$$ || ($w32$$ = $fail$$.bind(this, 32));
  }
  $w8$$ && (this.ports[$port_addr$$].write8 = $w8$$);
  $w16$$ && (this.ports[$port_addr$$].write16 = $w16$$);
  $w32$$ && (this.ports[$port_addr$$].write32 = $w32$$);
  this.ports[$port_addr$$].device = $device$$;
};
IO.prototype.register_read_consecutive = function($port_addr$$, $device$$, $r8_1$$, $r8_2$$, $r8_3$$, $r8_4$$) {
  function $r16_1$$() {
    return $r8_1$$.call(this) | $r8_2$$.call(this) << 8;
  }
  function $r16_2$$() {
    return $r8_3$$.call(this) | $r8_4$$.call(this) << 8;
  }
  function $r32$$() {
    return $r8_1$$.call(this) | $r8_2$$.call(this) << 8 | $r8_3$$.call(this) << 16 | $r8_4$$.call(this) << 24;
  }
  dbg_assert(4 === arguments.length || 6 === arguments.length);
  $r8_3$$ && $r8_4$$ ? (this.register_read($port_addr$$, $device$$, $r8_1$$, $r16_1$$, $r32$$), this.register_read($port_addr$$ + 1, $device$$, $r8_2$$), this.register_read($port_addr$$ + 2, $device$$, $r8_3$$, $r16_2$$), this.register_read($port_addr$$ + 3, $device$$, $r8_4$$)) : (this.register_read($port_addr$$, $device$$, $r8_1$$, $r16_1$$), this.register_read($port_addr$$ + 1, $device$$, $r8_2$$));
};
IO.prototype.register_write_consecutive = function($port_addr$$, $device$$, $w8_1$$, $w8_2$$, $w8_3$$, $w8_4$$) {
  function $w16_1$$($data$$) {
    $w8_1$$.call(this, $data$$ & 255);
    $w8_2$$.call(this, $data$$ >> 8 & 255);
  }
  function $w16_2$$($data$$) {
    $w8_3$$.call(this, $data$$ & 255);
    $w8_4$$.call(this, $data$$ >> 8 & 255);
  }
  function $w32$$($data$$) {
    $w8_1$$.call(this, $data$$ & 255);
    $w8_2$$.call(this, $data$$ >> 8 & 255);
    $w8_3$$.call(this, $data$$ >> 16 & 255);
    $w8_4$$.call(this, $data$$ >>> 24);
  }
  dbg_assert(4 === arguments.length || 6 === arguments.length);
  $w8_3$$ && $w8_4$$ ? (this.register_write($port_addr$$, $device$$, $w8_1$$, $w16_1$$, $w32$$), this.register_write($port_addr$$ + 1, $device$$, $w8_2$$), this.register_write($port_addr$$ + 2, $device$$, $w8_3$$, $w16_2$$), this.register_write($port_addr$$ + 3, $device$$, $w8_4$$)) : (this.register_write($port_addr$$, $device$$, $w8_1$$, $w16_1$$), this.register_write($port_addr$$ + 1, $device$$, $w8_2$$));
};
IO.prototype.mmap_read32_shim = function($addr$$) {
  var $fn$$ = this.cpu.memory_map_read8[$addr$$ >>> MMAP_BLOCK_BITS];
  return $fn$$($addr$$) | $fn$$($addr$$ + 1) << 8 | $fn$$($addr$$ + 2) << 16 | $fn$$($addr$$ + 3) << 24;
};
IO.prototype.mmap_write32_shim = function($addr$$, $value$$) {
  var $fn$$ = this.cpu.memory_map_write8[$addr$$ >>> MMAP_BLOCK_BITS];
  $fn$$($addr$$, $value$$ & 255);
  $fn$$($addr$$ + 1, $value$$ >> 8 & 255);
  $fn$$($addr$$ + 2, $value$$ >> 16 & 255);
  $fn$$($addr$$ + 3, $value$$ >>> 24);
};
IO.prototype.mmap_register = function($addr$jscomp$6_aligned_addr$$, $size$$, $read_func8$$, $write_func8$$, $read_func32$$, $write_func32$$) {
  dbg_log("mmap_register addr=" + h($addr$jscomp$6_aligned_addr$$ >>> 0, 8) + " size=" + h($size$$, 8), LOG_IO);
  dbg_assert(0 === ($addr$jscomp$6_aligned_addr$$ & MMAP_BLOCK_SIZE - 1));
  dbg_assert($size$$ && 0 === ($size$$ & MMAP_BLOCK_SIZE - 1));
  $read_func32$$ || ($read_func32$$ = this.mmap_read32_shim.bind(this));
  $write_func32$$ || ($write_func32$$ = this.mmap_write32_shim.bind(this));
  for ($addr$jscomp$6_aligned_addr$$ >>>= MMAP_BLOCK_BITS; 0 < $size$$; $addr$jscomp$6_aligned_addr$$++) {
    this.cpu.memory_map_read8[$addr$jscomp$6_aligned_addr$$] = $read_func8$$, this.cpu.memory_map_write8[$addr$jscomp$6_aligned_addr$$] = $write_func8$$, this.cpu.memory_map_read32[$addr$jscomp$6_aligned_addr$$] = $read_func32$$, this.cpu.memory_map_write32[$addr$jscomp$6_aligned_addr$$] = $write_func32$$, $size$$ -= MMAP_BLOCK_SIZE;
  }
};
IO.prototype.port_write8 = function($port_addr$$, $data$$) {
  var $entry$$ = this.ports[$port_addr$$];
  ($entry$$.write8 === this.empty_port_write || LOG_ALL_IO) && dbg_log("write8 port #" + h($port_addr$$, 4) + " <- " + h($data$$, 2) + this.get_port_description($port_addr$$), LOG_IO);
  return $entry$$.write8.call($entry$$.device, $data$$);
};
IO.prototype.port_write16 = function($port_addr$$, $data$$) {
  var $entry$$ = this.ports[$port_addr$$];
  ($entry$$.write16 === this.empty_port_write || LOG_ALL_IO) && dbg_log("write16 port #" + h($port_addr$$, 4) + " <- " + h($data$$, 4) + this.get_port_description($port_addr$$), LOG_IO);
  return $entry$$.write16.call($entry$$.device, $data$$);
};
IO.prototype.port_write32 = function($port_addr$$, $data$$) {
  var $entry$$ = this.ports[$port_addr$$];
  ($entry$$.write32 === this.empty_port_write || LOG_ALL_IO) && dbg_log("write32 port #" + h($port_addr$$, 4) + " <- " + h($data$$ >>> 0, 8) + this.get_port_description($port_addr$$), LOG_IO);
  return $entry$$.write32.call($entry$$.device, $data$$);
};
IO.prototype.port_read8 = function($port_addr$$) {
  var $entry$jscomp$3_value$$ = this.ports[$port_addr$$];
  ($entry$jscomp$3_value$$.read8 === this.empty_port_read8 || LOG_ALL_IO) && dbg_log("read8 port  #" + h($port_addr$$, 4) + this.get_port_description($port_addr$$), LOG_IO);
  $entry$jscomp$3_value$$ = $entry$jscomp$3_value$$.read8.call($entry$jscomp$3_value$$.device);
  dbg_assert(256 > $entry$jscomp$3_value$$, "8 bit port returned large value: " + h($port_addr$$));
  return $entry$jscomp$3_value$$;
};
IO.prototype.port_read16 = function($port_addr$$) {
  var $entry$jscomp$4_value$$ = this.ports[$port_addr$$];
  ($entry$jscomp$4_value$$.read16 === this.empty_port_read16 || LOG_ALL_IO) && dbg_log("read16 port  #" + h($port_addr$$, 4) + this.get_port_description($port_addr$$), LOG_IO);
  $entry$jscomp$4_value$$ = $entry$jscomp$4_value$$.read16.call($entry$jscomp$4_value$$.device);
  dbg_assert(65536 > $entry$jscomp$4_value$$ && 0 <= $entry$jscomp$4_value$$, "16 bit port returned large value: " + h($port_addr$$));
  return $entry$jscomp$4_value$$;
};
IO.prototype.port_read32 = function($port_addr$jscomp$9_value$$) {
  var $entry$$ = this.ports[$port_addr$jscomp$9_value$$];
  ($entry$$.read32 === this.empty_port_read32 || LOG_ALL_IO) && dbg_log("read32 port  #" + h($port_addr$jscomp$9_value$$, 4) + this.get_port_description($port_addr$jscomp$9_value$$), LOG_IO);
  $port_addr$jscomp$9_value$$ = $entry$$.read32.call($entry$$.device);
  dbg_assert(($port_addr$jscomp$9_value$$ | 0) === $port_addr$jscomp$9_value$$);
  return $port_addr$jscomp$9_value$$;
};
var debug_port_list = {4:"PORT_DMA_ADDR_2", 5:"PORT_DMA_CNT_2", 10:"PORT_DMA1_MASK_REG", 11:"PORT_DMA1_MODE_REG", 12:"PORT_DMA1_CLEAR_FF_REG", 13:"PORT_DMA1_MASTER_CLEAR", 32:"PORT_PIC1_CMD", 33:"PORT_PIC1_DATA", 64:"PORT_PIT_COUNTER0", 65:"PORT_PIT_COUNTER1", 66:"PORT_PIT_COUNTER2", 67:"PORT_PIT_MODE", 96:"PORT_PS2_DATA", 97:"PORT_PS2_CTRLB", 100:"PORT_PS2_STATUS", 112:"PORT_CMOS_INDEX", 113:"PORT_CMOS_DATA", 128:"PORT_DIAG", 129:"PORT_DMA_PAGE_2", 146:"PORT_A20", 160:"PORT_PIC2_CMD", 161:"PORT_PIC2_DATA", 
178:"PORT_SMI_CMD", 179:"PORT_SMI_STATUS", 212:"PORT_DMA2_MASK_REG", 214:"PORT_DMA2_MODE_REG", 218:"PORT_DMA2_MASTER_CLEAR", 240:"PORT_MATH_CLEAR", 368:"PORT_ATA2_CMD_BASE", 496:"PORT_ATA1_CMD_BASE", 632:"PORT_LPT2", 744:"PORT_SERIAL4", 760:"PORT_SERIAL2", 884:"PORT_ATA2_CTRL_BASE", 888:"PORT_LPT1", 1E3:"PORT_SERIAL3", 1008:"PORT_FD_BASE", 1010:"PORT_FD_DOR", 1012:"PORT_FD_STATUS", 1013:"PORT_FD_DATA", 1014:"PORT_HD_DATA", 1015:"PORT_FD_DIR", 1016:"PORT_SERIAL1", 3320:"PORT_PCI_CMD", 3321:"PORT_PCI_REBOOT", 
3324:"PORT_PCI_DATA", 1026:"PORT_BIOS_DEBUG", 1296:"PORT_QEMU_CFG_CTL", 1297:"PORT_QEMU_CFG_DATA", 45056:"PORT_ACPI_PM_BASE", 45312:"PORT_SMB_BASE", 35072:"PORT_BIOS_APM"};
IO.prototype.get_port_description = function($addr$$) {
  return debug_port_list[$addr$$] ? "  (" + debug_port_list[$addr$$] + ")" : "";
};
function v86($bus$$, $wasm$$) {
  this.stopping = this.running = !1;
  this.tick_counter = 0;
  this.worker = null;
  this.cpu = new CPU($bus$$, $wasm$$, () => {
    this.idle && this.next_tick(0);
  });
  this.bus = $bus$$;
  $bus$$.register("cpu-init", this.init, this);
  $bus$$.register("cpu-run", this.run, this);
  $bus$$.register("cpu-stop", this.stop, this);
  $bus$$.register("cpu-restart", this.restart, this);
  this.register_yield();
}
v86.prototype.run = function() {
  this.stopping = !1;
  this.running || (this.running = !0, this.bus.send("emulator-started"));
  this.next_tick(0);
};
v86.prototype.do_tick = function() {
  if (this.stopping || !this.running) {
    this.stopping = this.running = !1, this.bus.send("emulator-stopped");
  } else {
    this.idle = !1;
    var $t$$ = this.cpu.main_run();
    this.next_tick($t$$);
  }
};
v86.prototype.next_tick = function($t$$) {
  const $tick$$ = ++this.tick_counter;
  this.idle = !0;
  this.yield($t$$, $tick$$);
};
v86.prototype.yield_callback = function($tick$$) {
  $tick$$ === this.tick_counter && this.do_tick();
};
v86.prototype.stop = function() {
  this.running && (this.stopping = !0);
};
v86.prototype.destroy = function() {
  this.unregister_yield();
};
v86.prototype.restart = function() {
  this.cpu.reset_cpu();
  this.cpu.load_bios();
};
v86.prototype.init = function($settings$$) {
  this.cpu.init($settings$$, this.bus);
  this.bus.send("emulator-ready");
};
if ("undefined" !== typeof process) {
  v86.prototype.yield = function($t$$, $tick$jscomp$0$$) {
    1 > $t$$ ? global.setImmediate($tick$$ => this.yield_callback($tick$$), $tick$jscomp$0$$) : setTimeout($tick$$ => this.yield_callback($tick$$), $t$$, $tick$jscomp$0$$);
  }, v86.prototype.register_yield = function() {
  }, v86.prototype.unregister_yield = function() {
  };
} else {
  if ("undefined" !== typeof Worker) {
    function $the_worker$$() {
      globalThis.onmessage = function($e$$) {
        const $t$$ = $e$$.data.t;
        1 > $t$$ ? postMessage($e$$.data.tick) : setTimeout(() => postMessage($e$$.data.tick), $t$$);
      };
    }
    v86.prototype.register_yield = function() {
      const $url$$ = URL.createObjectURL(new Blob(["(" + $the_worker$$.toString() + ")()"], {type:"text/javascript"}));
      this.worker = new Worker($url$$);
      this.worker.onmessage = $e$$ => this.yield_callback($e$$.data);
      URL.revokeObjectURL($url$$);
    };
    v86.prototype.yield = function($t$$, $tick$$) {
      this.worker.postMessage({t:$t$$, tick:$tick$$});
    };
    v86.prototype.unregister_yield = function() {
      this.worker.terminate();
      this.worker = null;
    };
  } else {
    v86.prototype.yield = function($t$$) {
      setTimeout(() => {
        this.do_tick();
      }, $t$$);
    }, v86.prototype.register_yield = function() {
    }, v86.prototype.unregister_yield = function() {
    };
  }
}
v86.prototype.save_state = function() {
  return this.cpu.save_state();
};
v86.prototype.restore_state = function($state$$) {
  return this.cpu.restore_state($state$$);
};
if ("object" === typeof performance && performance.now) {
  v86.microtick = performance.now.bind(performance);
} else {
  if ("function" === typeof require) {
    const {performance:$performance$$} = require("perf_hooks");
    v86.microtick = $performance$$.now.bind($performance$$);
  } else {
    v86.microtick = "object" === typeof process && process.hrtime ? function() {
      var $t$$ = process.hrtime();
      return 1000 * $t$$[0] + $t$$[1] / 1e6;
    } : Date.now;
  }
}
;var goog = goog || {};
goog.exportSymbol = function() {
};
goog.exportProperty = function() {
};
var v86util = v86util || {};
v86util.pads = function($str$$, $len$$) {
  return ($str$$ || 0 === $str$$ ? $str$$ + "" : "").padEnd($len$$, " ");
};
v86util.pad0 = function($str$$, $len$$) {
  return ($str$$ || 0 === $str$$ ? $str$$ + "" : "").padStart($len$$, "0");
};
v86util.zeros = function($size$$) {
  return Array($size$$).fill(0);
};
v86util.range = function($size$$) {
  return Array.from(Array($size$$).keys());
};
v86util.view = function($constructor$$, $memory$$, $offset$$, $length$$) {
  return new Proxy({}, {get:function($b$jscomp$1_target$$, $property$$, $receiver_x$$) {
    $b$jscomp$1_target$$ = new $constructor$$($memory$$.buffer, $offset$$, $length$$);
    $receiver_x$$ = $b$jscomp$1_target$$[$property$$];
    if ("function" === typeof $receiver_x$$) {
      return $receiver_x$$.bind($b$jscomp$1_target$$);
    }
    dbg_assert(/^\d+$/.test($property$$) || "buffer" === $property$$ || "length" === $property$$ || "BYTES_PER_ELEMENT" === $property$$ || "byteOffset" === $property$$);
    return $receiver_x$$;
  }, set:function($target$$, $property$$, $value$$, $receiver$$) {
    dbg_assert(/^\d+$/.test($property$$));
    (new $constructor$$($memory$$.buffer, $offset$$, $length$$))[$property$$] = $value$$;
    return !0;
  }, });
};
function h($n$jscomp$5_str$$, $len$$) {
  $n$jscomp$5_str$$ = $n$jscomp$5_str$$ ? $n$jscomp$5_str$$.toString(16) : "";
  return "0x" + v86util.pad0($n$jscomp$5_str$$.toUpperCase(), $len$$ || 1);
}
function hex_dump($buffer$$) {
  function $hex$$($n$$, $len$$) {
    return v86util.pad0($n$$.toString(16).toUpperCase(), $len$$);
  }
  const $result$$ = [];
  let $offset$$ = 0;
  for (; $offset$$ + 15 < $buffer$$.length; $offset$$ += 16) {
    $line_line$$ = $hex$$($offset$$, 5) + "   ";
    for ($j_j$$ = 0; 16 > $j_j$$; $j_j$$++) {
      $line_line$$ += $hex$$($buffer$$[$offset$$ + $j_j$$], 2) + " ";
    }
    $line_line$$ += "  ";
    for ($j_j$$ = 0; 16 > $j_j$$; $j_j$$++) {
      var $j$jscomp$2_x$$ = $buffer$$[$offset$$ + $j_j$$];
      $line_line$$ += 33 <= $j$jscomp$2_x$$ && 34 !== $j$jscomp$2_x$$ && 92 !== $j$jscomp$2_x$$ && 126 >= $j$jscomp$2_x$$ ? String.fromCharCode($j$jscomp$2_x$$) : ".";
    }
    $result$$.push($line_line$$);
  }
  for (var $line_line$$ = $hex$$($offset$$, 5) + "   "; $offset$$ < $buffer$$.length; $offset$$++) {
    $line_line$$ += $hex$$($buffer$$[$offset$$], 2) + " ";
  }
  var $j_j$$ = $offset$$ & 15;
  $line_line$$ += "   ".repeat(16 - $j_j$$);
  $line_line$$ += "  ";
  for ($j$jscomp$2_x$$ = 0; $j$jscomp$2_x$$ < $j_j$$; $j$jscomp$2_x$$++) {
    const $x$$ = $buffer$$[$offset$$ + $j$jscomp$2_x$$];
    $line_line$$ += 33 <= $x$$ && 34 !== $x$$ && 92 !== $x$$ && 126 >= $x$$ ? String.fromCharCode($x$$) : ".";
  }
  $result$$.push($line_line$$);
  return "\n" + $result$$.join("\n") + "\n";
}
if ("undefined" !== typeof crypto && crypto.getRandomValues) {
  let $rand_data$$ = new Int32Array(1);
  v86util.get_rand_int = function() {
    crypto.getRandomValues($rand_data$$);
    return $rand_data$$[0];
  };
} else {
  if ("undefined" !== typeof require) {
    const $crypto$$ = require("crypto");
    v86util.get_rand_int = function() {
      return $crypto$$.randomBytes(4).readInt32LE(0);
    };
  } else {
    dbg_assert(!1, "Unsupported platform: No cryptographic random values");
  }
}
(function() {
  if ("function" === typeof Math.clz32) {
    v86util.int_log2_byte = function($x$$) {
      dbg_assert(0 < $x$$);
      dbg_assert(256 > $x$$);
      return 31 - Math.clz32($x$$);
    }, v86util.int_log2 = function($x$$) {
      dbg_assert(0 < $x$$);
      return 31 - Math.clz32($x$$);
    };
  } else {
    for (var $int_log2_table$$ = new Int8Array(256), $i$$ = 0, $b$$ = -2; 256 > $i$$; $i$$++) {
      $i$$ & $i$$ - 1 || $b$$++, $int_log2_table$$[$i$$] = $b$$;
    }
    v86util.int_log2_byte = function($x$$) {
      dbg_assert(0 < $x$$);
      dbg_assert(256 > $x$$);
      return $int_log2_table$$[$x$$];
    };
    v86util.int_log2 = function($x$$) {
      $x$$ >>>= 0;
      dbg_assert(0 < $x$$);
      var $tt$$ = $x$$ >>> 16;
      if ($tt$$) {
        var $t$$ = $tt$$ >>> 8;
        return $t$$ ? 24 + $int_log2_table$$[$t$$] : 16 + $int_log2_table$$[$tt$$];
      }
      return ($t$$ = $x$$ >>> 8) ? 8 + $int_log2_table$$[$t$$] : $int_log2_table$$[$x$$];
    };
  }
})();
function ByteQueue($size$$) {
  var $data$$ = new Uint8Array($size$$), $start$$, $end$$;
  dbg_assert(0 === ($size$$ & $size$$ - 1));
  this.length = 0;
  this.push = function($item$$) {
    this.length !== $size$$ && this.length++;
    $data$$[$end$$] = $item$$;
    $end$$ = $end$$ + 1 & $size$$ - 1;
  };
  this.shift = function() {
    if (this.length) {
      var $item$$ = $data$$[$start$$];
      $start$$ = $start$$ + 1 & $size$$ - 1;
      this.length--;
      return $item$$;
    }
    return -1;
  };
  this.peek = function() {
    return this.length ? $data$$[$start$$] : -1;
  };
  this.clear = function() {
    this.length = $end$$ = $start$$ = 0;
  };
  this.clear();
}
function FloatQueue($size$$) {
  this.size = $size$$;
  this.data = new Float32Array($size$$);
  this.length = this.end = this.start = 0;
  dbg_assert(0 === ($size$$ & $size$$ - 1));
}
FloatQueue.prototype.push = function($item$$) {
  this.length === this.size ? this.start = this.start + 1 & this.size - 1 : this.length++;
  this.data[this.end] = $item$$;
  this.end = this.end + 1 & this.size - 1;
};
FloatQueue.prototype.shift = function() {
  if (this.length) {
    var $item$$ = this.data[this.start];
    this.start = this.start + 1 & this.size - 1;
    this.length--;
    return $item$$;
  }
};
FloatQueue.prototype.shift_block = function($count$$) {
  var $slice$$ = new Float32Array($count$$);
  $count$$ > this.length && ($count$$ = this.length);
  var $slice_end$$ = this.start + $count$$, $partial$$ = this.data.subarray(this.start, $slice_end$$);
  $slice$$.set($partial$$);
  $slice_end$$ >= this.size && ($slice_end$$ -= this.size, $slice$$.set(this.data.subarray(0, $slice_end$$), $partial$$.length));
  this.start = $slice_end$$;
  this.length -= $count$$;
  return $slice$$;
};
FloatQueue.prototype.peek = function() {
  if (this.length) {
    return this.data[this.start];
  }
};
FloatQueue.prototype.clear = function() {
  this.length = this.end = this.start = 0;
};
function CircularQueue($size$$) {
  this.data = [];
  this.index = 0;
  this.size = $size$$;
}
CircularQueue.prototype.add = function($item$$) {
  this.data[this.index] = $item$$;
  this.index = (this.index + 1) % this.size;
};
CircularQueue.prototype.toArray = function() {
  return [].slice.call(this.data, this.index).concat([].slice.call(this.data, 0, this.index));
};
CircularQueue.prototype.clear = function() {
  this.data = [];
  this.index = 0;
};
CircularQueue.prototype.set = function($new_data$$) {
  this.data = $new_data$$;
  this.index = 0;
};
function dump_file($ab_blob$$, $name$$) {
  $ab_blob$$ instanceof Array || ($ab_blob$$ = [$ab_blob$$]);
  $ab_blob$$ = new Blob($ab_blob$$);
  download($ab_blob$$, $name$$);
}
function download($ev_file_or_blob$$, $name$$) {
  var $a$$ = document.createElement("a");
  $a$$.download = $name$$;
  $a$$.href = window.URL.createObjectURL($ev_file_or_blob$$);
  $a$$.dataset.downloadurl = ["application/octet-stream", $a$$.download, $a$$.href].join(":");
  document.createEvent ? ($ev_file_or_blob$$ = document.createEvent("MouseEvent"), $ev_file_or_blob$$.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), $a$$.dispatchEvent($ev_file_or_blob$$)) : $a$$.click();
  window.URL.revokeObjectURL($a$$.href);
}
v86util.Bitmap = function($length_or_buffer$$) {
  "number" === typeof $length_or_buffer$$ ? this.view = new Uint8Array($length_or_buffer$$ + 7 >> 3) : $length_or_buffer$$ instanceof ArrayBuffer ? this.view = new Uint8Array($length_or_buffer$$) : dbg_assert(!1, "v86util.Bitmap: Invalid argument");
};
v86util.Bitmap.prototype.set = function($bit_mask_index$$, $value$$) {
  const $byte_index$$ = $bit_mask_index$$ >> 3;
  $bit_mask_index$$ = 1 << ($bit_mask_index$$ & 7);
  this.view[$byte_index$$] = $value$$ ? this.view[$byte_index$$] | $bit_mask_index$$ : this.view[$byte_index$$] & ~$bit_mask_index$$;
};
v86util.Bitmap.prototype.get = function($index$$) {
  return this.view[$index$$ >> 3] >> ($index$$ & 7) & 1;
};
v86util.Bitmap.prototype.get_buffer = function() {
  return this.view.buffer;
};
v86util.load_file = "undefined" === typeof XMLHttpRequest ? load_file_nodejs : load_file;
function load_file($filename$$, $options$$, $n_tries$$) {
  function $retry$$() {
    const $number_of_tries$$ = $n_tries$$ || 0;
    setTimeout(() => {
      load_file($filename$$, $options$$, $number_of_tries$$ + 1);
    }, 1000 * ([1, 1, 2, 3, 5, 8, 13, 21][$number_of_tries$$] || 34));
  }
  var $http$$ = new XMLHttpRequest;
  $http$$.open($options$$.method || "get", $filename$$, !0);
  $http$$.responseType = $options$$.as_json ? "json" : "arraybuffer";
  if ($options$$.headers) {
    for (var $header_names_start$$ = Object.keys($options$$.headers), $i$$ = 0; $i$$ < $header_names_start$$.length; $i$$++) {
      var $name$$ = $header_names_start$$[$i$$];
      $http$$.setRequestHeader($name$$, $options$$.headers[$name$$]);
    }
  }
  $options$$.range && ($header_names_start$$ = $options$$.range.start, $http$$.setRequestHeader("Range", "bytes=" + $header_names_start$$ + "-" + ($header_names_start$$ + $options$$.range.length - 1)), $http$$.onreadystatechange = function() {
    200 === $http$$.status && $http$$.abort();
  });
  $http$$.onload = function($e$$) {
    4 === $http$$.readyState && (200 !== $http$$.status && 206 !== $http$$.status ? (console.error("Loading the image " + $filename$$ + " failed (status %d)", $http$$.status), 500 <= $http$$.status && 600 > $http$$.status && $retry$$()) : $http$$.response && $options$$.done && $options$$.done($http$$.response, $http$$));
  };
  $http$$.onerror = function($e$$) {
    console.error("Loading the image " + $filename$$ + " failed", $e$$);
    $retry$$();
  };
  $options$$.progress && ($http$$.onprogress = function($e$$) {
    $options$$.progress($e$$);
  });
  $http$$.send(null);
}
function load_file_nodejs($filename$$, $options$$) {
  let $fs$$ = require("fs");
  $options$$.range ? (dbg_assert(!$options$$.as_json), $fs$$.open($filename$$, "r", ($err$jscomp$1$$, $fd$$) => {
    if ($err$jscomp$1$$) {
      throw $err$jscomp$1$$;
    }
    let $length$$ = $options$$.range.length;
    var $buffer$$ = Buffer.allocUnsafe($length$$);
    $fs$$.read($fd$$, $buffer$$, 0, $length$$, $options$$.range.start, ($err$jscomp$0$$, $bytes_read$$) => {
      if ($err$jscomp$0$$) {
        throw $err$jscomp$0$$;
      }
      dbg_assert($bytes_read$$ === $length$$);
      $options$$.done && $options$$.done(new Uint8Array($buffer$$));
      $fs$$.close($fd$$, $err$$ => {
        if ($err$$) {
          throw $err$$;
        }
      });
    });
  })) : $fs$$.readFile($filename$$, {encoding:$options$$.as_json ? "utf-8" : null, }, function($err$jscomp$6_result$$, $data$$) {
    $err$jscomp$6_result$$ ? console.log("Could not read file:", $filename$$, $err$jscomp$6_result$$) : ($err$jscomp$6_result$$ = $data$$, $err$jscomp$6_result$$ = $options$$.as_json ? JSON.parse($err$jscomp$6_result$$) : (new Uint8Array($err$jscomp$6_result$$)).buffer, $options$$.done($err$jscomp$6_result$$));
  });
}
v86util.read_sized_string_from_mem = function($mem$$, $offset$$, $len$$) {
  return String.fromCharCode(...(new Uint8Array($mem$$.buffer, $offset$$ >>> 0, $len$$ >>> 0)));
};
(function() {
  function $SyncBuffer$$($buffer$$) {
    dbg_assert($buffer$$ instanceof ArrayBuffer);
    this.buffer = $buffer$$;
    this.byteLength = $buffer$$.byteLength;
    this.onprogress = this.onload = void 0;
  }
  function $AsyncXHRBuffer$$($filename$$, $size$$, $fixed_chunk_size$$) {
    this.filename = $filename$$;
    this.byteLength = $size$$;
    this.block_cache = new Map;
    this.block_cache_is_write = new Set;
    this.fixed_chunk_size = $fixed_chunk_size$$;
    this.cache_reads = !!$fixed_chunk_size$$;
    this.onprogress = this.onload = void 0;
  }
  function $AsyncXHRPartfileBuffer$$($filename$$, $size$$, $fixed_chunk_size$$, $partfile_alt_format$$) {
    const $parts$$ = $filename$$.match(/(.*)(\..*)/);
    $parts$$ ? (this.basename = $parts$$[1], this.extension = $parts$$[2]) : (this.basename = $filename$$, this.extension = "");
    this.basename.endsWith("/") || (this.basename += "-");
    this.block_cache = new Map;
    this.block_cache_is_write = new Set;
    this.byteLength = $size$$;
    this.fixed_chunk_size = $fixed_chunk_size$$;
    this.partfile_alt_format = !!$partfile_alt_format$$;
    this.cache_reads = !!$fixed_chunk_size$$;
    this.onprogress = this.onload = void 0;
  }
  function $SyncFileBuffer$$($file$$) {
    this.file = $file$$;
    this.byteLength = $file$$.size;
    1073741824 < $file$$.size && console.warn("SyncFileBuffer: Allocating buffer of " + ($file$$.size >> 20) + " MB ...");
    this.buffer = new ArrayBuffer($file$$.size);
    this.onprogress = this.onload = void 0;
  }
  function $AsyncFileBuffer$$($file$$) {
    this.file = $file$$;
    this.byteLength = $file$$.size;
    this.block_cache = new Map;
    this.block_cache_is_write = new Set;
    this.onprogress = this.onload = void 0;
  }
  v86util.SyncBuffer = $SyncBuffer$$;
  v86util.AsyncXHRBuffer = $AsyncXHRBuffer$$;
  v86util.AsyncXHRPartfileBuffer = $AsyncXHRPartfileBuffer$$;
  v86util.AsyncFileBuffer = $AsyncFileBuffer$$;
  v86util.SyncFileBuffer = $SyncFileBuffer$$;
  $SyncBuffer$$.prototype.load = function() {
    this.onload && this.onload({buffer:this.buffer});
  };
  $SyncBuffer$$.prototype.get = function($start$$, $len$$, $fn$$) {
    dbg_assert($start$$ + $len$$ <= this.byteLength);
    $fn$$(new Uint8Array(this.buffer, $start$$, $len$$));
  };
  $SyncBuffer$$.prototype.set = function($start$$, $slice$$, $fn$$) {
    dbg_assert($start$$ + $slice$$.byteLength <= this.byteLength);
    (new Uint8Array(this.buffer, $start$$, $slice$$.byteLength)).set($slice$$);
    $fn$$();
  };
  $SyncBuffer$$.prototype.get_buffer = function($fn$$) {
    $fn$$(this.buffer);
  };
  $SyncBuffer$$.prototype.get_state = function() {
    const $state$$ = [];
    $state$$[0] = this.byteLength;
    $state$$[1] = new Uint8Array(this.buffer);
    return $state$$;
  };
  $SyncBuffer$$.prototype.set_state = function($state$$) {
    this.byteLength = $state$$[0];
    this.buffer = $state$$[1].slice().buffer;
  };
  $AsyncXHRBuffer$$.prototype.load = function() {
    void 0 !== this.byteLength ? this.onload && this.onload(Object.create(null)) : $determine_size$$(this.filename, ($error$$, $size$$) => {
      if ($error$$) {
        throw Error("Cannot use: " + this.filename + ". " + $error$$);
      }
      dbg_assert(0 <= $size$$);
      this.byteLength = $size$$;
      this.onload && this.onload(Object.create(null));
    });
  };
  $AsyncXHRBuffer$$.prototype.get_from_cache = function($block_index_offset$$, $len$jscomp$6_result$$) {
    var $number_of_blocks$$ = $len$jscomp$6_result$$ / 256;
    $block_index_offset$$ /= 256;
    for (var $i$$ = 0; $i$$ < $number_of_blocks$$; $i$$++) {
      if (!this.block_cache.get($block_index_offset$$ + $i$$)) {
        return;
      }
    }
    if (1 === $number_of_blocks$$) {
      return this.block_cache.get($block_index_offset$$);
    }
    $len$jscomp$6_result$$ = new Uint8Array($len$jscomp$6_result$$);
    for ($i$$ = 0; $i$$ < $number_of_blocks$$; $i$$++) {
      $len$jscomp$6_result$$.set(this.block_cache.get($block_index_offset$$ + $i$$), 256 * $i$$);
    }
    return $len$jscomp$6_result$$;
  };
  $AsyncXHRBuffer$$.prototype.get = function($offset$$, $len$$, $fn$$) {
    dbg_assert($offset$$ + $len$$ <= this.byteLength);
    dbg_assert(0 === $offset$$ % 256);
    dbg_assert(0 === $len$$ % 256);
    dbg_assert($len$$);
    var $block$$ = this.get_from_cache($offset$$, $len$$);
    if ($block$$) {
      $fn$$($block$$);
    } else {
      var $requested_start$$ = $offset$$, $requested_length$$ = $len$$;
      this.fixed_chunk_size && ($requested_start$$ = $offset$$ - $offset$$ % this.fixed_chunk_size, $requested_length$$ = Math.ceil(($offset$$ - $requested_start$$ + $len$$) / this.fixed_chunk_size) * this.fixed_chunk_size);
      v86util.load_file(this.filename, {done:function($block$jscomp$2_buffer$$) {
        $block$jscomp$2_buffer$$ = new Uint8Array($block$jscomp$2_buffer$$);
        this.handle_read($requested_start$$, $requested_length$$, $block$jscomp$2_buffer$$);
        $requested_start$$ === $offset$$ && $requested_length$$ === $len$$ ? $fn$$($block$jscomp$2_buffer$$) : $fn$$($block$jscomp$2_buffer$$.subarray($offset$$ - $requested_start$$, $offset$$ - $requested_start$$ + $len$$));
      }.bind(this), range:{start:$requested_start$$, length:$requested_length$$}, });
    }
  };
  $AsyncXHRBuffer$$.prototype.set = function($start$$, $data$$, $fn$$) {
    var $block_count_len$$ = $data$$.length;
    dbg_assert($start$$ + $data$$.byteLength <= this.byteLength);
    dbg_assert(0 === $start$$ % 256);
    dbg_assert(0 === $block_count_len$$ % 256);
    dbg_assert($block_count_len$$);
    $start$$ /= 256;
    $block_count_len$$ /= 256;
    for (var $i$$ = 0; $i$$ < $block_count_len$$; $i$$++) {
      var $block$$ = this.block_cache.get($start$$ + $i$$);
      if (void 0 === $block$$) {
        $block$$ = $data$$.slice(256 * $i$$, 256 * ($i$$ + 1)), this.block_cache.set($start$$ + $i$$, $block$$);
      } else {
        const $data_slice$$ = $data$$.subarray(256 * $i$$, 256 * ($i$$ + 1));
        dbg_assert($block$$.byteLength === $data_slice$$.length);
        $block$$.set($data_slice$$);
      }
      this.block_cache_is_write.add($start$$ + $i$$);
    }
    $fn$$();
  };
  $AsyncXHRBuffer$$.prototype.handle_read = function($offset$jscomp$33_start_block$$, $block_count$jscomp$1_len$$, $block$$) {
    $offset$jscomp$33_start_block$$ /= 256;
    $block_count$jscomp$1_len$$ /= 256;
    for (var $i$$ = 0; $i$$ < $block_count$jscomp$1_len$$; $i$$++) {
      const $cached_block$$ = this.block_cache.get($offset$jscomp$33_start_block$$ + $i$$);
      $cached_block$$ ? $block$$.set($cached_block$$, 256 * $i$$) : this.cache_reads && this.block_cache.set($offset$jscomp$33_start_block$$ + $i$$, $block$$.slice(256 * $i$$, 256 * ($i$$ + 1)));
    }
  };
  $AsyncXHRBuffer$$.prototype.get_buffer = function($fn$$) {
    $fn$$();
  };
  $AsyncXHRBuffer$$.prototype.get_state = function() {
    const $state$$ = [], $block_cache$$ = [];
    for (let [$index$$, $block$$] of this.block_cache) {
      dbg_assert(isFinite($index$$)), this.block_cache_is_write.has($index$$) && $block_cache$$.push([$index$$, $block$$]);
    }
    $state$$[0] = $block_cache$$;
    return $state$$;
  };
  $AsyncXHRBuffer$$.prototype.set_state = function($block_cache$jscomp$1_state$$) {
    $block_cache$jscomp$1_state$$ = $block_cache$jscomp$1_state$$[0];
    this.block_cache.clear();
    this.block_cache_is_write.clear();
    for (let [$index$$, $block$$] of $block_cache$jscomp$1_state$$) {
      dbg_assert(isFinite($index$$)), this.block_cache.set($index$$, $block$$), this.block_cache_is_write.add($index$$);
    }
  };
  $AsyncXHRPartfileBuffer$$.prototype.load = function() {
    void 0 === this.byteLength && dbg_assert(!1);
    this.onload && this.onload(Object.create(null));
  };
  $AsyncXHRPartfileBuffer$$.prototype.get = function($offset$$, $len$$, $fn$$) {
    dbg_assert($offset$$ + $len$$ <= this.byteLength);
    dbg_assert(0 === $offset$$ % 256);
    dbg_assert(0 === $len$$ % 256);
    dbg_assert($len$$);
    var $block$$ = this.get_from_cache($offset$$, $len$$);
    if ($block$$) {
      $fn$$($block$$);
    } else {
      if (this.fixed_chunk_size) {
        const $start_index$$ = Math.floor($offset$$ / this.fixed_chunk_size), $m_offset$$ = $offset$$ - $start_index$$ * this.fixed_chunk_size;
        dbg_assert(0 <= $m_offset$$);
        const $total_count$$ = Math.ceil(($m_offset$$ + $len$$) / this.fixed_chunk_size), $blocks$$ = new Uint8Array($total_count$$ * this.fixed_chunk_size);
        let $finished$$ = 0;
        for (let $i$$ = 0; $i$$ < $total_count$$; $i$$++) {
          var $block$jscomp$8_offset$$ = ($start_index$$ + $i$$) * this.fixed_chunk_size;
          $block$$ = this.partfile_alt_format ? this.basename + ($start_index$$ + $i$$ + "").padStart(8, "0") + this.extension : this.basename + $block$jscomp$8_offset$$ + "-" + ($block$jscomp$8_offset$$ + this.fixed_chunk_size) + this.extension;
          ($block$jscomp$8_offset$$ = this.get_from_cache($block$jscomp$8_offset$$, this.fixed_chunk_size)) ? ($blocks$$.set($block$jscomp$8_offset$$, $i$$ * this.fixed_chunk_size), $finished$$++, $finished$$ === $total_count$$ && ($block$$ = $blocks$$.subarray($m_offset$$, $m_offset$$ + $len$$), $fn$$($block$$))) : v86util.load_file($block$$, {done:function($block$jscomp$9_buffer$$) {
            var $cur$jscomp$1_tmp_blocks$$ = $i$$ * this.fixed_chunk_size;
            $block$jscomp$9_buffer$$ = new Uint8Array($block$jscomp$9_buffer$$);
            this.handle_read(($start_index$$ + $i$$) * this.fixed_chunk_size, this.fixed_chunk_size | 0, $block$jscomp$9_buffer$$);
            $blocks$$.set($block$jscomp$9_buffer$$, $cur$jscomp$1_tmp_blocks$$);
            $finished$$++;
            $finished$$ === $total_count$$ && ($cur$jscomp$1_tmp_blocks$$ = $blocks$$.subarray($m_offset$$, $m_offset$$ + $len$$), $fn$$($cur$jscomp$1_tmp_blocks$$));
          }.bind(this), });
        }
      } else {
        v86util.load_file(this.basename + $offset$$ + "-" + ($offset$$ + $len$$) + this.extension, {done:function($block$jscomp$10_buffer$$) {
          dbg_assert($block$jscomp$10_buffer$$.byteLength === $len$$);
          $block$jscomp$10_buffer$$ = new Uint8Array($block$jscomp$10_buffer$$);
          this.handle_read($offset$$, $len$$, $block$jscomp$10_buffer$$);
          $fn$$($block$jscomp$10_buffer$$);
        }.bind(this), });
      }
    }
  };
  $AsyncXHRPartfileBuffer$$.prototype.get_from_cache = $AsyncXHRBuffer$$.prototype.get_from_cache;
  $AsyncXHRPartfileBuffer$$.prototype.set = $AsyncXHRBuffer$$.prototype.set;
  $AsyncXHRPartfileBuffer$$.prototype.handle_read = $AsyncXHRBuffer$$.prototype.handle_read;
  $AsyncXHRPartfileBuffer$$.prototype.get_state = $AsyncXHRBuffer$$.prototype.get_state;
  $AsyncXHRPartfileBuffer$$.prototype.set_state = $AsyncXHRBuffer$$.prototype.set_state;
  $SyncFileBuffer$$.prototype.load = function() {
    this.load_next(0);
  };
  $SyncFileBuffer$$.prototype.load_next = function($start$$) {
    var $filereader$$ = new FileReader;
    $filereader$$.onload = function($buffer$jscomp$23_e$$) {
      $buffer$jscomp$23_e$$ = new Uint8Array($buffer$jscomp$23_e$$.target.result);
      (new Uint8Array(this.buffer, $start$$)).set($buffer$jscomp$23_e$$);
      this.load_next($start$$ + 4194304);
    }.bind(this);
    if (this.onprogress) {
      this.onprogress({loaded:$start$$, total:this.byteLength, lengthComputable:!0, });
    }
    if ($start$$ < this.byteLength) {
      var $slice$$ = this.file.slice($start$$, Math.min($start$$ + 4194304, this.byteLength));
      $filereader$$.readAsArrayBuffer($slice$$);
    } else {
      this.file = void 0, this.onload && this.onload({buffer:this.buffer});
    }
  };
  $SyncFileBuffer$$.prototype.get = $SyncBuffer$$.prototype.get;
  $SyncFileBuffer$$.prototype.set = $SyncBuffer$$.prototype.set;
  $SyncFileBuffer$$.prototype.get_buffer = $SyncBuffer$$.prototype.get_buffer;
  $SyncFileBuffer$$.prototype.get_state = $SyncBuffer$$.prototype.get_state;
  $SyncFileBuffer$$.prototype.set_state = $SyncBuffer$$.prototype.set_state;
  $AsyncFileBuffer$$.prototype.load = function() {
    this.onload && this.onload(Object.create(null));
  };
  $AsyncFileBuffer$$.prototype.get = function($offset$$, $len$$, $fn$$) {
    dbg_assert(0 === $offset$$ % 256);
    dbg_assert(0 === $len$$ % 256);
    dbg_assert($len$$);
    var $block$$ = this.get_from_cache($offset$$, $len$$);
    $block$$ ? $fn$$($block$$) : ($block$$ = new FileReader, $block$$.onload = function($block$jscomp$12_e$$) {
      $block$jscomp$12_e$$ = new Uint8Array($block$jscomp$12_e$$.target.result);
      this.handle_read($offset$$, $len$$, $block$jscomp$12_e$$);
      $fn$$($block$jscomp$12_e$$);
    }.bind(this), $block$$.readAsArrayBuffer(this.file.slice($offset$$, $offset$$ + $len$$)));
  };
  $AsyncFileBuffer$$.prototype.get_from_cache = $AsyncXHRBuffer$$.prototype.get_from_cache;
  $AsyncFileBuffer$$.prototype.set = $AsyncXHRBuffer$$.prototype.set;
  $AsyncFileBuffer$$.prototype.handle_read = $AsyncXHRBuffer$$.prototype.handle_read;
  $AsyncFileBuffer$$.prototype.get_state = $AsyncXHRBuffer$$.prototype.get_state;
  $AsyncFileBuffer$$.prototype.set_state = $AsyncXHRBuffer$$.prototype.set_state;
  $AsyncFileBuffer$$.prototype.get_buffer = function($fn$$) {
    $fn$$();
  };
  $AsyncFileBuffer$$.prototype.get_as_file = function($file$jscomp$2_name$$) {
    for (var $parts$$ = [], $existing_blocks$$ = Array.from(this.block_cache.keys()).sort(function($x$$, $y$$) {
      return $x$$ - $y$$;
    }), $current_offset$$ = 0, $i$$ = 0; $i$$ < $existing_blocks$$.length; $i$$++) {
      var $block_index$jscomp$1_start$$ = $existing_blocks$$[$i$$], $block$$ = this.block_cache.get($block_index$jscomp$1_start$$);
      $block_index$jscomp$1_start$$ *= 256;
      dbg_assert($block_index$jscomp$1_start$$ >= $current_offset$$);
      $block_index$jscomp$1_start$$ !== $current_offset$$ && ($parts$$.push(this.file.slice($current_offset$$, $block_index$jscomp$1_start$$)), $current_offset$$ = $block_index$jscomp$1_start$$);
      $parts$$.push($block$$);
      $current_offset$$ += $block$$.length;
    }
    $current_offset$$ !== this.file.size && $parts$$.push(this.file.slice($current_offset$$));
    $file$jscomp$2_name$$ = new File($parts$$, $file$jscomp$2_name$$);
    dbg_assert($file$jscomp$2_name$$.size === this.file.size);
    return $file$jscomp$2_name$$;
  };
  var $determine_size$$ = "undefined" === typeof XMLHttpRequest ? function($path$$, $cb$$) {
    require("fs").stat($path$$, ($err$$, $stats$$) => {
      $err$$ ? $cb$$($err$$) : $cb$$(null, $stats$$.size);
    });
  } : function($url$$, $cb$$) {
    v86util.load_file($url$$, {done:($buffer$jscomp$25_header$$, $http$$) => {
      $buffer$jscomp$25_header$$ = $http$$.getResponseHeader("Content-Range") || "";
      ($http$$ = $buffer$jscomp$25_header$$.match(/\/(\d+)\s*$/)) ? $cb$$(null, +$http$$[1]) : $cb$$("`Range: bytes=...` header not supported (Got `" + $buffer$jscomp$25_header$$ + "`)");
    }, headers:{Range:"bytes=0-0", }});
  };
})();
var CDROM_SECTOR_SIZE = 2048, HD_SECTOR_SIZE = 512;
function IDEDevice($cpu$$, $master_buffer$$, $slave_buffer$$, $is_cd$$, $nr$$, $bus$$) {
  this.master = new IDEInterface(this, $cpu$$, $master_buffer$$, $is_cd$$, $nr$$, 0, $bus$$);
  this.slave = new IDEInterface(this, $cpu$$, $slave_buffer$$, !1, $nr$$, 1, $bus$$);
  this.current_interface = this.master;
  this.cpu = $cpu$$;
  0 === $nr$$ ? (this.ata_port = 496, this.irq = 14, this.pci_id = 240) : 1 === $nr$$ ? (this.ata_port = 368, this.irq = 15, this.pci_id = 248) : dbg_assert(!1, "IDE device with nr " + $nr$$ + " ignored", LOG_DISK);
  this.ata_port_high = this.ata_port | 516;
  this.master_port = 46080;
  this.pci_space = [134, 128, 16, 112, 5, 0, 160, 2, 0, 128, 1, 1, 0, 0, 0, 0, this.ata_port & 255 | 1, this.ata_port >> 8, 0, 0, this.ata_port_high & 255 | 1, this.ata_port_high >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.master_port & 255 | 1, this.master_port >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 16, 212, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.irq, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
  this.pci_bars = [{size:8, }, {size:4, }, void 0, void 0, {size:16, }, ];
  this.name = "ide" + $nr$$;
  this.device_control = 2;
  $cpu$$.io.register_read(this.ata_port | 7, this, function() {
    dbg_log("lower irq", LOG_DISK);
    this.cpu.device_lower_irq(this.irq);
    return this.read_status();
  });
  $cpu$$.io.register_read(this.ata_port_high | 2, this, this.read_status);
  $cpu$$.io.register_write(this.ata_port_high | 2, this, this.write_control);
  $cpu$$.io.register_read(this.ata_port | 0, this, function() {
    return this.current_interface.read_data(1);
  }, function() {
    return this.current_interface.read_data(2);
  }, function() {
    return this.current_interface.read_data(4);
  });
  $cpu$$.io.register_read(this.ata_port | 1, this, function() {
    dbg_log("Read error: " + h(this.current_interface.error & 255) + " slave=" + (this.current_interface === this.slave), LOG_DISK);
    return this.current_interface.error & 255;
  });
  $cpu$$.io.register_read(this.ata_port | 2, this, function() {
    dbg_log("Read bytecount: " + h(this.current_interface.bytecount & 255), LOG_DISK);
    return this.current_interface.bytecount & 255;
  });
  $cpu$$.io.register_read(this.ata_port | 3, this, function() {
    dbg_log("Read sector: " + h(this.current_interface.sector & 255), LOG_DISK);
    return this.current_interface.sector & 255;
  });
  $cpu$$.io.register_read(this.ata_port | 4, this, function() {
    dbg_log("Read 1F4: " + h(this.current_interface.cylinder_low & 255), LOG_DISK);
    return this.current_interface.cylinder_low & 255;
  });
  $cpu$$.io.register_read(this.ata_port | 5, this, function() {
    dbg_log("Read 1F5: " + h(this.current_interface.cylinder_high & 255), LOG_DISK);
    return this.current_interface.cylinder_high & 255;
  });
  $cpu$$.io.register_read(this.ata_port | 6, this, function() {
    dbg_log("Read 1F6", LOG_DISK);
    return this.current_interface.drive_head & 255;
  });
  $cpu$$.io.register_write(this.ata_port | 0, this, function($data$$) {
    this.current_interface.write_data_port8($data$$);
  }, function($data$$) {
    this.current_interface.write_data_port16($data$$);
  }, function($data$$) {
    this.current_interface.write_data_port32($data$$);
  });
  $cpu$$.io.register_write(this.ata_port | 1, this, function($data$$) {
    dbg_log("1F1/lba_count: " + h($data$$), LOG_DISK);
    this.master.lba_count = (this.master.lba_count << 8 | $data$$) & 65535;
    this.slave.lba_count = (this.slave.lba_count << 8 | $data$$) & 65535;
  });
  $cpu$$.io.register_write(this.ata_port | 2, this, function($data$$) {
    dbg_log("1F2/bytecount: " + h($data$$), LOG_DISK);
    this.master.bytecount = (this.master.bytecount << 8 | $data$$) & 65535;
    this.slave.bytecount = (this.slave.bytecount << 8 | $data$$) & 65535;
  });
  $cpu$$.io.register_write(this.ata_port | 3, this, function($data$$) {
    dbg_log("1F3/sector: " + h($data$$), LOG_DISK);
    this.master.sector = (this.master.sector << 8 | $data$$) & 65535;
    this.slave.sector = (this.slave.sector << 8 | $data$$) & 65535;
  });
  $cpu$$.io.register_write(this.ata_port | 4, this, function($data$$) {
    dbg_log("1F4/sector low: " + h($data$$), LOG_DISK);
    this.master.cylinder_low = (this.master.cylinder_low << 8 | $data$$) & 65535;
    this.slave.cylinder_low = (this.slave.cylinder_low << 8 | $data$$) & 65535;
  });
  $cpu$$.io.register_write(this.ata_port | 5, this, function($data$$) {
    dbg_log("1F5/sector high: " + h($data$$), LOG_DISK);
    this.master.cylinder_high = (this.master.cylinder_high << 8 | $data$$) & 65535;
    this.slave.cylinder_high = (this.slave.cylinder_high << 8 | $data$$) & 65535;
  });
  $cpu$$.io.register_write(this.ata_port | 6, this, function($data$$) {
    var $slave$$ = $data$$ & 16;
    dbg_log("1F6/drive: " + h($data$$, 2), LOG_DISK);
    $slave$$ ? (dbg_log("Slave", LOG_DISK), this.current_interface = this.slave) : this.current_interface = this.master;
    this.master.drive_head = $data$$;
    this.slave.drive_head = $data$$;
    this.master.is_lba = this.slave.is_lba = $data$$ >> 6 & 1;
    this.master.head = this.slave.head = $data$$ & 15;
  });
  this.dma_command = this.dma_status = this.prdt_addr = 0;
  $cpu$$.io.register_write(this.ata_port | 7, this, function($data$$) {
    dbg_log("lower irq", LOG_DISK);
    this.cpu.device_lower_irq(this.irq);
    this.current_interface.ata_command($data$$);
  });
  $cpu$$.io.register_read(this.master_port | 4, this, void 0, void 0, this.dma_read_addr);
  $cpu$$.io.register_write(this.master_port | 4, this, void 0, void 0, this.dma_set_addr);
  $cpu$$.io.register_read(this.master_port, this, this.dma_read_command8, void 0, this.dma_read_command);
  $cpu$$.io.register_write(this.master_port, this, this.dma_write_command8, void 0, this.dma_write_command);
  $cpu$$.io.register_read(this.master_port | 2, this, this.dma_read_status);
  $cpu$$.io.register_write(this.master_port | 2, this, this.dma_write_status);
  $cpu$$.io.register_read(this.master_port | 8, this, function() {
    dbg_log("DMA read 0x8", LOG_DISK);
    return 0;
  });
  $cpu$$.io.register_read(this.master_port | 10, this, function() {
    dbg_log("DMA read 0xA", LOG_DISK);
    return 0;
  });
  $cpu$$.devices.pci.register_device(this);
  DEBUG && Object.seal(this);
}
IDEDevice.prototype.read_status = function() {
  if (this.current_interface.buffer) {
    var $ret$$ = this.current_interface.status;
    dbg_log("ATA read status: " + h($ret$$, 2), LOG_DISK);
    return $ret$$;
  }
  return 0;
};
IDEDevice.prototype.write_control = function($data$$) {
  dbg_log("set device control: " + h($data$$, 2) + " interrupts " + ($data$$ & 2 ? "disabled" : "enabled"), LOG_DISK);
  $data$$ & 4 && (dbg_log("Reset via control port", LOG_DISK), this.cpu.device_lower_irq(this.irq), this.master.device_reset(), this.slave.device_reset());
  this.device_control = $data$$;
};
IDEDevice.prototype.dma_read_addr = function() {
  dbg_log("dma get address: " + h(this.prdt_addr, 8), LOG_DISK);
  return this.prdt_addr;
};
IDEDevice.prototype.dma_set_addr = function($data$$) {
  dbg_log("dma set address: " + h($data$$, 8), LOG_DISK);
  this.prdt_addr = $data$$;
};
IDEDevice.prototype.dma_read_status = function() {
  dbg_log("DMA read status: " + h(this.dma_status), LOG_DISK);
  return this.dma_status;
};
IDEDevice.prototype.dma_write_status = function($value$$) {
  dbg_log("DMA set status: " + h($value$$), LOG_DISK);
  this.dma_status &= ~($value$$ & 6);
};
IDEDevice.prototype.dma_read_command = function() {
  return this.dma_read_command8() | this.dma_read_status() << 16;
};
IDEDevice.prototype.dma_read_command8 = function() {
  dbg_log("DMA read command: " + h(this.dma_command), LOG_DISK);
  return this.dma_command;
};
IDEDevice.prototype.dma_write_command = function($value$$) {
  dbg_log("DMA write command: " + h($value$$), LOG_DISK);
  this.dma_write_command8($value$$ & 255);
  this.dma_write_status($value$$ >> 16 & 255);
};
IDEDevice.prototype.dma_write_command8 = function($value$$) {
  dbg_log("DMA write command8: " + h($value$$), LOG_DISK);
  let $old_command$$ = this.dma_command;
  this.dma_command = $value$$ & 9;
  if (($old_command$$ & 1) !== ($value$$ & 1)) {
    if (0 === ($value$$ & 1)) {
      this.dma_status &= -2;
    } else {
      switch(this.dma_status |= 1, this.current_interface.current_command) {
        case 37:
        case 200:
          this.current_interface.do_ata_read_sectors_dma();
          break;
        case 202:
        case 53:
          this.current_interface.do_ata_write_sectors_dma();
          break;
        case 160:
          this.current_interface.do_atapi_dma();
          break;
        default:
          dbg_log("Spurious dma command write, current command: " + h(this.current_interface.current_command), LOG_DISK), dbg_assert(!1);
      }
    }
  }
};
IDEDevice.prototype.push_irq = function() {
  0 === (this.device_control & 2) && (dbg_log("push irq", LOG_DISK), this.dma_status |= 4, this.cpu.device_raise_irq(this.irq));
};
IDEDevice.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.master;
  $state$$[1] = this.slave;
  $state$$[2] = this.ata_port;
  $state$$[3] = this.irq;
  $state$$[4] = this.pci_id;
  $state$$[5] = this.ata_port_high;
  $state$$[6] = this.master_port;
  $state$$[7] = this.name;
  $state$$[8] = this.device_control;
  $state$$[9] = this.prdt_addr;
  $state$$[10] = this.dma_status;
  $state$$[11] = this.current_interface === this.master;
  $state$$[12] = this.dma_command;
  return $state$$;
};
IDEDevice.prototype.set_state = function($state$$) {
  this.master.set_state($state$$[0]);
  this.slave.set_state($state$$[1]);
  this.ata_port = $state$$[2];
  this.irq = $state$$[3];
  this.pci_id = $state$$[4];
  this.ata_port_high = $state$$[5];
  this.master_port = $state$$[6];
  this.name = $state$$[7];
  this.device_control = $state$$[8];
  this.prdt_addr = $state$$[9];
  this.dma_status = $state$$[10];
  this.current_interface = $state$$[11] ? this.master : this.slave;
  this.dma_command = $state$$[12];
};
function IDEInterface($device$$, $cpu$$, $buffer$$, $is_cd$$, $device_nr$$, $interface_nr$$, $bus$$) {
  this.device = $device$$;
  this.bus = $bus$$;
  this.nr = $device_nr$$;
  this.cpu = $cpu$$;
  this.buffer = $buffer$$;
  this.sector_size = $is_cd$$ ? CDROM_SECTOR_SIZE : HD_SECTOR_SIZE;
  this.is_atapi = $is_cd$$;
  this.cylinder_count = this.sectors_per_track = this.head_count = this.sector_count = 0;
  this.buffer && (this.sector_count = this.buffer.byteLength / this.sector_size, this.sector_count !== (this.sector_count | 0) && (dbg_log("Warning: Disk size not aligned with sector size", LOG_DISK), this.sector_count = Math.ceil(this.sector_count)), $is_cd$$ ? (this.head_count = 1, this.sectors_per_track = 0) : (this.head_count = 16, this.sectors_per_track = 63), this.cylinder_count = this.sector_count / this.head_count / this.sectors_per_track, this.cylinder_count !== (this.cylinder_count | 0) && 
  (dbg_log("Warning: Rounding up cylinder count. Choose different head number", LOG_DISK), this.cylinder_count = Math.floor(this.cylinder_count)), $device$$ = $cpu$$.devices.rtc, $device$$.cmos_write(CMOS_BIOS_DISKTRANSFLAG, $device$$.cmos_read(CMOS_BIOS_DISKTRANSFLAG) | 1 << 4 * this.nr), $device$$.cmos_write(CMOS_DISK_DATA, $device$$.cmos_read(CMOS_DISK_DATA) & 15 | 240), $cpu$$ = CMOS_DISK_DRIVE1_CYL, $device$$.cmos_write($cpu$$ + 0, this.cylinder_count & 255), $device$$.cmos_write($cpu$$ + 1, 
  this.cylinder_count >> 8 & 255), $device$$.cmos_write($cpu$$ + 2, this.head_count & 255), $device$$.cmos_write($cpu$$ + 3, 255), $device$$.cmos_write($cpu$$ + 4, 255), $device$$.cmos_write($cpu$$ + 5, 200), $device$$.cmos_write($cpu$$ + 6, this.cylinder_count & 255), $device$$.cmos_write($cpu$$ + 7, this.cylinder_count >> 8 & 255), $device$$.cmos_write($cpu$$ + 8, this.sectors_per_track & 255));
  this.stats = {sectors_read:0, sectors_written:0, bytes_read:0, bytes_written:0, loading:!1, };
  this.buffer = $buffer$$;
  this.drive_head = this.head = this.cylinder_high = this.cylinder_low = this.lba_count = this.sector = this.bytecount = this.is_lba = 0;
  this.status = 80;
  this.sectors_per_drq = 128;
  this.data_pointer = this.error = 0;
  this.data = new Uint8Array(65536);
  this.data16 = new Uint16Array(this.data.buffer);
  this.data32 = new Int32Array(this.data.buffer);
  this.data_end = this.data_length = 0;
  this.current_atapi_command = this.current_command = -1;
  this.last_io_id = this.write_dest = 0;
  this.in_progress_io_ids = new Set;
  this.cancelled_io_ids = new Set;
  Object.seal(this);
}
IDEInterface.prototype.device_reset = function() {
  this.is_atapi ? (this.status = 0, this.sector = this.error = this.bytecount = 1, this.cylinder_low = 20, this.cylinder_high = 235) : (this.status = 81, this.sector = this.error = this.bytecount = 1, this.cylinder_high = this.cylinder_low = 0);
  this.cancel_io_operations();
};
IDEInterface.prototype.push_irq = function() {
  this.device.push_irq();
};
IDEInterface.prototype.ata_command = function($cmd_last_sector$$) {
  dbg_log("ATA Command: " + h($cmd_last_sector$$) + " slave=" + (this.drive_head >> 4 & 1), LOG_DISK);
  if (this.buffer) {
    switch(this.current_command = $cmd_last_sector$$, this.error = 0, $cmd_last_sector$$) {
      case 8:
        dbg_log("ATA device reset", LOG_DISK);
        this.data_length = this.data_end = this.data_pointer = 0;
        this.device_reset();
        this.push_irq();
        break;
      case 16:
        this.status = 80;
        this.cylinder_low = 0;
        this.push_irq();
        break;
      case 248:
        this.status = 80;
        $cmd_last_sector$$ = this.sector_count - 1;
        this.sector = $cmd_last_sector$$ & 255;
        this.cylinder_low = $cmd_last_sector$$ >> 8 & 255;
        this.cylinder_high = $cmd_last_sector$$ >> 16 & 255;
        this.drive_head = this.drive_head & 240 | $cmd_last_sector$$ >> 24 & 15;
        this.push_irq();
        break;
      case 39:
        this.status = 80;
        $cmd_last_sector$$ = this.sector_count - 1;
        this.sector = $cmd_last_sector$$ & 255;
        this.cylinder_low = $cmd_last_sector$$ >> 8 & 255;
        this.cylinder_high = $cmd_last_sector$$ >> 16 & 255;
        this.sector |= $cmd_last_sector$$ >> 24 << 8 & 65280;
        this.push_irq();
        break;
      case 32:
      case 36:
      case 41:
      case 196:
        this.ata_read_sectors($cmd_last_sector$$);
        break;
      case 48:
      case 52:
      case 57:
      case 197:
        this.ata_write_sectors($cmd_last_sector$$);
        break;
      case 144:
        this.push_irq();
        this.error = 257;
        this.status = 80;
        break;
      case 145:
        this.status = 80;
        this.push_irq();
        break;
      case 160:
        this.is_atapi && (this.status = 88, this.data_allocate(12), this.data_end = 12, this.bytecount = 1, this.push_irq());
        break;
      case 161:
        dbg_log("ATA identify packet device", LOG_DISK);
        this.is_atapi ? (this.create_identify_packet(), this.status = 88, this.cylinder_low = 20, this.cylinder_high = 235) : this.status = 65;
        this.push_irq();
        break;
      case 198:
        dbg_log("Logical sectors per DRQ Block: " + h(this.bytecount & 255), LOG_DISK);
        this.sectors_per_drq = this.bytecount & 255;
        this.status = 80;
        this.push_irq();
        break;
      case 37:
      case 200:
        this.ata_read_sectors_dma($cmd_last_sector$$);
        break;
      case 53:
      case 202:
        this.ata_write_sectors_dma($cmd_last_sector$$);
        break;
      case 64:
        dbg_log("read verify sectors", LOG_DISK);
        this.status = 80;
        this.push_irq();
        break;
      case 218:
        dbg_log("Unimplemented: get media status", LOG_DISK);
        this.status = 65;
        this.error = 4;
        this.push_irq();
        break;
      case 224:
        dbg_log("ATA standby immediate", LOG_DISK);
        this.status = 80;
        this.push_irq();
        break;
      case 225:
        dbg_log("ATA idle immediate", LOG_DISK);
        this.status = 80;
        this.push_irq();
        break;
      case 231:
        dbg_log("ATA flush cache", LOG_DISK);
        this.status = 80;
        this.push_irq();
        break;
      case 236:
        dbg_log("ATA identify device", LOG_DISK);
        if (this.is_atapi) {
          this.status = 65;
          this.error = 4;
          this.push_irq();
          break;
        }
        this.create_identify_packet();
        this.status = 88;
        this.push_irq();
        break;
      case 234:
        dbg_log("flush cache ext", LOG_DISK);
        this.status = 80;
        this.push_irq();
        break;
      case 239:
        dbg_log("set features: " + h(this.bytecount & 255), LOG_DISK);
        this.status = 80;
        this.push_irq();
        break;
      case 222:
        this.status = 80;
        this.push_irq();
        break;
      case 245:
        dbg_log("security freeze lock", LOG_DISK);
        this.status = 80;
        this.push_irq();
        break;
      case 249:
        dbg_log("Unimplemented: set max address", LOG_DISK);
        this.status = 65;
        this.error = 4;
        break;
      default:
        dbg_assert(!1, "New ATA cmd on 1F7: " + h($cmd_last_sector$$), LOG_DISK), this.status = 65, this.error = 4;
    }
  } else {
    dbg_log("abort: No buffer", LOG_DISK), this.error = 4, this.status = 65, this.push_irq();
  }
};
IDEInterface.prototype.atapi_handle = function() {
  dbg_log("ATAPI Command: " + h(this.data[0]) + " slave=" + (this.drive_head >> 4 & 1), LOG_DISK);
  this.data_pointer = 0;
  this.current_atapi_command = this.data[0];
  switch(this.current_atapi_command) {
    case 0:
      dbg_log("test unit ready", LOG_DISK);
      this.data_allocate(0);
      this.data_end = this.data_length;
      this.status = 80;
      break;
    case 3:
      this.data_allocate(this.data[4]);
      this.data_end = this.data_length;
      this.status = 88;
      this.data[0] = 240;
      this.data[2] = 5;
      this.data[7] = 8;
      break;
    case 18:
      var $count$jscomp$41_length$$ = this.data[4];
      this.status = 88;
      dbg_log("inquiry: " + h(this.data[1], 2) + " length=" + $count$jscomp$41_length$$, LOG_DISK);
      this.data.set([5, 128, 1, 49, 31, 0, 0, 0, 83, 79, 78, 89, 32, 32, 32, 32, 67, 68, 45, 82, 79, 77, 32, 67, 68, 85, 45, 49, 48, 48, 48, 32, 49, 46, 49, 97, ]);
      this.data_end = this.data_length = Math.min(36, $count$jscomp$41_length$$);
      break;
    case 26:
      this.data_allocate(this.data[4]);
      this.data_end = this.data_length;
      this.status = 88;
      break;
    case 30:
      this.data_allocate(0);
      this.data_end = this.data_length;
      this.status = 80;
      break;
    case 37:
      $count$jscomp$41_length$$ = this.sector_count - 1;
      this.data_set(new Uint8Array([$count$jscomp$41_length$$ >> 24 & 255, $count$jscomp$41_length$$ >> 16 & 255, $count$jscomp$41_length$$ >> 8 & 255, $count$jscomp$41_length$$ & 255, 0, 0, this.sector_size >> 8 & 255, this.sector_size & 255, ]));
      this.data_end = this.data_length;
      this.status = 88;
      break;
    case 40:
      this.lba_count & 1 ? this.atapi_read_dma(this.data) : this.atapi_read(this.data);
      break;
    case 66:
      $count$jscomp$41_length$$ = this.data[8];
      this.data_allocate(Math.min(8, $count$jscomp$41_length$$));
      this.data_end = this.data_length;
      dbg_log("read q subcode: length=" + $count$jscomp$41_length$$, LOG_DISK);
      this.status = 88;
      break;
    case 67:
      $count$jscomp$41_length$$ = this.data[8] | this.data[7] << 8;
      var $format$$ = this.data[9] >> 6;
      this.data_allocate($count$jscomp$41_length$$);
      this.data_end = this.data_length;
      dbg_log("read toc: " + h($format$$, 2) + " length=" + $count$jscomp$41_length$$ + " " + (this.data[1] & 2) + " " + h(this.data[6]), LOG_DISK);
      0 === $format$$ ? ($count$jscomp$41_length$$ = this.sector_count, this.data.set(new Uint8Array([0, 18, 1, 1, 0, 20, 1, 0, 0, 0, 0, 0, 0, 22, 170, 0, $count$jscomp$41_length$$ >> 24, $count$jscomp$41_length$$ >> 16 & 255, $count$jscomp$41_length$$ >> 8 & 255, $count$jscomp$41_length$$ & 255, ]))) : 1 === $format$$ ? this.data.set(new Uint8Array([0, 10, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, ])) : dbg_assert(!1, "Unimplemented format: " + $format$$);
      this.status = 88;
      break;
    case 70:
      $count$jscomp$41_length$$ = this.data[8] | this.data[7] << 8;
      $count$jscomp$41_length$$ = Math.min($count$jscomp$41_length$$, 32);
      this.data_allocate($count$jscomp$41_length$$);
      this.data_end = this.data_length;
      this.data[0] = $count$jscomp$41_length$$ - 4 >> 24 & 255;
      this.data[1] = $count$jscomp$41_length$$ - 4 >> 16 & 255;
      this.data[2] = $count$jscomp$41_length$$ - 4 >> 8 & 255;
      this.data[3] = $count$jscomp$41_length$$ - 4 & 255;
      this.data[6] = 8;
      this.data[10] = 3;
      this.status = 88;
      break;
    case 81:
      this.data_allocate(0);
      this.data_end = this.data_length;
      this.status = 80;
      break;
    case 82:
      dbg_log("Unimplemented ATAPI command: " + h(this.data[0]), LOG_DISK);
      this.status = 81;
      this.data_length = 0;
      this.error = 80;
      break;
    case 90:
      $count$jscomp$41_length$$ = this.data[8] | this.data[7] << 8;
      $format$$ = this.data[2];
      dbg_log("mode sense: " + h($format$$) + " length=" + $count$jscomp$41_length$$, LOG_DISK);
      42 === $format$$ && this.data_allocate(Math.min(30, $count$jscomp$41_length$$));
      this.data_end = this.data_length;
      this.status = 88;
      break;
    case 189:
      this.data_allocate(this.data[9] | this.data[8] << 8);
      this.data_end = this.data_length;
      this.data[5] = 1;
      this.status = 88;
      break;
    case 74:
      this.status = 81;
      this.data_length = 0;
      this.error = 80;
      dbg_log("Unimplemented ATAPI command: " + h(this.data[0]), LOG_DISK);
      break;
    case 190:
      dbg_log("Unimplemented ATAPI command: " + h(this.data[0]), LOG_DISK);
      this.data_allocate(0);
      this.data_end = this.data_length;
      this.status = 80;
      break;
    default:
      this.status = 81, this.data_length = 0, this.error = 80, dbg_log("Unimplemented ATAPI command: " + h(this.data[0]), LOG_DISK), dbg_assert(!1);
  }
  this.bytecount = this.bytecount & -8 | 2;
  0 === (this.status & 128) && this.push_irq();
  0 === (this.status & 128) && 0 === this.data_length && (this.bytecount |= 1, this.status &= -9);
};
IDEInterface.prototype.do_write = function() {
  this.status = 80;
  dbg_assert(this.data_length <= this.data.length);
  var $data$$ = this.data.subarray(0, this.data_length);
  dbg_assert(0 === this.data_length % 512);
  this.ata_advance(this.current_command, this.data_length / 512);
  this.push_irq();
  this.buffer.set(this.write_dest, $data$$, function() {
  });
  this.report_write(this.data_length);
};
IDEInterface.prototype.atapi_read = function($cmd$jscomp$1_flags$$) {
  var $lba$$ = $cmd$jscomp$1_flags$$[2] << 24 | $cmd$jscomp$1_flags$$[3] << 16 | $cmd$jscomp$1_flags$$[4] << 8 | $cmd$jscomp$1_flags$$[5], $count$$ = $cmd$jscomp$1_flags$$[7] << 8 | $cmd$jscomp$1_flags$$[8];
  $cmd$jscomp$1_flags$$ = $cmd$jscomp$1_flags$$[1];
  var $byte_count$$ = $count$$ * this.sector_size, $start$$ = $lba$$ * this.sector_size;
  dbg_log("CD read lba=" + h($lba$$) + " lbacount=" + h($count$$) + " bytecount=" + h($byte_count$$) + " flags=" + h($cmd$jscomp$1_flags$$), LOG_DISK);
  this.data_length = 0;
  var $req_length$$ = this.cylinder_high << 8 & 65280 | this.cylinder_low & 255;
  dbg_log(h(this.cylinder_high, 2) + " " + h(this.cylinder_low, 2), LOG_DISK);
  this.cylinder_low = this.cylinder_high = 0;
  65535 === $req_length$$ && $req_length$$--;
  $req_length$$ > $byte_count$$ && ($req_length$$ = $byte_count$$);
  $start$$ >= this.buffer.byteLength ? (dbg_assert(!1, "CD read: Outside of disk  end=" + h($start$$ + $byte_count$$) + " size=" + h(this.buffer.byteLength), LOG_DISK), this.status = 255, this.push_irq()) : 0 === $byte_count$$ ? (this.status = 80, this.data_pointer = 0) : ($byte_count$$ = Math.min($byte_count$$, this.buffer.byteLength - $start$$), this.status = 208, this.report_read_start(), this.read_buffer($start$$, $byte_count$$, $data$$ => {
    dbg_log("cd read: data arrived", LOG_DISK);
    this.data_set($data$$);
    this.status = 88;
    this.bytecount = this.bytecount & -8 | 2;
    this.push_irq();
    this.data_end = $req_length$$ &= -4;
    this.data_end > this.data_length && (this.data_end = this.data_length);
    this.cylinder_low = this.data_end & 255;
    this.cylinder_high = this.data_end >> 8 & 255;
    this.report_read_end($byte_count$$);
  }));
};
IDEInterface.prototype.atapi_read_dma = function($cmd$jscomp$2_flags$$) {
  var $lba$$ = $cmd$jscomp$2_flags$$[2] << 24 | $cmd$jscomp$2_flags$$[3] << 16 | $cmd$jscomp$2_flags$$[4] << 8 | $cmd$jscomp$2_flags$$[5], $count$$ = $cmd$jscomp$2_flags$$[7] << 8 | $cmd$jscomp$2_flags$$[8];
  $cmd$jscomp$2_flags$$ = $cmd$jscomp$2_flags$$[1];
  var $byte_count$$ = $count$$ * this.sector_size, $start$$ = $lba$$ * this.sector_size;
  dbg_log("CD read DMA lba=" + h($lba$$) + " lbacount=" + h($count$$) + " bytecount=" + h($byte_count$$) + " flags=" + h($cmd$jscomp$2_flags$$), LOG_DISK);
  $start$$ >= this.buffer.byteLength ? (dbg_assert(!1, "CD read: Outside of disk  end=" + h($start$$ + $byte_count$$) + " size=" + h(this.buffer.byteLength), LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 208, this.report_read_start(), this.read_buffer($start$$, $byte_count$$, $data$$ => {
    dbg_log("atapi_read_dma: Data arrived");
    this.report_read_end($byte_count$$);
    this.status = 88;
    this.bytecount = this.bytecount & -8 | 2;
    this.data_set($data$$);
    this.do_atapi_dma();
  }));
};
IDEInterface.prototype.do_atapi_dma = function() {
  if (0 === (this.device.dma_status & 1)) {
    dbg_log("do_atapi_dma: Status not set", LOG_DISK);
  } else {
    if (0 === (this.status & 8)) {
      dbg_log("do_atapi_dma: DRQ not set", LOG_DISK);
    } else {
      dbg_log("atapi dma transfer len=" + this.data_length, LOG_DISK);
      var $prdt_start$$ = this.device.prdt_addr, $offset$$ = 0, $data$$ = this.data;
      do {
        var $addr$$ = this.cpu.read32s($prdt_start$$), $count$$ = this.cpu.read16($prdt_start$$ + 4), $end$$ = this.cpu.read8($prdt_start$$ + 7) & 128;
        $count$$ || ($count$$ = 65536);
        dbg_log("dma read dest=" + h($addr$$) + " count=" + h($count$$) + " datalen=" + h(this.data_length), LOG_DISK);
        this.cpu.write_blob($data$$.subarray($offset$$, Math.min($offset$$ + $count$$, this.data_length)), $addr$$);
        $offset$$ += $count$$;
        $prdt_start$$ += 8;
        if ($offset$$ >= this.data_length && !$end$$) {
          dbg_log("leave early end=" + +$end$$ + " offset=" + h($offset$$) + " data_length=" + h(this.data_length) + " cmd=" + h(this.current_command), LOG_DISK);
          break;
        }
      } while (!$end$$);
      dbg_log("end offset=" + $offset$$, LOG_DISK);
      this.status = 80;
      this.device.dma_status &= -2;
      this.bytecount = this.bytecount & -8 | 3;
      this.push_irq();
    }
  }
};
IDEInterface.prototype.read_data = function($length$$) {
  if (this.data_pointer < this.data_end) {
    dbg_assert(this.data_pointer + $length$$ - 1 < this.data_end);
    dbg_assert(0 === this.data_pointer % $length$$, h(this.data_pointer) + " " + $length$$);
    var $result$$ = 1 === $length$$ ? this.data[this.data_pointer] : 2 === $length$$ ? this.data16[this.data_pointer >>> 1] : this.data32[this.data_pointer >>> 2];
    this.data_pointer += $length$$;
    0 === (this.data_pointer & (0 === (this.data_end & 4095) ? 4095 : 255)) && dbg_log("Read 1F0: " + h(this.data[this.data_pointer], 2) + " cur=" + h(this.data_pointer) + " cnt=" + h(this.data_length), LOG_DISK);
    this.data_pointer >= this.data_end && this.read_end();
    return $result$$;
  }
  dbg_log("Read 1F0: empty", LOG_DISK);
  this.data_pointer += $length$$;
  return 0;
};
IDEInterface.prototype.read_end = function() {
  dbg_log("read_end cmd=" + h(this.current_command) + " data_pointer=" + h(this.data_pointer) + " end=" + h(this.data_end) + " length=" + h(this.data_length), LOG_DISK);
  if (160 === this.current_command) {
    if (this.data_end === this.data_length) {
      this.status = 80, this.bytecount = this.bytecount & -8 | 3, this.push_irq();
    } else {
      this.status = 88;
      this.bytecount = this.bytecount & -8 | 2;
      this.push_irq();
      var $byte_count$jscomp$2_sector_count$$ = this.cylinder_high << 8 & 65280 | this.cylinder_low & 255;
      this.data_end + $byte_count$jscomp$2_sector_count$$ > this.data_length ? (this.cylinder_low = this.data_length - this.data_end & 255, this.cylinder_high = this.data_length - this.data_end >> 8 & 255, this.data_end = this.data_length) : this.data_end += $byte_count$jscomp$2_sector_count$$;
      dbg_log("data_end=" + h(this.data_end), LOG_DISK);
    }
  } else {
    this.error = 0, this.data_pointer >= this.data_length ? this.status = 80 : (196 === this.current_command || 41 === this.current_command ? ($byte_count$jscomp$2_sector_count$$ = Math.min(this.sectors_per_drq, (this.data_length - this.data_end) / 512), dbg_assert(0 === $byte_count$jscomp$2_sector_count$$ % 1)) : (dbg_assert(32 === this.current_command || 36 === this.current_command), $byte_count$jscomp$2_sector_count$$ = 1), this.ata_advance(this.current_command, $byte_count$jscomp$2_sector_count$$), 
    this.data_end += 512 * $byte_count$jscomp$2_sector_count$$, this.status = 88), this.push_irq();
  }
};
IDEInterface.prototype.write_data_port = function($data$$, $length$$) {
  dbg_assert(0 === this.data_pointer % $length$$);
  this.data_pointer >= this.data_end ? dbg_log("Redundant write to data port: " + h($data$$) + " count=" + h(this.data_end) + " cur=" + h(this.data_pointer), LOG_DISK) : ((0 === (this.data_pointer + $length$$ & (0 === (this.data_end & 4095) ? 4095 : 255)) || 20 > this.data_end) && dbg_log("Data port: " + h($data$$ >>> 0) + " count=" + h(this.data_end) + " cur=" + h(this.data_pointer), LOG_DISK), 1 === $length$$ ? this.data[this.data_pointer++] = $data$$ : 2 === $length$$ ? (this.data16[this.data_pointer >>> 
  1] = $data$$, this.data_pointer += 2) : (this.data32[this.data_pointer >>> 2] = $data$$, this.data_pointer += 4), dbg_assert(this.data_pointer <= this.data_end), this.data_pointer === this.data_end && this.write_end());
};
IDEInterface.prototype.write_data_port8 = function($data$$) {
  this.write_data_port($data$$, 1);
};
IDEInterface.prototype.write_data_port16 = function($data$$) {
  this.write_data_port($data$$, 2);
};
IDEInterface.prototype.write_data_port32 = function($data$$) {
  this.write_data_port($data$$, 4);
};
IDEInterface.prototype.write_end = function() {
  160 === this.current_command ? this.atapi_handle() : (dbg_log("write_end data_pointer=" + h(this.data_pointer) + " data_length=" + h(this.data_length), LOG_DISK), this.data_pointer >= this.data_length ? this.do_write() : (dbg_assert(48 === this.current_command || 52 === this.current_command || 197 === this.current_command, "Unexpected command: " + h(this.current_command)), this.status = 88, this.data_end += 512, this.push_irq()));
};
IDEInterface.prototype.ata_advance = function($cmd$$, $c_sectors$$) {
  dbg_log("Advance sectors=" + $c_sectors$$ + " old_bytecount=" + this.bytecount, LOG_DISK);
  this.bytecount -= $c_sectors$$;
  36 === $cmd$$ || 41 === $cmd$$ || 52 === $cmd$$ || 57 === $cmd$$ || 37 === $cmd$$ || 53 === $cmd$$ ? ($cmd$$ = $c_sectors$$ + this.get_lba48(), this.sector = $cmd$$ & 255 | $cmd$$ >> 16 & 65280, this.cylinder_low = $cmd$$ >> 8 & 255, this.cylinder_high = $cmd$$ >> 16 & 255) : this.is_lba ? ($cmd$$ = $c_sectors$$ + this.get_lba28(), this.sector = $cmd$$ & 255, this.cylinder_low = $cmd$$ >> 8 & 255, this.cylinder_high = $cmd$$ >> 16 & 255, this.head = this.head & -16 | $cmd$$ & 15) : ($cmd$$ = $c_sectors$$ + 
  this.get_chs(), $c_sectors$$ = $cmd$$ / (this.head_count * this.sectors_per_track) | 0, this.cylinder_low = $c_sectors$$ & 255, this.cylinder_high = $c_sectors$$ >> 8 & 255, this.head = ($cmd$$ / this.sectors_per_track | 0) % this.head_count & 15, this.sector = $cmd$$ % this.sectors_per_track + 1 & 255, dbg_assert($cmd$$ === this.get_chs()));
};
IDEInterface.prototype.ata_read_sectors = function($cmd$$) {
  var $is_lba48_lba$$ = 36 === $cmd$$ || 41 === $cmd$$, $count$$ = this.get_count($is_lba48_lba$$);
  $is_lba48_lba$$ = this.get_lba($is_lba48_lba$$);
  var $is_single$$ = 32 === $cmd$$ || 36 === $cmd$$, $byte_count$$ = $count$$ * this.sector_size, $start$$ = $is_lba48_lba$$ * this.sector_size;
  dbg_log("ATA read cmd=" + h($cmd$$) + " mode=" + (this.is_lba ? "lba" : "chs") + " lba=" + h($is_lba48_lba$$) + " lbacount=" + h($count$$) + " bytecount=" + h($byte_count$$), LOG_DISK);
  $start$$ + $byte_count$$ > this.buffer.byteLength ? (dbg_assert(!1, "ATA read: Outside of disk", LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 192, this.report_read_start(), this.read_buffer($start$$, $byte_count$$, $data$$ => {
    dbg_log("ata_read: Data arrived", LOG_DISK);
    this.data_set($data$$);
    this.status = 88;
    this.data_end = $is_single$$ ? 512 : Math.min($byte_count$$, 512 * this.sectors_per_drq);
    this.ata_advance($cmd$$, $is_single$$ ? 1 : Math.min($count$$, this.sectors_per_track));
    this.push_irq();
    this.report_read_end($byte_count$$);
  }));
};
IDEInterface.prototype.ata_read_sectors_dma = function($cmd$jscomp$5_count$$) {
  var $is_lba48$jscomp$1_lba$$ = 37 === $cmd$jscomp$5_count$$;
  $cmd$jscomp$5_count$$ = this.get_count($is_lba48$jscomp$1_lba$$);
  $is_lba48$jscomp$1_lba$$ = this.get_lba($is_lba48$jscomp$1_lba$$);
  var $byte_count$$ = $cmd$jscomp$5_count$$ * this.sector_size, $start$$ = $is_lba48$jscomp$1_lba$$ * this.sector_size;
  dbg_log("ATA DMA read lba=" + h($is_lba48$jscomp$1_lba$$) + " lbacount=" + h($cmd$jscomp$5_count$$) + " bytecount=" + h($byte_count$$), LOG_DISK);
  $start$$ + $byte_count$$ > this.buffer.byteLength ? (dbg_assert(!1, "ATA read: Outside of disk", LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 88, this.device.dma_status |= 1);
};
IDEInterface.prototype.do_ata_read_sectors_dma = function() {
  var $is_lba48$jscomp$2_lba$$ = 37 === this.current_command, $count$$ = this.get_count($is_lba48$jscomp$2_lba$$);
  $is_lba48$jscomp$2_lba$$ = this.get_lba($is_lba48$jscomp$2_lba$$);
  var $byte_count$$ = $count$$ * this.sector_size, $start$$ = $is_lba48$jscomp$2_lba$$ * this.sector_size;
  dbg_assert($is_lba48$jscomp$2_lba$$ < this.buffer.byteLength);
  this.report_read_start();
  var $orig_prdt_start$$ = this.device.prdt_addr;
  this.read_buffer($start$$, $byte_count$$, $data$$ => {
    dbg_log("do_ata_read_sectors_dma: Data arrived", LOG_DISK);
    var $prdt_start$$ = this.device.prdt_addr, $offset$$ = 0;
    dbg_assert($orig_prdt_start$$ === $prdt_start$$);
    do {
      var $prd_addr$$ = this.cpu.read32s($prdt_start$$), $prd_count$$ = this.cpu.read16($prdt_start$$ + 4), $end$$ = this.cpu.read8($prdt_start$$ + 7) & 128;
      $prd_count$$ || ($prd_count$$ = 65536, dbg_log("dma: prd count was 0", LOG_DISK));
      dbg_log("dma read transfer dest=" + h($prd_addr$$) + " prd_count=" + h($prd_count$$), LOG_DISK);
      this.cpu.write_blob($data$$.subarray($offset$$, $offset$$ + $prd_count$$), $prd_addr$$);
      $offset$$ += $prd_count$$;
      $prdt_start$$ += 8;
    } while (!$end$$);
    dbg_assert($offset$$ === $byte_count$$);
    this.ata_advance(this.current_command, $count$$);
    this.status = 80;
    this.device.dma_status &= -2;
    this.current_command = -1;
    this.push_irq();
    this.report_read_end($byte_count$$);
  });
};
IDEInterface.prototype.ata_write_sectors = function($cmd$jscomp$7_is_single$$) {
  var $is_lba48$jscomp$3_lba$$ = 52 === $cmd$jscomp$7_is_single$$ || 57 === $cmd$jscomp$7_is_single$$, $count$$ = this.get_count($is_lba48$jscomp$3_lba$$);
  $is_lba48$jscomp$3_lba$$ = this.get_lba($is_lba48$jscomp$3_lba$$);
  $cmd$jscomp$7_is_single$$ = 48 === $cmd$jscomp$7_is_single$$ || 52 === $cmd$jscomp$7_is_single$$;
  var $byte_count$$ = $count$$ * this.sector_size, $start$$ = $is_lba48$jscomp$3_lba$$ * this.sector_size;
  dbg_log("ATA write lba=" + h($is_lba48$jscomp$3_lba$$) + " mode=" + (this.is_lba ? "lba" : "chs") + " lbacount=" + h($count$$) + " bytecount=" + h($byte_count$$), LOG_DISK);
  $start$$ + $byte_count$$ > this.buffer.byteLength ? (dbg_assert(!1, "ATA write: Outside of disk", LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 88, this.data_allocate_noclear($byte_count$$), this.data_end = $cmd$jscomp$7_is_single$$ ? 512 : Math.min($byte_count$$, 512 * this.sectors_per_drq), this.write_dest = $start$$);
};
IDEInterface.prototype.ata_write_sectors_dma = function($cmd$jscomp$8_count$$) {
  var $is_lba48$jscomp$4_lba$$ = 53 === $cmd$jscomp$8_count$$;
  $cmd$jscomp$8_count$$ = this.get_count($is_lba48$jscomp$4_lba$$);
  $is_lba48$jscomp$4_lba$$ = this.get_lba($is_lba48$jscomp$4_lba$$);
  var $byte_count$$ = $cmd$jscomp$8_count$$ * this.sector_size, $start$$ = $is_lba48$jscomp$4_lba$$ * this.sector_size;
  dbg_log("ATA DMA write lba=" + h($is_lba48$jscomp$4_lba$$) + " lbacount=" + h($cmd$jscomp$8_count$$) + " bytecount=" + h($byte_count$$), LOG_DISK);
  $start$$ + $byte_count$$ > this.buffer.byteLength ? (dbg_assert(!1, "ATA DMA write: Outside of disk", LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 88, this.device.dma_status |= 1);
};
IDEInterface.prototype.do_ata_write_sectors_dma = function() {
  var $byte_count$jscomp$8_is_lba48$$ = 53 === this.current_command, $count$$ = this.get_count($byte_count$jscomp$8_is_lba48$$), $lba$jscomp$7_start$$ = this.get_lba($byte_count$jscomp$8_is_lba48$$);
  $byte_count$jscomp$8_is_lba48$$ = $count$$ * this.sector_size;
  $lba$jscomp$7_start$$ *= this.sector_size;
  var $prdt_start$$ = this.device.prdt_addr, $offset$$ = 0;
  dbg_log("prdt addr: " + h($prdt_start$$, 8), LOG_DISK);
  const $buffer$$ = new Uint8Array($byte_count$jscomp$8_is_lba48$$);
  do {
    var $prd_addr$jscomp$1_slice$$ = this.cpu.read32s($prdt_start$$), $prd_count$$ = this.cpu.read16($prdt_start$$ + 4), $end$$ = this.cpu.read8($prdt_start$$ + 7) & 128;
    $prd_count$$ || ($prd_count$$ = 65536, dbg_log("dma: prd count was 0", LOG_DISK));
    dbg_log("dma write transfer dest=" + h($prd_addr$jscomp$1_slice$$) + " prd_count=" + h($prd_count$$), LOG_DISK);
    $prd_addr$jscomp$1_slice$$ = this.cpu.mem8.subarray($prd_addr$jscomp$1_slice$$, $prd_addr$jscomp$1_slice$$ + $prd_count$$);
    dbg_assert($prd_addr$jscomp$1_slice$$.length === $prd_count$$);
    $buffer$$.set($prd_addr$jscomp$1_slice$$, $offset$$);
    $offset$$ += $prd_count$$;
    $prdt_start$$ += 8;
  } while (!$end$$);
  dbg_assert($offset$$ === $buffer$$.length);
  this.buffer.set($lba$jscomp$7_start$$, $buffer$$, () => {
    dbg_log("dma write completed", LOG_DISK);
    this.ata_advance(this.current_command, $count$$);
    this.status = 80;
    this.push_irq();
    this.device.dma_status &= -2;
    this.current_command = -1;
  });
  this.report_write($byte_count$jscomp$8_is_lba48$$);
};
IDEInterface.prototype.get_chs = function() {
  var $c$$ = this.cylinder_low & 255 | this.cylinder_high << 8 & 65280, $h$$ = this.head, $s$$ = this.sector & 255;
  dbg_log("get_chs: c=" + $c$$ + " h=" + $h$$ + " s=" + $s$$, LOG_DISK);
  return ($c$$ * this.head_count + $h$$) * this.sectors_per_track + $s$$ - 1;
};
IDEInterface.prototype.get_lba28 = function() {
  return this.sector & 255 | this.cylinder_low << 8 & 65280 | this.cylinder_high << 16 & 16711680 | (this.head & 15) << 24;
};
IDEInterface.prototype.get_lba48 = function() {
  return (this.sector & 255 | this.cylinder_low << 8 & 65280 | this.cylinder_high << 16 & 16711680 | this.sector >> 8 << 24 & 4278190080) >>> 0;
};
IDEInterface.prototype.get_lba = function($is_lba48$$) {
  return $is_lba48$$ ? this.get_lba48() : this.is_lba ? this.get_lba28() : this.get_chs();
};
IDEInterface.prototype.get_count = function($count$jscomp$51_is_lba48$$) {
  $count$jscomp$51_is_lba48$$ ? ($count$jscomp$51_is_lba48$$ = this.bytecount, 0 === $count$jscomp$51_is_lba48$$ && ($count$jscomp$51_is_lba48$$ = 65536)) : ($count$jscomp$51_is_lba48$$ = this.bytecount & 255, 0 === $count$jscomp$51_is_lba48$$ && ($count$jscomp$51_is_lba48$$ = 256));
  return $count$jscomp$51_is_lba48$$;
};
IDEInterface.prototype.create_identify_packet = function() {
  if (this.drive_head & 16) {
    this.data_allocate(0);
  } else {
    for (var $cylinder_count_i$$ = 0; 512 > $cylinder_count_i$$; $cylinder_count_i$$++) {
      this.data[$cylinder_count_i$$] = 0;
    }
    $cylinder_count_i$$ = Math.min(16383, this.cylinder_count);
    this.data_set([64, this.is_atapi ? 133 : 0, $cylinder_count_i$$, $cylinder_count_i$$ >> 8, 0, 0, this.head_count, this.head_count >> 8, this.sectors_per_track / 512, this.sectors_per_track / 512 >> 8, 0, 2, this.sectors_per_track, this.sectors_per_track >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 118, 32, 54, 68, 72, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 
    32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 128, 0, 1, 0, 0, 2, 0, 0, 0, 2, 0, 2, 7, 0, $cylinder_count_i$$, $cylinder_count_i$$ >> 8, this.head_count, this.head_count >> 8, this.sectors_per_track, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255, 0, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255, 0, 0, 160 === this.current_command ? 0 : 7, 160 === this.current_command ? 
    0 : 4, 0, 0, 30, 0, 30, 0, 30, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 0, 0, 0, 0, 0, 0, 116, 0, 64, 0, 64, 0, 116, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255, ]);
    this.data_end = this.data_length = 512;
  }
};
IDEInterface.prototype.data_allocate = function($len$$) {
  this.data_allocate_noclear($len$$);
  for (var $i$$ = 0; $i$$ < $len$$ + 3 >> 2; $i$$++) {
    this.data32[$i$$] = 0;
  }
};
IDEInterface.prototype.data_allocate_noclear = function($len$$) {
  this.data.length < $len$$ && (this.data = new Uint8Array($len$$ + 3 & -4), this.data16 = new Uint16Array(this.data.buffer), this.data32 = new Int32Array(this.data.buffer));
  this.data_length = $len$$;
  this.data_pointer = 0;
};
IDEInterface.prototype.data_set = function($data$$) {
  this.data_allocate_noclear($data$$.length);
  this.data.set($data$$);
};
IDEInterface.prototype.report_read_start = function() {
  this.stats.loading = !0;
  this.bus.send("ide-read-start");
};
IDEInterface.prototype.report_read_end = function($byte_count$$) {
  this.stats.loading = !1;
  var $sector_count$$ = $byte_count$$ / this.sector_size | 0;
  this.stats.sectors_read += $sector_count$$;
  this.stats.bytes_read += $byte_count$$;
  this.bus.send("ide-read-end", [this.nr, $byte_count$$, $sector_count$$]);
};
IDEInterface.prototype.report_write = function($byte_count$$) {
  var $sector_count$$ = $byte_count$$ / this.sector_size | 0;
  this.stats.sectors_written += $sector_count$$;
  this.stats.bytes_written += $byte_count$$;
  this.bus.send("ide-write-end", [this.nr, $byte_count$$, $sector_count$$]);
};
IDEInterface.prototype.read_buffer = function($start$$, $length$$, $callback$$) {
  const $id$$ = this.last_io_id++;
  this.in_progress_io_ids.add($id$$);
  this.buffer.get($start$$, $length$$, $data$$ => {
    if (this.cancelled_io_ids.delete($id$$)) {
      dbg_assert(!this.in_progress_io_ids.has($id$$));
    } else {
      var $removed$$ = this.in_progress_io_ids.delete($id$$);
      dbg_assert($removed$$);
      $callback$$($data$$);
    }
  });
};
IDEInterface.prototype.cancel_io_operations = function() {
  for (const $id$$ of this.in_progress_io_ids) {
    this.cancelled_io_ids.add($id$$);
  }
  this.in_progress_io_ids.clear();
};
IDEInterface.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.bytecount;
  $state$$[1] = this.cylinder_count;
  $state$$[2] = this.cylinder_high;
  $state$$[3] = this.cylinder_low;
  $state$$[4] = this.data_pointer;
  $state$$[5] = 0;
  $state$$[6] = 0;
  $state$$[7] = 0;
  $state$$[8] = 0;
  $state$$[9] = this.drive_head;
  $state$$[10] = this.error;
  $state$$[11] = this.head;
  $state$$[12] = this.head_count;
  $state$$[13] = this.is_atapi;
  $state$$[14] = this.is_lba;
  $state$$[15] = this.lba_count;
  $state$$[16] = this.data;
  $state$$[17] = this.data_length;
  $state$$[18] = this.sector;
  $state$$[19] = this.sector_count;
  $state$$[20] = this.sector_size;
  $state$$[21] = this.sectors_per_drq;
  $state$$[22] = this.sectors_per_track;
  $state$$[23] = this.status;
  $state$$[24] = this.write_dest;
  $state$$[25] = this.current_command;
  $state$$[26] = this.data_end;
  $state$$[27] = this.current_atapi_command;
  $state$$[28] = this.buffer;
  return $state$$;
};
IDEInterface.prototype.set_state = function($state$$) {
  this.bytecount = $state$$[0];
  this.cylinder_count = $state$$[1];
  this.cylinder_high = $state$$[2];
  this.cylinder_low = $state$$[3];
  this.data_pointer = $state$$[4];
  this.drive_head = $state$$[9];
  this.error = $state$$[10];
  this.head = $state$$[11];
  this.head_count = $state$$[12];
  this.is_atapi = $state$$[13];
  this.is_lba = $state$$[14];
  this.lba_count = $state$$[15];
  this.data = $state$$[16];
  this.data_length = $state$$[17];
  this.sector = $state$$[18];
  this.sector_count = $state$$[19];
  this.sector_size = $state$$[20];
  this.sectors_per_drq = $state$$[21];
  this.sectors_per_track = $state$$[22];
  this.status = $state$$[23];
  this.write_dest = $state$$[24];
  this.current_command = $state$$[25];
  this.data_end = $state$$[26];
  this.current_atapi_command = $state$$[27];
  this.data16 = new Uint16Array(this.data.buffer);
  this.data32 = new Int32Array(this.data.buffer);
  this.buffer && this.buffer.set_state($state$$[28]);
};
var PCI_CONFIG_ADDRESS = 3320, PCI_CONFIG_DATA = 3324;
function PCI($cpu$$) {
  this.pci_addr = new Uint8Array(4);
  this.pci_value = new Uint8Array(4);
  this.pci_response = new Uint8Array(4);
  this.pci_status = new Uint8Array(4);
  this.pci_addr32 = new Int32Array(this.pci_addr.buffer);
  this.pci_value32 = new Int32Array(this.pci_value.buffer);
  this.pci_response32 = new Int32Array(this.pci_response.buffer);
  this.pci_status32 = new Int32Array(this.pci_status.buffer);
  this.device_spaces = [];
  this.devices = [];
  this.cpu = $cpu$$;
  for (var $i$$ = 0; 256 > $i$$; $i$$++) {
    this.device_spaces[$i$$] = void 0, this.devices[$i$$] = void 0;
  }
  this.io = $cpu$$.io;
  $cpu$$.io.register_write(PCI_CONFIG_DATA, this, function($value$$) {
    this.pci_write8(this.pci_addr32[0], $value$$);
  }, function($value$$) {
    this.pci_write16(this.pci_addr32[0], $value$$);
  }, function($value$$) {
    this.pci_write32(this.pci_addr32[0], $value$$);
  });
  $cpu$$.io.register_write(PCI_CONFIG_DATA + 1, this, function($value$$) {
    this.pci_write8(this.pci_addr32[0] + 1 | 0, $value$$);
  });
  $cpu$$.io.register_write(PCI_CONFIG_DATA + 2, this, function($value$$) {
    this.pci_write8(this.pci_addr32[0] + 2 | 0, $value$$);
  }, function($value$$) {
    this.pci_write16(this.pci_addr32[0] + 2 | 0, $value$$);
  });
  $cpu$$.io.register_write(PCI_CONFIG_DATA + 3, this, function($value$$) {
    this.pci_write8(this.pci_addr32[0] + 3 | 0, $value$$);
  });
  $cpu$$.io.register_read_consecutive(PCI_CONFIG_DATA, this, function() {
    return this.pci_response[0];
  }, function() {
    return this.pci_response[1];
  }, function() {
    return this.pci_response[2];
  }, function() {
    return this.pci_response[3];
  });
  $cpu$$.io.register_read_consecutive(PCI_CONFIG_ADDRESS, this, function() {
    return this.pci_status[0];
  }, function() {
    return this.pci_status[1];
  }, function() {
    return this.pci_status[2];
  }, function() {
    return this.pci_status[3];
  });
  $cpu$$.io.register_write_consecutive(PCI_CONFIG_ADDRESS, this, function($out_byte$$) {
    this.pci_addr[0] = $out_byte$$ & 252;
  }, function($out_byte$$) {
    2 === (this.pci_addr[1] & 6) && 6 === ($out_byte$$ & 6) ? (dbg_log("CPU reboot via PCI"), $cpu$$.reboot_internal()) : this.pci_addr[1] = $out_byte$$;
  }, function($out_byte$$) {
    this.pci_addr[2] = $out_byte$$;
  }, function($out_byte$$) {
    this.pci_addr[3] = $out_byte$$;
    this.pci_query();
  });
  this.register_device({pci_id:0, pci_space:[134, 128, 55, 18, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, ], pci_bars:[], name:"82441FX PMC", });
  this.isa_bridge = {pci_id:8, pci_space:[134, 128, 0, 112, 7, 0, 0, 2, 0, 0, 1, 6, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ], pci_bars:[], name:"82371SB PIIX3 ISA", };
  this.isa_bridge_space = this.register_device(this.isa_bridge);
  this.isa_bridge_space8 = new Uint8Array(this.isa_bridge_space.buffer);
}
PCI.prototype.get_state = function() {
  for (var $state$$ = [], $i$$ = 0; 256 > $i$$; $i$$++) {
    $state$$[$i$$] = this.device_spaces[$i$$];
  }
  $state$$[256] = this.pci_addr;
  $state$$[257] = this.pci_value;
  $state$$[258] = this.pci_response;
  $state$$[259] = this.pci_status;
  return $state$$;
};
PCI.prototype.set_state = function($state$$) {
  for (var $i$$ = 0; 256 > $i$$; $i$$++) {
    var $device$$ = this.devices[$i$$], $space$$ = $state$$[$i$$];
    if ($device$$ && $space$$) {
      for (var $bar_nr$$ = 0; $bar_nr$$ < $device$$.pci_bars.length; $bar_nr$$++) {
        var $value$$ = $space$$[4 + $bar_nr$$];
        if ($value$$ & 1) {
          var $bar$$ = $device$$.pci_bars[$bar_nr$$];
          this.set_io_bars($bar$$, $bar$$.original_bar & 65534, $value$$ & 65534);
        }
      }
      this.device_spaces[$i$$].set($space$$);
    } else {
      $device$$ && dbg_log("Warning: While restoring PCI device: Device exists in current configuration but not in snapshot (" + $device$$.name + ")"), $space$$ && dbg_log("Warning: While restoring PCI device: Device doesn't exist in current configuration but does in snapshot (device " + h($i$$, 2) + ")");
    }
  }
  this.pci_addr.set($state$$[256]);
  this.pci_value.set($state$$[257]);
  this.pci_response.set($state$$[258]);
  this.pci_status.set($state$$[259]);
};
PCI.prototype.pci_query = function() {
  var $bdf$$ = this.pci_addr[2] << 8 | this.pci_addr[1], $addr$$ = this.pci_addr[0] & 252, $dev_device$$ = $bdf$$ >> 3 & 31;
  var $dbg_line$$ = "query enabled=" + (this.pci_addr[3] >> 7) + (" bdf=" + h($bdf$$, 4));
  $dbg_line$$ += " dev=" + h($dev_device$$, 2);
  $dbg_line$$ += " addr=" + h($addr$$, 2);
  $dev_device$$ = this.device_spaces[$bdf$$];
  void 0 !== $dev_device$$ ? (this.pci_status32[0] = -2147483648, this.pci_response32[0] = $addr$$ < $dev_device$$.byteLength ? $dev_device$$[$addr$$ >> 2] : 0, $dbg_line$$ += " " + h(this.pci_addr32[0] >>> 0, 8) + " -> " + h(this.pci_response32[0] >>> 0, 8), $addr$$ >= $dev_device$$.byteLength && ($dbg_line$$ += " (undef)"), $dbg_line$$ += " (" + this.devices[$bdf$$].name + ")", dbg_log($dbg_line$$, LOG_PCI)) : (this.pci_response32[0] = -1, this.pci_status32[0] = 0);
};
PCI.prototype.pci_write8 = function($addr$$, $written$$) {
  var $bdf$$ = $addr$$ >> 8 & 65535;
  $addr$$ &= 255;
  var $space$$ = new Uint8Array(this.device_spaces[$bdf$$].buffer), $device$$ = this.devices[$bdf$$];
  $space$$ && (dbg_assert(!(16 <= $addr$$ && 44 > $addr$$ || 48 <= $addr$$ && 52 > $addr$$), "PCI: Expected 32-bit write, got 8-bit (addr: " + h($addr$$) + ")"), dbg_log("PCI write8 dev=" + h($bdf$$ >> 3, 2) + " (" + $device$$.name + ") addr=" + h($addr$$, 4) + " value=" + h($written$$, 2), LOG_PCI), $space$$[$addr$$] = $written$$);
};
PCI.prototype.pci_write16 = function($addr$jscomp$11_address$$, $written$$) {
  dbg_assert(0 === ($addr$jscomp$11_address$$ & 1));
  var $bdf$$ = $addr$jscomp$11_address$$ >> 8 & 65535;
  $addr$jscomp$11_address$$ &= 255;
  var $space$$ = new Uint16Array(this.device_spaces[$bdf$$].buffer), $device$$ = this.devices[$bdf$$];
  $space$$ && (16 <= $addr$jscomp$11_address$$ && 44 > $addr$jscomp$11_address$$ ? dbg_log("Warning: PCI: Expected 32-bit write, got 16-bit (addr: " + h($addr$jscomp$11_address$$) + ")") : (dbg_assert(!(48 <= $addr$jscomp$11_address$$ && 52 > $addr$jscomp$11_address$$), "PCI: Expected 32-bit write, got 16-bit (addr: " + h($addr$jscomp$11_address$$) + ")"), dbg_log("PCI writ16 dev=" + h($bdf$$ >> 3, 2) + " (" + $device$$.name + ") addr=" + h($addr$jscomp$11_address$$, 4) + " value=" + h($written$$, 
  4), LOG_PCI), $space$$[$addr$jscomp$11_address$$ >>> 1] = $written$$));
};
PCI.prototype.pci_write32 = function($addr$jscomp$12_address$$, $written$$) {
  dbg_assert(0 === ($addr$jscomp$12_address$$ & 3));
  var $bdf$$ = $addr$jscomp$12_address$$ >> 8 & 65535;
  $addr$jscomp$12_address$$ &= 255;
  var $space$$ = this.device_spaces[$bdf$$], $device$jscomp$9_from$jscomp$1_type$$ = this.devices[$bdf$$];
  if ($space$$) {
    if (16 <= $addr$jscomp$12_address$$ && 40 > $addr$jscomp$12_address$$) {
      var $bar_nr$jscomp$1_original_bar_to$$ = $addr$jscomp$12_address$$ - 16 >> 2, $bar$$ = $device$jscomp$9_from$jscomp$1_type$$.pci_bars[$bar_nr$jscomp$1_original_bar_to$$];
      dbg_log("BAR" + $bar_nr$jscomp$1_original_bar_to$$ + " exists=" + ($bar$$ ? "y" : "n") + " changed to " + h($written$$ >>> 0) + " dev=" + h($bdf$$ >> 3, 2) + " (" + $device$jscomp$9_from$jscomp$1_type$$.name + ") ", LOG_PCI);
      $bar$$ ? (dbg_assert(!($bar$$.size & $bar$$.size - 1), "bar size should be power of 2"), $bdf$$ = $addr$jscomp$12_address$$ >> 2, $device$jscomp$9_from$jscomp$1_type$$ = $space$$[$bdf$$] & 1, -1 === ($written$$ | 3 | $bar$$.size - 1) ? ($written$$ = ~($bar$$.size - 1) | $device$jscomp$9_from$jscomp$1_type$$, 0 === $device$jscomp$9_from$jscomp$1_type$$ && ($space$$[$bdf$$] = $written$$)) : 0 === $device$jscomp$9_from$jscomp$1_type$$ && ($bar_nr$jscomp$1_original_bar_to$$ = $bar$$.original_bar, 
      ($written$$ & -16) !== ($bar_nr$jscomp$1_original_bar_to$$ & -16) && dbg_log("Warning: Changing memory bar not supported, ignored", LOG_PCI), $space$$[$bdf$$] = $bar_nr$jscomp$1_original_bar_to$$), 1 === $device$jscomp$9_from$jscomp$1_type$$ && (dbg_assert(1 === $device$jscomp$9_from$jscomp$1_type$$), $device$jscomp$9_from$jscomp$1_type$$ = $space$$[$bdf$$] & 65534, $bar_nr$jscomp$1_original_bar_to$$ = $written$$ & 65534, dbg_log("io bar changed from " + h($device$jscomp$9_from$jscomp$1_type$$ >>> 
      0, 8) + " to " + h($bar_nr$jscomp$1_original_bar_to$$ >>> 0, 8) + " size=" + $bar$$.size, LOG_PCI), this.set_io_bars($bar$$, $device$jscomp$9_from$jscomp$1_type$$, $bar_nr$jscomp$1_original_bar_to$$), $space$$[$bdf$$] = $written$$ | 1)) : $space$$[$addr$jscomp$12_address$$ >> 2] = 0;
      dbg_log("BAR effective value: " + h($space$$[$addr$jscomp$12_address$$ >> 2] >>> 0), LOG_PCI);
    } else {
      48 === $addr$jscomp$12_address$$ ? (dbg_log("PCI write rom address dev=" + h($bdf$$ >> 3, 2) + " (" + $device$jscomp$9_from$jscomp$1_type$$.name + ") value=" + h($written$$ >>> 0, 8), LOG_PCI), $space$$[$addr$jscomp$12_address$$ >> 2] = $device$jscomp$9_from$jscomp$1_type$$.pci_rom_size ? -1 === ($written$$ | 2047) ? -$device$jscomp$9_from$jscomp$1_type$$.pci_rom_size | 0 : $device$jscomp$9_from$jscomp$1_type$$.pci_rom_address | 0 : 0) : 4 === $addr$jscomp$12_address$$ ? dbg_log("PCI write dev=" + 
      h($bdf$$ >> 3, 2) + " (" + $device$jscomp$9_from$jscomp$1_type$$.name + ") addr=" + h($addr$jscomp$12_address$$, 4) + " value=" + h($written$$ >>> 0, 8), LOG_PCI) : (dbg_log("PCI write dev=" + h($bdf$$ >> 3, 2) + " (" + $device$jscomp$9_from$jscomp$1_type$$.name + ") addr=" + h($addr$jscomp$12_address$$, 4) + " value=" + h($written$$ >>> 0, 8), LOG_PCI), $space$$[$addr$jscomp$12_address$$ >>> 2] = $written$$);
    }
  }
};
PCI.prototype.register_device = function($device$$) {
  dbg_assert(void 0 !== $device$$.pci_id);
  dbg_assert(void 0 !== $device$$.pci_space);
  dbg_assert(void 0 !== $device$$.pci_bars);
  var $bar_space_device_id$$ = $device$$.pci_id;
  dbg_log("PCI register bdf=" + h($bar_space_device_id$$) + " (" + $device$$.name + ")", LOG_PCI);
  dbg_assert(!this.devices[$bar_space_device_id$$]);
  dbg_assert(64 <= $device$$.pci_space.length);
  dbg_assert($bar_space_device_id$$ < this.devices.length);
  var $space$$ = new Int32Array(64);
  $space$$.set(new Int32Array((new Uint8Array($device$$.pci_space)).buffer));
  this.device_spaces[$bar_space_device_id$$] = $space$$;
  this.devices[$bar_space_device_id$$] = $device$$;
  $bar_space_device_id$$ = $space$$.slice(4, 10);
  for (var $i$$ = 0; $i$$ < $device$$.pci_bars.length; $i$$++) {
    var $bar$$ = $device$$.pci_bars[$i$$];
    if ($bar$$) {
      var $bar_base_port$$ = $bar_space_device_id$$[$i$$], $j$jscomp$3_type$$ = $bar_base_port$$ & 1;
      $bar$$.original_bar = $bar_base_port$$;
      $bar$$.entries = [];
      if (0 !== $j$jscomp$3_type$$) {
        for (dbg_assert(1 === $j$jscomp$3_type$$), $bar_base_port$$ &= -2, $j$jscomp$3_type$$ = 0; $j$jscomp$3_type$$ < $bar$$.size; $j$jscomp$3_type$$++) {
          $bar$$.entries[$j$jscomp$3_type$$] = this.io.ports[$bar_base_port$$ + $j$jscomp$3_type$$];
        }
      }
    }
  }
  return $space$$;
};
PCI.prototype.set_io_bars = function($bar$$, $from$$, $to$$) {
  var $count$$ = $bar$$.size;
  dbg_log("Move io bars: from=" + h($from$$) + " to=" + h($to$$) + " count=" + $count$$, LOG_PCI);
  for (var $ports$$ = this.io.ports, $i$$ = 0; $i$$ < $count$$; $i$$++) {
    var $entry$$ = $ports$$[$from$$ + $i$$];
    4096 <= $from$$ + $i$$ && ($ports$$[$from$$ + $i$$] = this.io.create_empty_entry());
    $entry$$.read8 === this.io.empty_port_read8 && $entry$$.read16 === this.io.empty_port_read16 && $entry$$.read32 === this.io.empty_port_read32 && $entry$$.write8 === this.io.empty_port_write && $entry$$.write16 === this.io.empty_port_write && $entry$$.write32 === this.io.empty_port_write && dbg_log("Warning: Bad IO bar: Source not mapped, port=" + h($from$$ + $i$$, 4), LOG_PCI);
    $entry$$ = $bar$$.entries[$i$$];
    var $empty_entry$$ = $ports$$[$to$$ + $i$$];
    dbg_assert($entry$$ && $empty_entry$$);
    4096 <= $to$$ + $i$$ && ($ports$$[$to$$ + $i$$] = $entry$$);
    $empty_entry$$.read8 !== this.io.empty_port_read8 && $empty_entry$$.read16 !== this.io.empty_port_read16 && $empty_entry$$.read32 !== this.io.empty_port_read32 && $empty_entry$$.write8 !== this.io.empty_port_write && $empty_entry$$.write16 !== this.io.empty_port_write && $empty_entry$$.write32 !== this.io.empty_port_write || dbg_log("Warning: Bad IO bar: Target already mapped, port=" + h($to$$ + $i$$, 4), LOG_PCI);
  }
};
PCI.prototype.raise_irq = function($pci_id$$) {
  var $space$$ = this.device_spaces[$pci_id$$];
  dbg_assert($space$$);
  this.cpu.device_raise_irq(this.isa_bridge_space8[96 + (($space$$[15] >> 8 & 255) - 1 + (($pci_id$$ >> 3) - 1 & 255) & 3)]);
};
PCI.prototype.lower_irq = function($pci_id$$) {
  var $space$$ = this.device_spaces[$pci_id$$];
  dbg_assert($space$$);
  this.cpu.device_lower_irq(this.isa_bridge_space8[96 + (($space$$[15] >> 8 & 255) + ($pci_id$$ >> 3 & 255) - 2 & 3)]);
};
function FloppyController($cpu$$, $fda_image_number_of_heads$$, $fdb_image_floppy_type_number_of_cylinders$$) {
  this.io = $cpu$$.io;
  this.cpu = $cpu$$;
  this.dma = $cpu$$.devices.dma;
  this.bytes_expecting = 0;
  this.receiving_command = new Uint8Array(10);
  this.receiving_index = 0;
  this.next_command = null;
  this.response_data = new Uint8Array(10);
  this.response_length = this.response_index = 0;
  this.fda_image = $fda_image_number_of_heads$$;
  this.fdb_image = $fdb_image_floppy_type_number_of_cylinders$$;
  this.last_head = this.last_cylinder = this.drive = this.status_reg2 = this.status_reg1 = this.status_reg0 = 0;
  this.last_sector = 1;
  this.dor = 0;
  if ($fda_image_number_of_heads$$) {
    var $floppy_types$$ = {[163840]:{type:1, tracks:40, sectors:8, heads:1}, [184320]:{type:1, tracks:40, sectors:9, heads:1}, [204800]:{type:1, tracks:40, sectors:10, heads:1}, [327680]:{type:1, tracks:40, sectors:8, heads:2}, [368640]:{type:1, tracks:40, sectors:9, heads:2}, [409600]:{type:1, tracks:40, sectors:10, heads:2}, [737280]:{type:3, tracks:80, sectors:9, heads:2}, [1228800]:{type:2, tracks:80, sectors:15, heads:2}, [1474560]:{type:4, tracks:80, sectors:18, heads:2}, [1763328]:{type:5, 
    tracks:82, sectors:21, heads:2}, [2949120]:{type:5, tracks:80, sectors:36, heads:2}, 512:{type:1, tracks:1, sectors:1, heads:1}, };
    let $floppy_size$$ = $fda_image_number_of_heads$$.byteLength;
    $fdb_image_floppy_type_number_of_cylinders$$ = $floppy_types$$[$floppy_size$$];
    $fdb_image_floppy_type_number_of_cylinders$$ || ($floppy_size$$ = 1474560 < $fda_image_number_of_heads$$.byteLength ? 2949120 : 1474560, $fdb_image_floppy_type_number_of_cylinders$$ = $floppy_types$$[$floppy_size$$], dbg_log("Warning: Unkown floppy size: " + $fda_image_number_of_heads$$.byteLength + ", assuming " + $floppy_size$$));
    $cpu$$.devices.rtc.cmos_write(CMOS_FLOPPY_DRIVE_TYPE, $fdb_image_floppy_type_number_of_cylinders$$.type << 4);
    $cpu$$ = $fdb_image_floppy_type_number_of_cylinders$$.sectors;
    $fda_image_number_of_heads$$ = $fdb_image_floppy_type_number_of_cylinders$$.heads;
    $fdb_image_floppy_type_number_of_cylinders$$ = $fdb_image_floppy_type_number_of_cylinders$$.tracks;
    this.sectors_per_track = $cpu$$;
    this.number_of_heads = $fda_image_number_of_heads$$;
    this.number_of_cylinders = $fdb_image_floppy_type_number_of_cylinders$$;
  } else {
    $cpu$$.devices.rtc.cmos_write(CMOS_FLOPPY_DRIVE_TYPE, 64), this.number_of_cylinders = this.number_of_heads = this.sectors_per_track = 0;
  }
  this.io.register_read(1008, this, this.port3F0_read);
  this.io.register_read(1010, this, this.port3F2_read);
  this.io.register_read(1012, this, this.port3F4_read);
  this.io.register_read(1013, this, this.port3F5_read);
  this.io.register_read(1015, this, this.port3F7_read);
  this.io.register_write(1010, this, this.port3F2_write);
  this.io.register_write(1013, this, this.port3F5_write);
}
FloppyController.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.bytes_expecting;
  $state$$[1] = this.receiving_command;
  $state$$[2] = this.receiving_index;
  $state$$[4] = this.response_data;
  $state$$[5] = this.response_index;
  $state$$[6] = this.response_length;
  $state$$[8] = this.status_reg0;
  $state$$[9] = this.status_reg1;
  $state$$[10] = this.status_reg2;
  $state$$[11] = this.drive;
  $state$$[12] = this.last_cylinder;
  $state$$[13] = this.last_head;
  $state$$[14] = this.last_sector;
  $state$$[15] = this.dor;
  $state$$[16] = this.sectors_per_track;
  $state$$[17] = this.number_of_heads;
  $state$$[18] = this.number_of_cylinders;
  return $state$$;
};
FloppyController.prototype.set_state = function($state$$) {
  this.bytes_expecting = $state$$[0];
  this.receiving_command = $state$$[1];
  this.receiving_index = $state$$[2];
  this.next_command = $state$$[3];
  this.response_data = $state$$[4];
  this.response_index = $state$$[5];
  this.response_length = $state$$[6];
  this.status_reg0 = $state$$[8];
  this.status_reg1 = $state$$[9];
  this.status_reg2 = $state$$[10];
  this.drive = $state$$[11];
  this.last_cylinder = $state$$[12];
  this.last_head = $state$$[13];
  this.last_sector = $state$$[14];
  this.dor = $state$$[15];
  this.sectors_per_track = $state$$[16];
  this.number_of_heads = $state$$[17];
  this.number_of_cylinders = $state$$[18];
};
FloppyController.prototype.port3F0_read = function() {
  dbg_log("3F0 read", LOG_FLOPPY);
  return 0;
};
FloppyController.prototype.port3F4_read = function() {
  dbg_log("3F4 read", LOG_FLOPPY);
  var $return_byte$$ = 128;
  this.response_index < this.response_length && ($return_byte$$ |= 80);
  0 === (this.dor & 8) && ($return_byte$$ |= 32);
  return $return_byte$$;
};
FloppyController.prototype.port3F7_read = function() {
  dbg_log("3F7 read", LOG_FLOPPY);
  return 0;
};
FloppyController.prototype.port3F5_read = function() {
  if (this.response_index < this.response_length) {
    return dbg_log("3F5 read: " + this.response_data[this.response_index], LOG_FLOPPY), this.cpu.device_lower_irq(6), this.response_data[this.response_index++];
  }
  dbg_log("3F5 read, empty", LOG_FLOPPY);
  return 255;
};
FloppyController.prototype.port3F5_write = function($log_reg_byte$$) {
  if (this.fda_image) {
    if (dbg_log("3F5 write " + h($log_reg_byte$$), LOG_FLOPPY), 0 < this.bytes_expecting) {
      if (this.receiving_command[this.receiving_index++] = $log_reg_byte$$, this.bytes_expecting--, 0 === this.bytes_expecting) {
        if (DEBUG) {
          $log_reg_byte$$ = "3F5 command received: ";
          for (var $i$$ = 0; $i$$ < this.receiving_index; $i$$++) {
            $log_reg_byte$$ += h(this.receiving_command[$i$$]) + " ";
          }
          dbg_log($log_reg_byte$$, LOG_FLOPPY);
        }
        this.next_command.call(this, this.receiving_command);
      }
    } else {
      switch($log_reg_byte$$) {
        case 3:
          this.next_command = this.fix_drive_data;
          this.bytes_expecting = 2;
          break;
        case 4:
          this.next_command = this.check_drive_status;
          this.bytes_expecting = 1;
          break;
        case 5:
        case 69:
        case 197:
          this.next_command = function($args$$) {
            this.do_sector(!0, $args$$);
          };
          this.bytes_expecting = 8;
          break;
        case 230:
          this.next_command = function($args$$) {
            this.do_sector(!1, $args$$);
          };
          this.bytes_expecting = 8;
          break;
        case 7:
          this.next_command = this.calibrate;
          this.bytes_expecting = 1;
          break;
        case 8:
          this.check_interrupt_status();
          break;
        case 74:
          this.next_command = this.read_sector_id;
          this.bytes_expecting = 1;
          break;
        case 15:
          this.bytes_expecting = 2;
          this.next_command = this.seek;
          break;
        case 14:
          dbg_log("dump registers", LOG_FLOPPY);
          this.response_data[0] = 128;
          this.response_index = 0;
          this.response_length = 1;
          this.bytes_expecting = 0;
          break;
        default:
          dbg_assert(!1, "Unimplemented floppy command call " + h($log_reg_byte$$));
      }
      this.receiving_index = 0;
    }
  }
};
FloppyController.prototype.port3F2_read = function() {
  dbg_log("read 3F2: DOR", LOG_FLOPPY);
  return this.dor;
};
FloppyController.prototype.port3F2_write = function($value$$) {
  4 === ($value$$ & 4) && 0 === (this.dor & 4) && this.cpu.device_raise_irq(6);
  dbg_log("start motors: " + h($value$$ >> 4), LOG_FLOPPY);
  dbg_log("enable dma: " + !!($value$$ & 8), LOG_FLOPPY);
  dbg_log("reset fdc: " + !!($value$$ & 4), LOG_FLOPPY);
  dbg_log("drive select: " + ($value$$ & 3), LOG_FLOPPY);
  dbg_log("DOR = " + h($value$$), LOG_FLOPPY);
  this.dor = $value$$;
};
FloppyController.prototype.check_drive_status = function($args$$) {
  dbg_log("check drive status", LOG_FLOPPY);
  this.response_index = 0;
  this.response_length = 1;
  this.response_data[0] = 32;
};
FloppyController.prototype.seek = function($args$$) {
  dbg_log("seek", LOG_FLOPPY);
  dbg_assert(0 === ($args$$[0] & 3), "Unhandled seek drive");
  this.last_cylinder = $args$$[1];
  this.last_head = $args$$[0] >> 2 & 1;
  this.raise_irq();
};
FloppyController.prototype.calibrate = function($args$$) {
  dbg_log("floppy calibrate", LOG_FLOPPY);
  this.raise_irq();
};
FloppyController.prototype.check_interrupt_status = function() {
  dbg_log("floppy check interrupt status", LOG_FLOPPY);
  this.response_index = 0;
  this.response_length = 2;
  this.response_data[0] = 32;
  this.response_data[1] = this.last_cylinder;
};
FloppyController.prototype.do_sector = function($is_write$$, $args$$) {
  var $head$$ = $args$$[2], $cylinder$$ = $args$$[1], $sector$$ = $args$$[3], $sector_size$$ = 128 << $args$$[4], $read_count$$ = $args$$[5] - $args$$[3] + 1, $read_offset$$ = (($head$$ + this.number_of_heads * $cylinder$$) * this.sectors_per_track + $sector$$ - 1) * $sector_size$$;
  dbg_log("Floppy " + ($is_write$$ ? "Write" : "Read"), LOG_FLOPPY);
  dbg_log("from " + h($read_offset$$) + " length " + h($read_count$$ * $sector_size$$), LOG_FLOPPY);
  dbg_log($cylinder$$ + " / " + $head$$ + " / " + $sector$$, LOG_FLOPPY);
  $args$$[4] || dbg_log("FDC: sector count is zero, use data length instead", LOG_FLOPPY);
  this.fda_image && ($is_write$$ ? this.dma.do_write(this.fda_image, $read_offset$$, $read_count$$ * $sector_size$$, 2, this.done.bind(this, $args$$, $cylinder$$, $head$$, $sector$$)) : this.dma.do_read(this.fda_image, $read_offset$$, $read_count$$ * $sector_size$$, 2, this.done.bind(this, $args$$, $cylinder$$, $head$$, $sector$$)));
};
FloppyController.prototype.done = function($args$$, $cylinder$$, $head$$, $sector$$, $error$$) {
  $error$$ || ($sector$$++, $sector$$ > this.sectors_per_track && ($sector$$ = 1, $head$$++, $head$$ >= this.number_of_heads && ($head$$ = 0, $cylinder$$++)), this.last_cylinder = $cylinder$$, this.last_head = $head$$, this.last_sector = $sector$$, this.response_index = 0, this.response_length = 7, this.response_data[0] = $head$$ << 2 | 32, this.response_data[1] = 0, this.response_data[2] = 0, this.response_data[3] = $cylinder$$, this.response_data[4] = $head$$, this.response_data[5] = $sector$$, 
  this.response_data[6] = $args$$[4], this.raise_irq());
};
FloppyController.prototype.fix_drive_data = function($args$$) {
  dbg_log("floppy fix drive data " + $args$$, LOG_FLOPPY);
};
FloppyController.prototype.read_sector_id = function($args$$) {
  dbg_log("floppy read sector id " + $args$$, LOG_FLOPPY);
  this.response_index = 0;
  this.response_length = 7;
  this.response_data[0] = 0;
  this.response_data[1] = 0;
  this.response_data[2] = 0;
  this.response_data[3] = 0;
  this.response_data[4] = 0;
  this.response_data[5] = 0;
  this.response_data[6] = 0;
  this.raise_irq();
};
FloppyController.prototype.raise_irq = function() {
  this.dor & 8 && this.cpu.device_raise_irq(6);
};
CPU.prototype.mmap_read8 = function($addr$jscomp$13_value$$) {
  $addr$jscomp$13_value$$ = this.memory_map_read8[$addr$jscomp$13_value$$ >>> MMAP_BLOCK_BITS]($addr$jscomp$13_value$$);
  dbg_assert(0 <= $addr$jscomp$13_value$$ && 255 >= $addr$jscomp$13_value$$);
  return $addr$jscomp$13_value$$;
};
CPU.prototype.mmap_write8 = function($addr$$, $value$$) {
  dbg_assert(0 <= $value$$ && 255 >= $value$$);
  this.memory_map_write8[$addr$$ >>> MMAP_BLOCK_BITS]($addr$$, $value$$);
};
CPU.prototype.mmap_read16 = function($addr$jscomp$15_value$$) {
  var $fn$$ = this.memory_map_read8[$addr$jscomp$15_value$$ >>> MMAP_BLOCK_BITS];
  $addr$jscomp$15_value$$ = $fn$$($addr$jscomp$15_value$$) | $fn$$($addr$jscomp$15_value$$ + 1 | 0) << 8;
  dbg_assert(0 <= $addr$jscomp$15_value$$ && 65535 >= $addr$jscomp$15_value$$);
  return $addr$jscomp$15_value$$;
};
CPU.prototype.mmap_write16 = function($addr$$, $value$$) {
  var $fn$$ = this.memory_map_write8[$addr$$ >>> MMAP_BLOCK_BITS];
  dbg_assert(0 <= $value$$ && 65535 >= $value$$);
  $fn$$($addr$$, $value$$ & 255);
  $fn$$($addr$$ + 1 | 0, $value$$ >> 8);
};
CPU.prototype.mmap_read32 = function($addr$$) {
  return this.memory_map_read32[$addr$$ >>> MMAP_BLOCK_BITS]($addr$$);
};
CPU.prototype.mmap_write32 = function($addr$$, $value$$) {
  this.memory_map_write32[$addr$$ >>> MMAP_BLOCK_BITS]($addr$$, $value$$);
};
CPU.prototype.mmap_write64 = function($addr$$, $value0$$, $value1$$) {
  var $aligned_addr$jscomp$5_write_func32$$ = $addr$$ >>> MMAP_BLOCK_BITS;
  dbg_assert($aligned_addr$jscomp$5_write_func32$$ === $addr$$ + 7 >>> MMAP_BLOCK_BITS);
  $aligned_addr$jscomp$5_write_func32$$ = this.memory_map_write32[$aligned_addr$jscomp$5_write_func32$$];
  $aligned_addr$jscomp$5_write_func32$$($addr$$, $value0$$);
  $aligned_addr$jscomp$5_write_func32$$($addr$$ + 4, $value1$$);
};
CPU.prototype.mmap_write128 = function($addr$$, $value0$$, $value1$$, $value2$$, $value3$$) {
  var $aligned_addr$jscomp$6_write_func32$$ = $addr$$ >>> MMAP_BLOCK_BITS;
  dbg_assert($aligned_addr$jscomp$6_write_func32$$ === $addr$$ + 12 >>> MMAP_BLOCK_BITS);
  $aligned_addr$jscomp$6_write_func32$$ = this.memory_map_write32[$aligned_addr$jscomp$6_write_func32$$];
  $aligned_addr$jscomp$6_write_func32$$($addr$$, $value0$$);
  $aligned_addr$jscomp$6_write_func32$$($addr$$ + 4, $value1$$);
  $aligned_addr$jscomp$6_write_func32$$($addr$$ + 8, $value2$$);
  $aligned_addr$jscomp$6_write_func32$$($addr$$ + 12, $value3$$);
};
CPU.prototype.write_blob = function($blob$$, $offset$$) {
  dbg_assert($blob$$ && 0 <= $blob$$.length);
  $blob$$.length && (dbg_assert(!this.in_mapped_range($offset$$)), dbg_assert(!this.in_mapped_range($offset$$ + $blob$$.length - 1)), this.jit_dirty_cache($offset$$, $offset$$ + $blob$$.length), this.mem8.set($blob$$, $offset$$));
};
CPU.prototype.read_blob = function($offset$$, $length$$) {
  $length$$ && (dbg_assert(!this.in_mapped_range($offset$$)), dbg_assert(!this.in_mapped_range($offset$$ + $length$$ - 1)));
  return this.mem8.subarray($offset$$, $offset$$ + $length$$);
};
function DMA($cpu$$) {
  this.cpu = $cpu$$;
  this.channel_page = new Uint8Array(8);
  this.channel_pagehi = new Uint8Array(8);
  this.channel_addr = new Uint16Array(8);
  this.channel_addr_init = new Uint16Array(8);
  this.channel_count = new Uint16Array(8);
  this.channel_count_init = new Uint16Array(8);
  this.channel_mask = new Uint8Array(8);
  this.channel_mode = new Uint8Array(8);
  this.unmask_listeners = [];
  this.lsb_msb_flipflop = 0;
  $cpu$$ = $cpu$$.io;
  $cpu$$.register_write(0, this, this.port_addr_write.bind(this, 0));
  $cpu$$.register_write(2, this, this.port_addr_write.bind(this, 1));
  $cpu$$.register_write(4, this, this.port_addr_write.bind(this, 2));
  $cpu$$.register_write(6, this, this.port_addr_write.bind(this, 3));
  $cpu$$.register_write(1, this, this.port_count_write.bind(this, 0));
  $cpu$$.register_write(3, this, this.port_count_write.bind(this, 1));
  $cpu$$.register_write(5, this, this.port_count_write.bind(this, 2));
  $cpu$$.register_write(7, this, this.port_count_write.bind(this, 3));
  $cpu$$.register_read(0, this, this.port_addr_read.bind(this, 0));
  $cpu$$.register_read(2, this, this.port_addr_read.bind(this, 1));
  $cpu$$.register_read(4, this, this.port_addr_read.bind(this, 2));
  $cpu$$.register_read(6, this, this.port_addr_read.bind(this, 3));
  $cpu$$.register_read(1, this, this.port_count_read.bind(this, 0));
  $cpu$$.register_read(3, this, this.port_count_read.bind(this, 1));
  $cpu$$.register_read(5, this, this.port_count_read.bind(this, 2));
  $cpu$$.register_read(7, this, this.port_count_read.bind(this, 3));
  $cpu$$.register_write(192, this, this.port_addr_write.bind(this, 4));
  $cpu$$.register_write(196, this, this.port_addr_write.bind(this, 5));
  $cpu$$.register_write(200, this, this.port_addr_write.bind(this, 6));
  $cpu$$.register_write(204, this, this.port_addr_write.bind(this, 7));
  $cpu$$.register_write(194, this, this.port_count_write.bind(this, 4));
  $cpu$$.register_write(198, this, this.port_count_write.bind(this, 5));
  $cpu$$.register_write(202, this, this.port_count_write.bind(this, 6));
  $cpu$$.register_write(206, this, this.port_count_write.bind(this, 7));
  $cpu$$.register_read(192, this, this.port_addr_read.bind(this, 4));
  $cpu$$.register_read(196, this, this.port_addr_read.bind(this, 5));
  $cpu$$.register_read(200, this, this.port_addr_read.bind(this, 6));
  $cpu$$.register_read(204, this, this.port_addr_read.bind(this, 7));
  $cpu$$.register_read(194, this, this.port_count_read.bind(this, 4));
  $cpu$$.register_read(198, this, this.port_count_read.bind(this, 5));
  $cpu$$.register_read(202, this, this.port_count_read.bind(this, 6));
  $cpu$$.register_read(206, this, this.port_count_read.bind(this, 7));
  $cpu$$.register_write(135, this, this.port_page_write.bind(this, 0));
  $cpu$$.register_write(131, this, this.port_page_write.bind(this, 1));
  $cpu$$.register_write(129, this, this.port_page_write.bind(this, 2));
  $cpu$$.register_write(130, this, this.port_page_write.bind(this, 3));
  $cpu$$.register_write(143, this, this.port_page_write.bind(this, 4));
  $cpu$$.register_write(139, this, this.port_page_write.bind(this, 5));
  $cpu$$.register_write(137, this, this.port_page_write.bind(this, 6));
  $cpu$$.register_write(138, this, this.port_page_write.bind(this, 7));
  $cpu$$.register_read(135, this, this.port_page_read.bind(this, 0));
  $cpu$$.register_read(131, this, this.port_page_read.bind(this, 1));
  $cpu$$.register_read(129, this, this.port_page_read.bind(this, 2));
  $cpu$$.register_read(130, this, this.port_page_read.bind(this, 3));
  $cpu$$.register_read(143, this, this.port_page_read.bind(this, 4));
  $cpu$$.register_read(139, this, this.port_page_read.bind(this, 5));
  $cpu$$.register_read(137, this, this.port_page_read.bind(this, 6));
  $cpu$$.register_read(138, this, this.port_page_read.bind(this, 7));
  $cpu$$.register_write(1159, this, this.port_pagehi_write.bind(this, 0));
  $cpu$$.register_write(1155, this, this.port_pagehi_write.bind(this, 1));
  $cpu$$.register_write(1153, this, this.port_pagehi_write.bind(this, 2));
  $cpu$$.register_write(1154, this, this.port_pagehi_write.bind(this, 3));
  $cpu$$.register_write(1163, this, this.port_pagehi_write.bind(this, 5));
  $cpu$$.register_write(1161, this, this.port_pagehi_write.bind(this, 6));
  $cpu$$.register_write(1162, this, this.port_pagehi_write.bind(this, 7));
  $cpu$$.register_read(1159, this, this.port_pagehi_read.bind(this, 0));
  $cpu$$.register_read(1155, this, this.port_pagehi_read.bind(this, 1));
  $cpu$$.register_read(1153, this, this.port_pagehi_read.bind(this, 2));
  $cpu$$.register_read(1154, this, this.port_pagehi_read.bind(this, 3));
  $cpu$$.register_read(1163, this, this.port_pagehi_read.bind(this, 5));
  $cpu$$.register_read(1161, this, this.port_pagehi_read.bind(this, 6));
  $cpu$$.register_read(1162, this, this.port_pagehi_read.bind(this, 7));
  $cpu$$.register_write(10, this, this.port_singlemask_write.bind(this, 0));
  $cpu$$.register_write(212, this, this.port_singlemask_write.bind(this, 4));
  $cpu$$.register_write(15, this, this.port_multimask_write.bind(this, 0));
  $cpu$$.register_write(222, this, this.port_multimask_write.bind(this, 4));
  $cpu$$.register_read(15, this, this.port_multimask_read.bind(this, 0));
  $cpu$$.register_read(222, this, this.port_multimask_read.bind(this, 4));
  $cpu$$.register_write(11, this, this.port_mode_write.bind(this, 0));
  $cpu$$.register_write(214, this, this.port_mode_write.bind(this, 4));
  $cpu$$.register_write(12, this, this.portC_write);
  $cpu$$.register_write(216, this, this.portC_write);
}
DMA.prototype.get_state = function() {
  return [this.channel_page, this.channel_pagehi, this.channel_addr, this.channel_addr_init, this.channel_count, this.channel_count_init, this.channel_mask, this.channel_mode, this.lsb_msb_flipflop, ];
};
DMA.prototype.set_state = function($state$$) {
  this.channel_page = $state$$[0];
  this.channel_pagehi = $state$$[1];
  this.channel_addr = $state$$[2];
  this.channel_addr_init = $state$$[3];
  this.channel_count = $state$$[4];
  this.channel_count_init = $state$$[5];
  this.channel_mask = $state$$[6];
  this.channel_mode = $state$$[7];
  this.lsb_msb_flipflop = $state$$[8];
};
DMA.prototype.port_count_write = function($channel$$, $data_byte$$) {
  dbg_log("count write [" + $channel$$ + "] = " + h($data_byte$$), LOG_DMA);
  this.channel_count[$channel$$] = this.flipflop_get(this.channel_count[$channel$$], $data_byte$$, !1);
  this.channel_count_init[$channel$$] = this.flipflop_get(this.channel_count_init[$channel$$], $data_byte$$, !0);
};
DMA.prototype.port_count_read = function($channel$$) {
  dbg_log("count read [" + $channel$$ + "] -> " + h(this.channel_count[$channel$$]), LOG_DMA);
  return this.flipflop_read(this.channel_count[$channel$$]);
};
DMA.prototype.port_addr_write = function($channel$$, $data_byte$$) {
  dbg_log("addr write [" + $channel$$ + "] = " + h($data_byte$$), LOG_DMA);
  this.channel_addr[$channel$$] = this.flipflop_get(this.channel_addr[$channel$$], $data_byte$$, !1);
  this.channel_addr_init[$channel$$] = this.flipflop_get(this.channel_addr_init[$channel$$], $data_byte$$, !0);
};
DMA.prototype.port_addr_read = function($channel$$) {
  dbg_log("addr read [" + $channel$$ + "] -> " + h(this.channel_addr[$channel$$]), LOG_DMA);
  return this.flipflop_read(this.channel_addr[$channel$$]);
};
DMA.prototype.port_pagehi_write = function($channel$$, $data_byte$$) {
  dbg_log("pagehi write [" + $channel$$ + "] = " + h($data_byte$$), LOG_DMA);
  this.channel_pagehi[$channel$$] = $data_byte$$;
};
DMA.prototype.port_pagehi_read = function($channel$$) {
  dbg_log("pagehi read [" + $channel$$ + "]", LOG_DMA);
  return this.channel_pagehi[$channel$$];
};
DMA.prototype.port_page_write = function($channel$$, $data_byte$$) {
  dbg_log("page write [" + $channel$$ + "] = " + h($data_byte$$), LOG_DMA);
  this.channel_page[$channel$$] = $data_byte$$;
};
DMA.prototype.port_page_read = function($channel$$) {
  dbg_log("page read [" + $channel$$ + "]", LOG_DMA);
  return this.channel_page[$channel$$];
};
DMA.prototype.port_singlemask_write = function($channel$$, $data_byte$jscomp$4_value$$) {
  $channel$$ = ($data_byte$jscomp$4_value$$ & 3) + $channel$$;
  $data_byte$jscomp$4_value$$ = $data_byte$jscomp$4_value$$ & 4 ? 1 : 0;
  dbg_log("singlechannel mask write [" + $channel$$ + "] = " + $data_byte$jscomp$4_value$$, LOG_DMA);
  this.update_mask($channel$$, $data_byte$jscomp$4_value$$);
};
DMA.prototype.port_multimask_write = function($channel_offset$$, $data_byte$$) {
  dbg_log("multichannel mask write: " + h($data_byte$$), LOG_DMA);
  for (var $i$$ = 0; 4 > $i$$; $i$$++) {
    this.update_mask($channel_offset$$ + $i$$, $data_byte$$ & 1 << $i$$);
  }
};
DMA.prototype.port_multimask_read = function($channel_offset$$) {
  var $value$$ = 0 | this.channel_mask[$channel_offset$$ + 0];
  $value$$ |= this.channel_mask[$channel_offset$$ + 1] << 1;
  $value$$ |= this.channel_mask[$channel_offset$$ + 2] << 2;
  $value$$ |= this.channel_mask[$channel_offset$$ + 3] << 3;
  dbg_log("multichannel mask read: " + h($value$$), LOG_DMA);
  return $value$$;
};
DMA.prototype.port_mode_write = function($channel$jscomp$10_channel_offset$$, $data_byte$$) {
  $channel$jscomp$10_channel_offset$$ = ($data_byte$$ & 3) + $channel$jscomp$10_channel_offset$$;
  dbg_log("mode write [" + $channel$jscomp$10_channel_offset$$ + "] = " + h($data_byte$$), LOG_DMA);
  this.channel_mode[$channel$jscomp$10_channel_offset$$] = $data_byte$$;
};
DMA.prototype.portC_write = function($data_byte$$) {
  dbg_log("flipflop reset", LOG_DMA);
  this.lsb_msb_flipflop = 0;
};
DMA.prototype.on_unmask = function($fn$$, $this_value$$) {
  this.unmask_listeners.push({fn:$fn$$, this_value:$this_value$$, });
};
DMA.prototype.update_mask = function($channel$$, $i$jscomp$28_value$$) {
  if (this.channel_mask[$channel$$] !== $i$jscomp$28_value$$ && (this.channel_mask[$channel$$] = $i$jscomp$28_value$$, !$i$jscomp$28_value$$)) {
    for (dbg_log("firing on_unmask(" + $channel$$ + ")", LOG_DMA), $i$jscomp$28_value$$ = 0; $i$jscomp$28_value$$ < this.unmask_listeners.length; $i$jscomp$28_value$$++) {
      this.unmask_listeners[$i$jscomp$28_value$$].fn.call(this.unmask_listeners[$i$jscomp$28_value$$].this_value, $channel$$);
    }
  }
};
DMA.prototype.do_read = function($buffer$$, $start$$, $len$$, $channel$$, $fn$$) {
  var $read_count$$ = this.count_get_8bit($channel$$), $addr$$ = this.address_get_8bit($channel$$);
  dbg_log("DMA write channel " + $channel$$, LOG_DMA);
  dbg_log("to " + h($addr$$) + " len " + h($read_count$$), LOG_DMA);
  $len$$ < $read_count$$ && dbg_log("DMA should read more than provided: " + h($len$$) + " " + h($read_count$$), LOG_DMA);
  if ($start$$ + $read_count$$ > $buffer$$.byteLength) {
    dbg_log("DMA read outside of buffer", LOG_DMA), $fn$$(!0);
  } else {
    var $cpu$$ = this.cpu;
    this.channel_addr[$channel$$] += $read_count$$;
    $buffer$$.get($start$$, $read_count$$, function($data$$) {
      $cpu$$.write_blob($data$$, $addr$$);
      $fn$$(!1);
    });
  }
};
DMA.prototype.do_write = function($buffer$$, $start$$, $len$$, $channel$$, $fn$$) {
  var $read_count$$ = this.channel_count[$channel$$] + 1 & 65535, $bytes_per_count$$ = 5 <= $channel$$ ? 2 : 1, $read_bytes$$ = $read_count$$ * $bytes_per_count$$, $addr$$ = this.address_get_8bit($channel$$), $unfinished$$ = !1, $want_more$$ = !1, $autoinit$$ = this.channel_mode[$channel$$] & 16;
  dbg_log("DMA write channel " + $channel$$, LOG_DMA);
  dbg_log("to " + h($addr$$) + " len " + h($read_bytes$$), LOG_DMA);
  $len$$ < $read_bytes$$ ? (dbg_log("DMA should read more than provided", LOG_DMA), $read_count$$ = Math.floor($len$$ / $bytes_per_count$$), $read_bytes$$ = $read_count$$ * $bytes_per_count$$, $unfinished$$ = !0) : $len$$ > $read_bytes$$ && (dbg_log("DMA attempted to read more than provided", LOG_DMA), $want_more$$ = !0);
  $start$$ + $read_bytes$$ > $buffer$$.byteLength ? (dbg_log("DMA write outside of buffer", LOG_DMA), $fn$$(!0)) : (this.channel_addr[$channel$$] += $read_count$$, this.channel_count[$channel$$] -= $read_count$$, !$unfinished$$ && $autoinit$$ && (dbg_log("DMA autoinit", LOG_DMA), this.channel_addr[$channel$$] = this.channel_addr_init[$channel$$], this.channel_count[$channel$$] = this.channel_count_init[$channel$$]), $buffer$$.set($start$$, this.cpu.mem8.subarray($addr$$, $addr$$ + $read_bytes$$), 
  () => {
    $want_more$$ && $autoinit$$ ? (dbg_log("DMA continuing from start", LOG_DMA), this.do_write($buffer$$, $start$$ + $read_bytes$$, $len$$ - $read_bytes$$, $channel$$, $fn$$)) : $fn$$(!1);
  }));
};
DMA.prototype.address_get_8bit = function($channel$$) {
  var $addr$$ = this.channel_addr[$channel$$];
  5 <= $channel$$ && ($addr$$ <<= 1);
  $addr$$ = $addr$$ & 65535 | this.channel_page[$channel$$] << 16;
  return $addr$$ |= this.channel_pagehi[$channel$$] << 24;
};
DMA.prototype.count_get_8bit = function($channel$$) {
  var $count$$ = this.channel_count[$channel$$] + 1;
  5 <= $channel$$ && ($count$$ *= 2);
  return $count$$;
};
DMA.prototype.flipflop_get = function($old_dword$$, $new_byte$$, $continuing$$) {
  $continuing$$ || (this.lsb_msb_flipflop ^= 1);
  return this.lsb_msb_flipflop ? $old_dword$$ & -256 | $new_byte$$ : $old_dword$$ & -65281 | $new_byte$$ << 8;
};
DMA.prototype.flipflop_read = function($dword$$) {
  return (this.lsb_msb_flipflop ^= 1) ? $dword$$ & 255 : $dword$$ >> 8 & 255;
};
var OSCILLATOR_FREQ = 1193.1816666;
function PIT($cpu$$, $bus$$) {
  this.cpu = $cpu$$;
  this.bus = $bus$$;
  this.counter_start_time = new Float64Array(3);
  this.counter_start_value = new Uint16Array(3);
  this.counter_next_low = new Uint8Array(4);
  this.counter_enabled = new Uint8Array(4);
  this.counter_mode = new Uint8Array(4);
  this.counter_read_mode = new Uint8Array(4);
  this.counter_latch = new Uint8Array(4);
  this.counter_latch_value = new Uint16Array(3);
  this.counter_reload = new Uint16Array(3);
  $cpu$$.io.register_read(97, this, function() {
    var $counter2_out_now$$ = v86.microtick(), $ref_toggle$$ = 66.66666666666667 * $counter2_out_now$$ & 1;
    $counter2_out_now$$ = this.did_rollover(2, $counter2_out_now$$);
    return $ref_toggle$$ << 4 | $counter2_out_now$$ << 5;
  });
  $cpu$$.io.register_write(97, this, function($data$$) {
    $data$$ & 1 ? this.bus.send("pcspeaker-enable") : this.bus.send("pcspeaker-disable");
  });
  $cpu$$.io.register_read(64, this, function() {
    return this.counter_read(0);
  });
  $cpu$$.io.register_read(65, this, function() {
    return this.counter_read(1);
  });
  $cpu$$.io.register_read(66, this, function() {
    return this.counter_read(2);
  });
  $cpu$$.io.register_write(64, this, function($data$$) {
    this.counter_write(0, $data$$);
  });
  $cpu$$.io.register_write(65, this, function($data$$) {
    this.counter_write(1, $data$$);
  });
  $cpu$$.io.register_write(66, this, function($data$$) {
    this.counter_write(2, $data$$);
    this.bus.send("pcspeaker-update", [this.counter_mode[2], this.counter_reload[2]]);
  });
  $cpu$$.io.register_write(67, this, this.port43_write);
}
PIT.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.counter_next_low;
  $state$$[1] = this.counter_enabled;
  $state$$[2] = this.counter_mode;
  $state$$[3] = this.counter_read_mode;
  $state$$[4] = this.counter_latch;
  $state$$[5] = this.counter_latch_value;
  $state$$[6] = this.counter_reload;
  $state$$[7] = this.counter_start_time;
  $state$$[8] = this.counter_start_value;
  return $state$$;
};
PIT.prototype.set_state = function($state$$) {
  this.counter_next_low = $state$$[0];
  this.counter_enabled = $state$$[1];
  this.counter_mode = $state$$[2];
  this.counter_read_mode = $state$$[3];
  this.counter_latch = $state$$[4];
  this.counter_latch_value = $state$$[5];
  this.counter_reload = $state$$[6];
  this.counter_start_time = $state$$[7];
  this.counter_start_value = $state$$[8];
};
PIT.prototype.timer = function($now$$, $no_irq$$) {
  var $time_to_next_interrupt$$ = 100;
  $no_irq$$ || (this.counter_enabled[0] && this.did_rollover(0, $now$$) ? (this.counter_start_value[0] = this.get_counter_value(0, $now$$), this.counter_start_time[0] = $now$$, dbg_log("pit interrupt. new value: " + this.counter_start_value[0], LOG_PIT), this.cpu.device_lower_irq(0), this.cpu.device_raise_irq(0), 0 === this.counter_mode[0] && (this.counter_enabled[0] = 0)) : this.cpu.device_lower_irq(0), this.counter_enabled[0] && ($time_to_next_interrupt$$ = (this.counter_start_value[0] - Math.floor(($now$$ - 
  this.counter_start_time[0]) * OSCILLATOR_FREQ)) / OSCILLATOR_FREQ));
  return $time_to_next_interrupt$$;
};
PIT.prototype.get_counter_value = function($i$$, $now$jscomp$2_value$$) {
  if (!this.counter_enabled[$i$$]) {
    return 0;
  }
  var $diff$$ = $now$jscomp$2_value$$ - this.counter_start_time[$i$$], $diff_in_ticks$$ = Math.floor($diff$$ * OSCILLATOR_FREQ);
  $now$jscomp$2_value$$ = this.counter_start_value[$i$$] - $diff_in_ticks$$;
  dbg_log("diff=" + $diff$$ + " dticks=" + $diff_in_ticks$$ + " value=" + $now$jscomp$2_value$$ + " reload=" + this.counter_reload[$i$$], LOG_PIT);
  $diff$$ = this.counter_reload[$i$$];
  $now$jscomp$2_value$$ >= $diff$$ ? (dbg_log("Warning: Counter" + $i$$ + " value " + $now$jscomp$2_value$$ + " is larger than reload " + $diff$$, LOG_PIT), $now$jscomp$2_value$$ %= $diff$$) : 0 > $now$jscomp$2_value$$ && ($now$jscomp$2_value$$ = $now$jscomp$2_value$$ % $diff$$ + $diff$$);
  return $now$jscomp$2_value$$;
};
PIT.prototype.did_rollover = function($i$$, $diff$jscomp$2_now$$) {
  $diff$jscomp$2_now$$ -= this.counter_start_time[$i$$];
  return 0 > $diff$jscomp$2_now$$ ? (dbg_log("Warning: PIT timer difference is negative, resetting (timer " + $i$$ + ")"), !0) : this.counter_start_value[$i$$] < Math.floor($diff$jscomp$2_now$$ * OSCILLATOR_FREQ);
};
PIT.prototype.counter_read = function($i$jscomp$31_value$$) {
  var $latch_next_low$$ = this.counter_latch[$i$jscomp$31_value$$];
  if ($latch_next_low$$) {
    return this.counter_latch[$i$jscomp$31_value$$]--, 2 === $latch_next_low$$ ? this.counter_latch_value[$i$jscomp$31_value$$] & 255 : this.counter_latch_value[$i$jscomp$31_value$$] >> 8;
  }
  $latch_next_low$$ = this.counter_next_low[$i$jscomp$31_value$$];
  3 === this.counter_mode[$i$jscomp$31_value$$] && (this.counter_next_low[$i$jscomp$31_value$$] ^= 1);
  $i$jscomp$31_value$$ = this.get_counter_value($i$jscomp$31_value$$, v86.microtick());
  return $latch_next_low$$ ? $i$jscomp$31_value$$ & 255 : $i$jscomp$31_value$$ >> 8;
};
PIT.prototype.counter_write = function($i$$, $value$$) {
  this.counter_reload[$i$$] = this.counter_next_low[$i$$] ? this.counter_reload[$i$$] & -256 | $value$$ : this.counter_reload[$i$$] & 255 | $value$$ << 8;
  3 === this.counter_read_mode[$i$$] && this.counter_next_low[$i$$] || (this.counter_reload[$i$$] || (this.counter_reload[$i$$] = 65535), this.counter_start_value[$i$$] = this.counter_reload[$i$$], this.counter_enabled[$i$$] = !0, this.counter_start_time[$i$$] = v86.microtick(), dbg_log("counter" + $i$$ + " reload=" + h(this.counter_reload[$i$$]) + " tick=" + (this.counter_reload[$i$$] || 65536) / OSCILLATOR_FREQ + "ms", LOG_PIT));
  3 === this.counter_read_mode[$i$$] && (this.counter_next_low[$i$$] ^= 1);
};
PIT.prototype.port43_write = function($read_mode_reg_byte$$) {
  var $mode$jscomp$18_value$$ = $read_mode_reg_byte$$ >> 1 & 7, $binary_mode$$ = $read_mode_reg_byte$$ & 1, $i$$ = $read_mode_reg_byte$$ >> 6 & 3;
  $read_mode_reg_byte$$ = $read_mode_reg_byte$$ >> 4 & 3;
  1 === $i$$ && dbg_log("Unimplemented timer1", LOG_PIT);
  3 === $i$$ ? dbg_log("Unimplemented read back", LOG_PIT) : 0 === $read_mode_reg_byte$$ ? (this.counter_latch[$i$$] = 2, $mode$jscomp$18_value$$ = this.get_counter_value($i$$, v86.microtick()), dbg_log("latch: " + $mode$jscomp$18_value$$, LOG_PIT), this.counter_latch_value[$i$$] = $mode$jscomp$18_value$$ ? $mode$jscomp$18_value$$ - 1 : 0) : (6 <= $mode$jscomp$18_value$$ && ($mode$jscomp$18_value$$ &= -5), dbg_log("Control: mode=" + $mode$jscomp$18_value$$ + " ctr=" + $i$$ + " read_mode=" + $read_mode_reg_byte$$ + 
  " bcd=" + $binary_mode$$, LOG_PIT), this.counter_next_low[$i$$] = 1 === $read_mode_reg_byte$$ ? 0 : 1, 0 === $i$$ && this.cpu.device_lower_irq(0), 0 !== $mode$jscomp$18_value$$ && 3 !== $mode$jscomp$18_value$$ && 2 !== $mode$jscomp$18_value$$ && dbg_log("Unimplemented counter mode: " + h($mode$jscomp$18_value$$), LOG_PIT), this.counter_mode[$i$$] = $mode$jscomp$18_value$$, this.counter_read_mode[$i$$] = $read_mode_reg_byte$$, 2 === $i$$ && this.bus.send("pcspeaker-update", [this.counter_mode[2], 
  this.counter_reload[2]]));
};
PIT.prototype.dump = function() {
  const $reload$$ = this.counter_reload[0];
  dbg_log("counter0 ticks every " + ($reload$$ || 65536) / OSCILLATOR_FREQ + "ms (reload=" + $reload$$ + ")");
};
var VGA_BANK_SIZE = 65536, MAX_XRES = 2560, MAX_YRES = 1600, MAX_BPP = 32, VGA_LFB_ADDRESS = 3758096384, VGA_PIXEL_BUFFER_SIZE = 8 * VGA_BANK_SIZE, VGA_MIN_MEMORY_SIZE = 4 * VGA_BANK_SIZE, VGA_HOST_MEMORY_SPACE_START = Uint32Array.from([655360, 655360, 720896, 753664, ]), VGA_HOST_MEMORY_SPACE_SIZE = Uint32Array.from([131072, 65536, 32768, 32768, ]);
function VGAScreen($cpu$$, $bus$$, $io$$) {
  this.cpu = $cpu$$;
  this.bus = $bus$$;
  this.vga_memory_size = $io$$;
  this.cursor_address = 0;
  this.cursor_scanline_start = 14;
  this.cursor_scanline_end = 15;
  this.max_cols = 80;
  this.max_rows = 25;
  this.virtual_height = this.virtual_width = this.screen_height = this.screen_width = 0;
  this.layers = [];
  this.start_address_latched = this.start_address = 0;
  this.crtc = new Uint8Array(25);
  this.line_compare = this.offset_register = this.preset_row_scan = this.underline_location_register = this.vertical_blank_start = this.vertical_display_enable_end = this.horizontal_blank_start = this.horizontal_display_enable_end = this.crtc_mode = 0;
  this.graphical_mode_is_linear = !0;
  this.graphical_mode = !1;
  setTimeout(() => {
    $bus$$.send("screen-set-mode", this.graphical_mode);
  }, 0);
  this.vga256_palette = new Int32Array(256);
  this.latch_dword = 0;
  this.svga_version = 45253;
  this.svga_height = this.svga_width = 0;
  this.svga_enabled = !1;
  this.svga_bpp = 32;
  this.svga_offset = this.svga_bank_offset = 0;
  this.pci_space = [52, 18, 17, 17, 3, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 8, VGA_LFB_ADDRESS >>> 8, VGA_LFB_ADDRESS >>> 16, VGA_LFB_ADDRESS >>> 24, 0, 0, 0, 0, 0, 0, 191, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, 0, 17, 0, 0, 190, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
  this.pci_id = 144;
  this.pci_bars = [{size:$io$$, }, ];
  this.pci_rom_size = 65536;
  this.pci_rom_address = 4272947200;
  this.name = "vga";
  this.stats = {is_graphical:!1, res_x:0, res_y:0, bpp:0, };
  this.dac_state = this.dac_color_index_read = this.dac_color_index_write = this.index_crtc = 0;
  this.dac_mask = 255;
  this.dac_map = new Uint8Array(16);
  this.attribute_controller_index = -1;
  this.palette_source = 32;
  this.color_select = this.horizontal_panning = this.color_plane_enable = this.attribute_mode = 0;
  this.sequencer_index = -1;
  this.plane_write_bm = 15;
  this.clocking_mode = this.sequencer_memory_mode = 0;
  this.graphics_index = -1;
  this.planar_rotate_reg = this.planar_mode = this.plane_read = 0;
  this.planar_bitmap = 255;
  this.max_scan_line = this.color_dont_care = this.color_compare = this.miscellaneous_graphics_register = this.planar_setreset_enable = this.planar_setreset = 0;
  this.port_3DA_value = this.miscellaneous_output_register = 255;
  $io$$ = $cpu$$.io;
  $io$$.register_write(960, this, this.port3C0_write);
  $io$$.register_read(960, this, this.port3C0_read, this.port3C0_read16);
  $io$$.register_read(961, this, this.port3C1_read);
  $io$$.register_write(962, this, this.port3C2_write);
  $io$$.register_write_consecutive(964, this, this.port3C4_write, this.port3C5_write);
  $io$$.register_read(964, this, this.port3C4_read);
  $io$$.register_read(965, this, this.port3C5_read);
  $io$$.register_write_consecutive(974, this, this.port3CE_write, this.port3CF_write);
  $io$$.register_read(974, this, this.port3CE_read);
  $io$$.register_read(975, this, this.port3CF_read);
  $io$$.register_read(966, this, this.port3C6_read);
  $io$$.register_write(966, this, this.port3C6_write);
  $io$$.register_write(967, this, this.port3C7_write);
  $io$$.register_read(967, this, this.port3C7_read);
  $io$$.register_write(968, this, this.port3C8_write);
  $io$$.register_read(968, this, this.port3C8_read);
  $io$$.register_write(969, this, this.port3C9_write);
  $io$$.register_read(969, this, this.port3C9_read);
  $io$$.register_read(972, this, this.port3CC_read);
  $io$$.register_write_consecutive(980, this, this.port3D4_write, this.port3D5_write);
  $io$$.register_read(980, this, this.port3D4_read);
  $io$$.register_read(981, this, this.port3D5_read, () => {
    dbg_log("Warning: 16-bit read from 3D5", LOG_VGA);
    return this.port3D5_read();
  });
  $io$$.register_read(970, this, function() {
    dbg_log("3CA read", LOG_VGA);
    return 0;
  });
  $io$$.register_read(986, this, this.port3DA_read);
  $io$$.register_read(954, this, this.port3DA_read);
  this.dispi_index = -1;
  this.dispi_enable_value = 0;
  $io$$.register_write(462, this, void 0, this.port1CE_write);
  $io$$.register_write(463, this, void 0, this.port1CF_write);
  $io$$.register_read(463, this, void 0, this.port1CF_read);
  void 0 === this.vga_memory_size || this.vga_memory_size < VGA_MIN_MEMORY_SIZE ? (this.vga_memory_size = VGA_MIN_MEMORY_SIZE, dbg_log("vga memory size rounded up to " + this.vga_memory_size, LOG_VGA)) : this.vga_memory_size & VGA_BANK_SIZE - 1 && (this.vga_memory_size |= VGA_BANK_SIZE - 1, this.vga_memory_size++);
  const $vga_offset$$ = $cpu$$.svga_allocate_memory(this.vga_memory_size);
  this.svga_memory = v86util.view(Uint8Array, $cpu$$.wasm_memory, $vga_offset$$, this.vga_memory_size);
  this.diff_addr_min = this.vga_memory_size;
  this.diff_addr_max = 0;
  this.diff_plot_min = this.vga_memory_size;
  this.diff_plot_max = 0;
  this.image_data = null;
  $bus$$.register("screen-fill-buffer", function() {
    this.screen_fill_buffer();
  }, this);
  this.vga_memory = new Uint8Array(4 * VGA_BANK_SIZE);
  this.plane0 = new Uint8Array(this.vga_memory.buffer, 0 * VGA_BANK_SIZE, VGA_BANK_SIZE);
  this.plane1 = new Uint8Array(this.vga_memory.buffer, 1 * VGA_BANK_SIZE, VGA_BANK_SIZE);
  this.plane2 = new Uint8Array(this.vga_memory.buffer, 2 * VGA_BANK_SIZE, VGA_BANK_SIZE);
  this.plane3 = new Uint8Array(this.vga_memory.buffer, 3 * VGA_BANK_SIZE, VGA_BANK_SIZE);
  this.pixel_buffer = new Uint8Array(VGA_PIXEL_BUFFER_SIZE);
  var $me$$ = this;
  $io$$.mmap_register(655360, 131072, function($addr$$) {
    return $me$$.vga_memory_read($addr$$);
  }, function($addr$$, $value$$) {
    $me$$.vga_memory_write($addr$$, $value$$);
  });
  $cpu$$.devices.pci.register_device(this);
}
VGAScreen.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.vga_memory_size;
  $state$$[1] = this.cursor_address;
  $state$$[2] = this.cursor_scanline_start;
  $state$$[3] = this.cursor_scanline_end;
  $state$$[4] = this.max_cols;
  $state$$[5] = this.max_rows;
  $state$$[6] = this.vga_memory;
  $state$$[7] = this.dac_state;
  $state$$[8] = this.start_address;
  $state$$[9] = this.graphical_mode;
  $state$$[10] = this.vga256_palette;
  $state$$[11] = this.latch_dword;
  $state$$[12] = this.color_compare;
  $state$$[13] = this.color_dont_care;
  $state$$[14] = this.miscellaneous_graphics_register;
  $state$$[15] = this.svga_width;
  $state$$[16] = this.svga_height;
  $state$$[17] = this.crtc_mode;
  $state$$[18] = this.svga_enabled;
  $state$$[19] = this.svga_bpp;
  $state$$[20] = this.svga_bank_offset;
  $state$$[21] = this.svga_offset;
  $state$$[22] = this.index_crtc;
  $state$$[23] = this.dac_color_index_write;
  $state$$[24] = this.dac_color_index_read;
  $state$$[25] = this.dac_map;
  $state$$[26] = this.sequencer_index;
  $state$$[27] = this.plane_write_bm;
  $state$$[28] = this.sequencer_memory_mode;
  $state$$[29] = this.graphics_index;
  $state$$[30] = this.plane_read;
  $state$$[31] = this.planar_mode;
  $state$$[32] = this.planar_rotate_reg;
  $state$$[33] = this.planar_bitmap;
  $state$$[34] = this.max_scan_line;
  $state$$[35] = this.miscellaneous_output_register;
  $state$$[36] = this.port_3DA_value;
  $state$$[37] = this.dispi_index;
  $state$$[38] = this.dispi_enable_value;
  $state$$[39] = this.svga_memory;
  $state$$[40] = this.graphical_mode_is_linear;
  $state$$[41] = this.attribute_controller_index;
  $state$$[42] = this.offset_register;
  $state$$[43] = this.planar_setreset;
  $state$$[44] = this.planar_setreset_enable;
  $state$$[45] = this.start_address_latched;
  $state$$[46] = this.crtc;
  $state$$[47] = this.horizontal_display_enable_end;
  $state$$[48] = this.horizontal_blank_start;
  $state$$[49] = this.vertical_display_enable_end;
  $state$$[50] = this.vertical_blank_start;
  $state$$[51] = this.underline_location_register;
  $state$$[52] = this.preset_row_scan;
  $state$$[53] = this.offset_register;
  $state$$[54] = this.palette_source;
  $state$$[55] = this.attribute_mode;
  $state$$[56] = this.color_plane_enable;
  $state$$[57] = this.horizontal_panning;
  $state$$[58] = this.color_select;
  $state$$[59] = this.clocking_mode;
  $state$$[60] = this.line_compare;
  $state$$[61] = this.pixel_buffer;
  $state$$[62] = this.dac_mask;
  return $state$$;
};
VGAScreen.prototype.set_state = function($state$$) {
  this.vga_memory_size = $state$$[0];
  this.cursor_address = $state$$[1];
  this.cursor_scanline_start = $state$$[2];
  this.cursor_scanline_end = $state$$[3];
  this.max_cols = $state$$[4];
  this.max_rows = $state$$[5];
  $state$$[6] && this.vga_memory.set($state$$[6]);
  this.dac_state = $state$$[7];
  this.start_address = $state$$[8];
  this.graphical_mode = $state$$[9];
  this.vga256_palette = $state$$[10];
  this.latch_dword = $state$$[11];
  this.color_compare = $state$$[12];
  this.color_dont_care = $state$$[13];
  this.miscellaneous_graphics_register = $state$$[14];
  this.svga_width = $state$$[15];
  this.svga_height = $state$$[16];
  this.crtc_mode = $state$$[17];
  this.svga_enabled = $state$$[18];
  this.svga_bpp = $state$$[19];
  this.svga_bank_offset = $state$$[20];
  this.svga_offset = $state$$[21];
  this.index_crtc = $state$$[22];
  this.dac_color_index_write = $state$$[23];
  this.dac_color_index_read = $state$$[24];
  this.dac_map = $state$$[25];
  this.sequencer_index = $state$$[26];
  this.plane_write_bm = $state$$[27];
  this.sequencer_memory_mode = $state$$[28];
  this.graphics_index = $state$$[29];
  this.plane_read = $state$$[30];
  this.planar_mode = $state$$[31];
  this.planar_rotate_reg = $state$$[32];
  this.planar_bitmap = $state$$[33];
  this.max_scan_line = $state$$[34];
  this.miscellaneous_output_register = $state$$[35];
  this.port_3DA_value = $state$$[36];
  this.dispi_index = $state$$[37];
  this.dispi_enable_value = $state$$[38];
  this.svga_memory.set($state$$[39]);
  this.graphical_mode_is_linear = $state$$[40];
  this.attribute_controller_index = $state$$[41];
  this.offset_register = $state$$[42];
  this.planar_setreset = $state$$[43];
  this.planar_setreset_enable = $state$$[44];
  this.start_address_latched = $state$$[45];
  this.crtc.set($state$$[46]);
  this.horizontal_display_enable_end = $state$$[47];
  this.horizontal_blank_start = $state$$[48];
  this.vertical_display_enable_end = $state$$[49];
  this.vertical_blank_start = $state$$[50];
  this.underline_location_register = $state$$[51];
  this.preset_row_scan = $state$$[52];
  this.offset_register = $state$$[53];
  this.palette_source = $state$$[54];
  this.attribute_mode = $state$$[55];
  this.color_plane_enable = $state$$[56];
  this.horizontal_panning = $state$$[57];
  this.color_select = $state$$[58];
  this.clocking_mode = $state$$[59];
  this.line_compare = $state$$[60];
  $state$$[61] && this.pixel_buffer.set($state$$[61]);
  this.dac_mask = void 0 === $state$$[62] ? 255 : $state$$[62];
  this.bus.send("screen-set-mode", this.graphical_mode);
  this.graphical_mode ? (this.screen_height = this.screen_width = 0, this.svga_enabled ? (this.set_size_graphical(this.svga_width, this.svga_height, this.svga_bpp, this.svga_width, this.svga_height), this.update_layers()) : (this.update_vga_size(), this.update_layers(), this.complete_replot())) : (this.set_size_text(this.max_cols, this.max_rows), this.update_cursor_scanline(), this.update_cursor());
  this.complete_redraw();
};
VGAScreen.prototype.vga_memory_read = function($addr$$) {
  if (this.svga_enabled && this.graphical_mode_is_linear) {
    return this.cpu.read8(($addr$$ - 655360 | this.svga_bank_offset) + VGA_LFB_ADDRESS | 0);
  }
  var $memory_space_select_plane_reading$$ = this.miscellaneous_graphics_register >> 2 & 3;
  $addr$$ -= VGA_HOST_MEMORY_SPACE_START[$memory_space_select_plane_reading$$];
  if (0 > $addr$$ || $addr$$ >= VGA_HOST_MEMORY_SPACE_SIZE[$memory_space_select_plane_reading$$]) {
    return dbg_log("vga read outside memory space: addr:" + h($addr$$), LOG_VGA), 0;
  }
  this.latch_dword = this.plane0[$addr$$];
  this.latch_dword |= this.plane1[$addr$$] << 8;
  this.latch_dword |= this.plane2[$addr$$] << 16;
  this.latch_dword |= this.plane3[$addr$$] << 24;
  if (this.planar_mode & 8) {
    return $memory_space_select_plane_reading$$ = 255, this.color_dont_care & 1 && ($memory_space_select_plane_reading$$ &= this.plane0[$addr$$] ^ ~(this.color_compare & 1 ? 255 : 0)), this.color_dont_care & 2 && ($memory_space_select_plane_reading$$ &= this.plane1[$addr$$] ^ ~(this.color_compare & 2 ? 255 : 0)), this.color_dont_care & 4 && ($memory_space_select_plane_reading$$ &= this.plane2[$addr$$] ^ ~(this.color_compare & 4 ? 255 : 0)), this.color_dont_care & 8 && ($memory_space_select_plane_reading$$ &= 
    this.plane3[$addr$$] ^ ~(this.color_compare & 8 ? 255 : 0)), $memory_space_select_plane_reading$$;
  }
  $memory_space_select_plane_reading$$ = this.plane_read;
  this.graphical_mode ? this.sequencer_memory_mode & 8 ? ($memory_space_select_plane_reading$$ = $addr$$ & 3, $addr$$ &= -4) : this.planar_mode & 16 && ($memory_space_select_plane_reading$$ = $addr$$ & 1, $addr$$ &= -2) : $memory_space_select_plane_reading$$ = 0;
  return this.vga_memory[$memory_space_select_plane_reading$$ << 16 | $addr$$];
};
VGAScreen.prototype.vga_memory_write = function($addr$$, $value$$) {
  if (this.svga_enabled && this.graphical_mode && this.graphical_mode_is_linear) {
    this.cpu.write8(($addr$$ - 655360 | this.svga_bank_offset) + VGA_LFB_ADDRESS | 0, $value$$);
  } else {
    var $memory_space_select$$ = this.miscellaneous_graphics_register >> 2 & 3;
    $addr$$ -= VGA_HOST_MEMORY_SPACE_START[$memory_space_select$$];
    0 > $addr$$ || $addr$$ >= VGA_HOST_MEMORY_SPACE_SIZE[$memory_space_select$$] ? dbg_log("vga write outside memory space: addr:" + h($addr$$) + ", value:" + h($value$$), LOG_VGA) : this.graphical_mode ? this.vga_memory_write_graphical($addr$$, $value$$) : this.plane_write_bm & 3 && this.vga_memory_write_text_mode($addr$$, $value$$);
  }
};
VGAScreen.prototype.vga_memory_write_graphical = function($addr$$, $plane_select_value$$) {
  var $write_mode$$ = this.planar_mode & 3, $bitmask$$ = this.apply_feed(this.planar_bitmap), $setreset_dword$$ = this.apply_expand(this.planar_setreset), $setreset_enable_dword$$ = this.apply_expand(this.planar_setreset_enable);
  switch($write_mode$$) {
    case 0:
      $plane_select_value$$ = this.apply_rotate($plane_select_value$$);
      var $plane_dword$$ = this.apply_feed($plane_select_value$$);
      $plane_dword$$ = this.apply_setreset($plane_dword$$, $setreset_enable_dword$$);
      $plane_dword$$ = this.apply_logical($plane_dword$$, this.latch_dword);
      $plane_dword$$ = this.apply_bitmask($plane_dword$$, $bitmask$$);
      break;
    case 1:
      $plane_dword$$ = this.latch_dword;
      break;
    case 2:
      $plane_dword$$ = this.apply_expand($plane_select_value$$);
      $plane_dword$$ = this.apply_logical($plane_dword$$, this.latch_dword);
      $plane_dword$$ = this.apply_bitmask($plane_dword$$, $bitmask$$);
      break;
    case 3:
      $plane_select_value$$ = this.apply_rotate($plane_select_value$$), $bitmask$$ &= this.apply_feed($plane_select_value$$), $plane_dword$$ = this.apply_bitmask($setreset_dword$$, $bitmask$$);
  }
  $plane_select_value$$ = 15;
  switch(this.sequencer_memory_mode & 12) {
    case 0:
      $plane_select_value$$ = 5 << ($addr$$ & 1);
      $addr$$ &= -2;
      break;
    case 8:
    case 12:
      $plane_select_value$$ = 1 << ($addr$$ & 3), $addr$$ &= -4;
  }
  $plane_select_value$$ &= this.plane_write_bm;
  $plane_select_value$$ & 1 && (this.plane0[$addr$$] = $plane_dword$$ >> 0 & 255);
  $plane_select_value$$ & 2 && (this.plane1[$addr$$] = $plane_dword$$ >> 8 & 255);
  $plane_select_value$$ & 4 && (this.plane2[$addr$$] = $plane_dword$$ >> 16 & 255);
  $plane_select_value$$ & 8 && (this.plane3[$addr$$] = $plane_dword$$ >> 24 & 255);
  $addr$$ = this.vga_addr_to_pixel($addr$$);
  this.partial_replot($addr$$, $addr$$ + 7);
};
VGAScreen.prototype.apply_feed = function($data_byte$$) {
  return $data_byte$$ | $data_byte$$ << 8 | $data_byte$$ << 16 | $data_byte$$ << 24;
};
VGAScreen.prototype.apply_expand = function($data_byte$$) {
  return ($data_byte$$ & 1 ? 255 : 0) | ($data_byte$$ & 2 ? 255 : 0) << 8 | ($data_byte$$ & 4 ? 255 : 0) << 16 | ($data_byte$$ & 8 ? 255 : 0) << 24;
};
VGAScreen.prototype.apply_rotate = function($data_byte$$) {
  return ($data_byte$$ | $data_byte$$ << 8) >>> (this.planar_rotate_reg & 7) & 255;
};
VGAScreen.prototype.apply_setreset = function($data_dword$$, $enable_dword$$) {
  var $setreset_dword$$ = this.apply_expand(this.planar_setreset);
  return ($data_dword$$ | $enable_dword$$ & $setreset_dword$$) & (~$enable_dword$$ | $setreset_dword$$);
};
VGAScreen.prototype.apply_logical = function($data_dword$$, $latch_dword$$) {
  switch(this.planar_rotate_reg & 24) {
    case 8:
      return $data_dword$$ & $latch_dword$$;
    case 16:
      return $data_dword$$ | $latch_dword$$;
    case 24:
      return $data_dword$$ ^ $latch_dword$$;
  }
  return $data_dword$$;
};
VGAScreen.prototype.apply_bitmask = function($data_dword$$, $bitmask_dword$$) {
  return $bitmask_dword$$ & $data_dword$$ | ~$bitmask_dword$$ & this.latch_dword;
};
VGAScreen.prototype.text_mode_redraw = function() {
  for (var $addr$$ = this.start_address << 1, $chr$$, $color$$, $row$$ = 0; $row$$ < this.max_rows; $row$$++) {
    for (var $col$$ = 0; $col$$ < this.max_cols; $col$$++) {
      $chr$$ = this.vga_memory[$addr$$], $color$$ = this.vga_memory[$addr$$ | 1], this.bus.send("screen-put-char", [$row$$, $col$$, $chr$$, this.vga256_palette[this.dac_mask & this.dac_map[$color$$ >> 4 & 15]], this.vga256_palette[this.dac_mask & this.dac_map[$color$$ & 15]]]), $addr$$ += 2;
    }
  }
};
VGAScreen.prototype.vga_memory_write_text_mode = function($addr$$, $value$$) {
  var $col$$ = ($addr$$ >> 1) - this.start_address, $row$$ = $col$$ / this.max_cols | 0;
  $col$$ %= this.max_cols;
  if ($addr$$ & 1) {
    var $color$$ = $value$$;
    var $chr$$ = this.vga_memory[$addr$$ & -2];
  } else {
    $chr$$ = $value$$, $color$$ = this.vga_memory[$addr$$ | 1];
  }
  this.bus.send("screen-put-char", [$row$$, $col$$, $chr$$, this.vga256_palette[this.dac_mask & this.dac_map[$color$$ >> 4 & 15]], this.vga256_palette[this.dac_mask & this.dac_map[$color$$ & 15]]]);
  this.vga_memory[$addr$$] = $value$$;
};
VGAScreen.prototype.update_cursor = function() {
  var $row$$ = (this.cursor_address - this.start_address) / this.max_cols | 0, $col$$ = (this.cursor_address - this.start_address) % this.max_cols;
  $row$$ = Math.min(this.max_rows - 1, $row$$);
  this.bus.send("screen-update-cursor", [$row$$, $col$$]);
};
VGAScreen.prototype.complete_redraw = function() {
  dbg_log("complete redraw", LOG_VGA);
  this.graphical_mode ? this.svga_enabled ? this.cpu.svga_mark_dirty() : (this.diff_addr_min = 0, this.diff_addr_max = VGA_PIXEL_BUFFER_SIZE) : this.text_mode_redraw();
};
VGAScreen.prototype.complete_replot = function() {
  dbg_log("complete replot", LOG_VGA);
  this.graphical_mode && !this.svga_enabled && (this.diff_plot_min = 0, this.diff_plot_max = VGA_PIXEL_BUFFER_SIZE, this.complete_redraw());
};
VGAScreen.prototype.partial_redraw = function($min$$, $max$$) {
  $min$$ < this.diff_addr_min && (this.diff_addr_min = $min$$);
  $max$$ > this.diff_addr_max && (this.diff_addr_max = $max$$);
};
VGAScreen.prototype.partial_replot = function($min$$, $max$$) {
  $min$$ < this.diff_plot_min && (this.diff_plot_min = $min$$);
  $max$$ > this.diff_plot_max && (this.diff_plot_max = $max$$);
  this.partial_redraw($min$$, $max$$);
};
VGAScreen.prototype.reset_diffs = function() {
  this.diff_addr_min = this.vga_memory_size;
  this.diff_addr_max = 0;
  this.diff_plot_min = this.vga_memory_size;
  this.diff_plot_max = 0;
};
VGAScreen.prototype.destroy = function() {
};
VGAScreen.prototype.vga_bytes_per_line = function() {
  var $bytes_per_line$$ = this.offset_register << 2;
  this.underline_location_register & 64 ? $bytes_per_line$$ <<= 1 : this.crtc_mode & 64 && ($bytes_per_line$$ >>>= 1);
  return $bytes_per_line$$;
};
VGAScreen.prototype.vga_addr_shift_count = function() {
  var $shift_count$$ = 128 + (~this.underline_location_register & this.crtc_mode & 64);
  $shift_count$$ -= this.underline_location_register & 64;
  $shift_count$$ -= this.attribute_mode & 64;
  return $shift_count$$ >>> 6;
};
VGAScreen.prototype.vga_addr_to_pixel = function($addr$$) {
  var $shift_count$$ = this.vga_addr_shift_count();
  if (~this.crtc_mode & 3) {
    var $col$jscomp$5_pixel_addr$$ = $addr$$ - this.start_address;
    $col$jscomp$5_pixel_addr$$ &= this.crtc_mode << 13 | -24577;
    $col$jscomp$5_pixel_addr$$ <<= $shift_count$$;
    var $row$$ = $col$jscomp$5_pixel_addr$$ / this.virtual_width | 0;
    $col$jscomp$5_pixel_addr$$ %= this.virtual_width;
    switch(this.crtc_mode & 3) {
      case 2:
        $row$$ = $row$$ << 1 | $addr$$ >> 13 & 1;
        break;
      case 1:
        $row$$ = $row$$ << 1 | $addr$$ >> 14 & 1;
        break;
      case 0:
        $row$$ = $row$$ << 2 | $addr$$ >> 13 & 3;
    }
    return $row$$ * this.virtual_width + $col$jscomp$5_pixel_addr$$ + (this.start_address << $shift_count$$);
  }
  return $addr$$ << $shift_count$$;
};
VGAScreen.prototype.scan_line_to_screen_row = function($scan_line$$) {
  this.max_scan_line & 128 && ($scan_line$$ >>>= 1);
  $scan_line$$ = Math.ceil($scan_line$$ / (1 + (this.max_scan_line & 31)));
  this.crtc_mode & 1 || ($scan_line$$ <<= 1);
  this.crtc_mode & 2 || ($scan_line$$ <<= 1);
  return $scan_line$$;
};
VGAScreen.prototype.set_size_text = function($cols_count$$, $rows_count$$) {
  this.max_cols = $cols_count$$;
  this.max_rows = $rows_count$$;
  this.bus.send("screen-set-size-text", [$cols_count$$, $rows_count$$]);
};
VGAScreen.prototype.set_size_graphical = function($width$$, $height$$, $bpp$$, $virtual_width$$, $virtual_height$$) {
  if (!this.stats.is_graphical || this.stats.bpp !== $bpp$$ || this.screen_width !== $width$$ || this.screen_height !== $height$$ || this.virtual_width !== $virtual_width$$ || this.virtual_height !== $virtual_height$$) {
    this.screen_width = $width$$;
    this.screen_height = $height$$;
    this.virtual_width = $virtual_width$$;
    this.virtual_height = $virtual_height$$;
    this.stats.bpp = $bpp$$;
    this.stats.is_graphical = !0;
    this.stats.res_x = $width$$;
    this.stats.res_y = $height$$;
    if ("undefined" !== typeof ImageData) {
      const $size$$ = $virtual_width$$ * $virtual_height$$, $offset$$ = this.cpu.svga_allocate_dest_buffer($size$$) >>> 0;
      this.dest_buffet_offset = $offset$$;
      this.image_data = new ImageData(new Uint8ClampedArray(this.cpu.wasm_memory.buffer, $offset$$, 4 * $size$$), $virtual_width$$, $virtual_height$$);
      this.cpu.svga_mark_dirty();
    }
    this.bus.send("screen-set-size-graphical", [$width$$, $height$$, $virtual_width$$, $virtual_height$$, $bpp$$]);
  }
};
VGAScreen.prototype.update_vga_size = function() {
  if (!this.svga_enabled) {
    var $horizontal_characters_screen_width$$ = Math.min(1 + this.horizontal_display_enable_end, this.horizontal_blank_start), $screen_height_vertical_scans$$ = Math.min(1 + this.vertical_display_enable_end, this.vertical_blank_start);
    if ($horizontal_characters_screen_width$$ && $screen_height_vertical_scans$$) {
      if (this.graphical_mode) {
        $horizontal_characters_screen_width$$ <<= 3;
        var $height$jscomp$27_virtual_width$$ = this.offset_register << 4;
        this.attribute_mode & 64 && ($horizontal_characters_screen_width$$ >>>= 1, $height$jscomp$27_virtual_width$$ >>>= 1);
        $screen_height_vertical_scans$$ = this.scan_line_to_screen_row($screen_height_vertical_scans$$);
        var $virtual_height$$ = Math.ceil(VGA_HOST_MEMORY_SPACE_SIZE[0] / this.vga_bytes_per_line());
        this.set_size_graphical($horizontal_characters_screen_width$$, $screen_height_vertical_scans$$, 8, $height$jscomp$27_virtual_width$$, $virtual_height$$);
        this.update_vertical_retrace();
        this.update_layers();
      } else {
        this.max_scan_line & 128 && ($screen_height_vertical_scans$$ >>>= 1), $height$jscomp$27_virtual_width$$ = $screen_height_vertical_scans$$ / (1 + (this.max_scan_line & 31)) | 0, $horizontal_characters_screen_width$$ && $height$jscomp$27_virtual_width$$ && this.set_size_text($horizontal_characters_screen_width$$, $height$jscomp$27_virtual_width$$);
      }
    }
  }
};
VGAScreen.prototype.update_layers = function() {
  this.graphical_mode || this.text_mode_redraw();
  if (this.svga_enabled) {
    this.layers = [];
  } else {
    if (this.virtual_width && this.screen_width) {
      if (!this.palette_source || this.clocking_mode & 32) {
        this.layers = [], this.bus.send("screen-clear");
      } else {
        var $start_addr_start_buffer_row_start_split_col$$ = this.start_address_latched, $pixel_panning$$ = this.horizontal_panning;
        this.attribute_mode & 64 && ($pixel_panning$$ >>>= 1);
        var $byte_panning$$ = this.preset_row_scan >> 5 & 3, $pixel_addr_start_split_screen_row$$ = this.vga_addr_to_pixel($start_addr_start_buffer_row_start_split_col$$ + $byte_panning$$);
        $start_addr_start_buffer_row_start_split_col$$ = $pixel_addr_start_split_screen_row$$ / this.virtual_width | 0;
        var $start_buffer_col_x$$ = $pixel_addr_start_split_screen_row$$ % this.virtual_width + $pixel_panning$$;
        $pixel_addr_start_split_screen_row$$ = this.scan_line_to_screen_row(1 + this.line_compare);
        $pixel_addr_start_split_screen_row$$ = Math.min($pixel_addr_start_split_screen_row$$, this.screen_height);
        var $split_buffer_height$$ = this.screen_height - $pixel_addr_start_split_screen_row$$;
        this.layers = [];
        $start_buffer_col_x$$ = -$start_buffer_col_x$$;
        for (var $y$$ = 0; $start_buffer_col_x$$ < this.screen_width; $start_buffer_col_x$$ += this.virtual_width, $y$$++) {
          this.layers.push({image_data:this.image_data, screen_x:$start_buffer_col_x$$, screen_y:0, buffer_x:0, buffer_y:$start_addr_start_buffer_row_start_split_col$$ + $y$$, buffer_width:this.virtual_width, buffer_height:$pixel_addr_start_split_screen_row$$, });
        }
        $start_addr_start_buffer_row_start_split_col$$ = 0;
        this.attribute_mode & 32 || ($start_addr_start_buffer_row_start_split_col$$ = this.vga_addr_to_pixel($byte_panning$$) + $pixel_panning$$);
        $start_buffer_col_x$$ = -$start_addr_start_buffer_row_start_split_col$$;
        for ($y$$ = 0; $start_buffer_col_x$$ < this.screen_width; $start_buffer_col_x$$ += this.virtual_width, $y$$++) {
          this.layers.push({image_data:this.image_data, screen_x:$start_buffer_col_x$$, screen_y:$pixel_addr_start_split_screen_row$$, buffer_x:0, buffer_y:$y$$, buffer_width:this.virtual_width, buffer_height:$split_buffer_height$$, });
        }
      }
    }
  }
};
VGAScreen.prototype.update_vertical_retrace = function() {
  this.port_3DA_value |= 8;
  this.start_address_latched !== this.start_address && (this.start_address_latched = this.start_address, this.update_layers());
};
VGAScreen.prototype.update_cursor_scanline = function() {
  this.bus.send("screen-update-cursor-scanline", [this.cursor_scanline_start, this.cursor_scanline_end]);
};
VGAScreen.prototype.port3C0_write = function($value$$) {
  if (-1 === this.attribute_controller_index) {
    dbg_log("attribute controller index register: " + h($value$$), LOG_VGA), this.attribute_controller_index = $value$$ & 31, dbg_log("attribute actual index: " + h(this.attribute_controller_index), LOG_VGA), this.palette_source !== ($value$$ & 32) && (this.palette_source = $value$$ & 32, this.update_layers());
  } else {
    if (16 > this.attribute_controller_index) {
      dbg_log("internal palette: " + h(this.attribute_controller_index) + " -> " + h($value$$), LOG_VGA), this.dac_map[this.attribute_controller_index] = $value$$, this.attribute_mode & 64 || this.complete_redraw();
    } else {
      switch(this.attribute_controller_index) {
        case 16:
          dbg_log("3C0 / attribute mode control: " + h($value$$), LOG_VGA);
          if (this.attribute_mode !== $value$$) {
            var $previous_mode$$ = this.attribute_mode;
            this.attribute_mode = $value$$;
            var $is_graphical$$ = 0 < ($value$$ & 1);
            this.svga_enabled || this.graphical_mode === $is_graphical$$ || (this.graphical_mode = $is_graphical$$, this.bus.send("screen-set-mode", this.graphical_mode));
            ($previous_mode$$ ^ $value$$) & 64 && this.complete_replot();
            this.update_vga_size();
            this.complete_redraw();
          }
          break;
        case 18:
          dbg_log("3C0 / color plane enable: " + h($value$$), LOG_VGA);
          this.color_plane_enable !== $value$$ && (this.color_plane_enable = $value$$, this.complete_redraw());
          break;
        case 19:
          dbg_log("3C0 / horizontal panning: " + h($value$$), LOG_VGA);
          this.horizontal_panning !== $value$$ && (this.horizontal_panning = $value$$ & 15, this.update_layers());
          break;
        case 20:
          dbg_log("3C0 / color select: " + h($value$$), LOG_VGA);
          this.color_select !== $value$$ && (this.color_select = $value$$, this.complete_redraw());
          break;
        default:
          dbg_log("3C0 / attribute controller write " + h(this.attribute_controller_index) + ": " + h($value$$), LOG_VGA);
      }
    }
    this.attribute_controller_index = -1;
  }
};
VGAScreen.prototype.port3C0_read = function() {
  dbg_log("3C0 read", LOG_VGA);
  return this.attribute_controller_index | this.palette_source;
};
VGAScreen.prototype.port3C0_read16 = function() {
  dbg_log("3C0 read16", LOG_VGA);
  return this.port3C0_read() & 255 | this.port3C1_read() << 8 & 65280;
};
VGAScreen.prototype.port3C1_read = function() {
  if (16 > this.attribute_controller_index) {
    return dbg_log("3C1 / internal palette read: " + h(this.attribute_controller_index) + " -> " + h(this.dac_map[this.attribute_controller_index]), LOG_VGA), this.dac_map[this.attribute_controller_index] & 255;
  }
  switch(this.attribute_controller_index) {
    case 16:
      return dbg_log("3C1 / attribute mode read: " + h(this.attribute_mode), LOG_VGA), this.attribute_mode;
    case 18:
      return dbg_log("3C1 / color plane enable read: " + h(this.color_plane_enable), LOG_VGA), this.color_plane_enable;
    case 19:
      return dbg_log("3C1 / horizontal panning read: " + h(this.horizontal_panning), LOG_VGA), this.horizontal_panning;
    case 20:
      return dbg_log("3C1 / color select read: " + h(this.color_select), LOG_VGA), this.color_select;
    default:
      dbg_log("3C1 / attribute controller read " + h(this.attribute_controller_index), LOG_VGA);
  }
  return 255;
};
VGAScreen.prototype.port3C2_write = function($value$$) {
  dbg_log("3C2 / miscellaneous output register = " + h($value$$), LOG_VGA);
  this.miscellaneous_output_register = $value$$;
};
VGAScreen.prototype.port3C4_write = function($value$$) {
  this.sequencer_index = $value$$;
};
VGAScreen.prototype.port3C4_read = function() {
  return this.sequencer_index;
};
VGAScreen.prototype.port3C5_write = function($value$$) {
  switch(this.sequencer_index) {
    case 1:
      dbg_log("clocking mode: " + h($value$$), LOG_VGA);
      var $previous_clocking_mode$$ = this.clocking_mode;
      this.clocking_mode = $value$$;
      ($previous_clocking_mode$$ ^ $value$$) & 32 && this.update_layers();
      break;
    case 2:
      dbg_log("plane write mask: " + h($value$$), LOG_VGA);
      this.plane_write_bm = $value$$;
      break;
    case 4:
      dbg_log("sequencer memory mode: " + h($value$$), LOG_VGA);
      this.sequencer_memory_mode = $value$$;
      break;
    default:
      dbg_log("3C5 / sequencer write " + h(this.sequencer_index) + ": " + h($value$$), LOG_VGA);
  }
};
VGAScreen.prototype.port3C5_read = function() {
  dbg_log("3C5 / sequencer read " + h(this.sequencer_index), LOG_VGA);
  switch(this.sequencer_index) {
    case 1:
      return this.clocking_mode;
    case 2:
      return this.plane_write_bm;
    case 4:
      return this.sequencer_memory_mode;
    case 6:
      return 18;
  }
  return 0;
};
VGAScreen.prototype.port3C6_write = function($data$$) {
  this.dac_mask = $data$$;
};
VGAScreen.prototype.port3C6_read = function() {
  return this.dac_mask;
};
VGAScreen.prototype.port3C7_write = function($index$$) {
  dbg_log("3C7 write: " + h($index$$), LOG_VGA);
  this.dac_color_index_read = 3 * $index$$;
  this.dac_state &= 0;
};
VGAScreen.prototype.port3C7_read = function() {
  return this.dac_state;
};
VGAScreen.prototype.port3C8_write = function($index$$) {
  this.dac_color_index_write = 3 * $index$$;
  this.dac_state |= 3;
};
VGAScreen.prototype.port3C8_read = function() {
  return this.dac_color_index_write / 3 & 255;
};
VGAScreen.prototype.port3C9_write = function($color_byte$$) {
  var $index$$ = this.dac_color_index_write / 3 | 0, $offset$$ = this.dac_color_index_write % 3, $color$$ = this.vga256_palette[$index$$];
  if (0 === (this.dispi_enable_value & 32)) {
    $color_byte$$ &= 63;
    const $b$$ = $color_byte$$ & 1;
    $color_byte$$ = $color_byte$$ << 2 | $b$$ << 1 | $b$$;
  }
  0 === $offset$$ ? $color$$ = $color$$ & -16711681 | $color_byte$$ << 16 : 1 === $offset$$ ? $color$$ = $color$$ & -65281 | $color_byte$$ << 8 : ($color$$ = $color$$ & -256 | $color_byte$$, dbg_log("dac set color, index=" + h($index$$) + " value=" + h($color$$), LOG_VGA));
  this.vga256_palette[$index$$] !== $color$$ && (this.vga256_palette[$index$$] = $color$$, this.complete_redraw());
  this.dac_color_index_write++;
};
VGAScreen.prototype.port3C9_read = function() {
  dbg_log("3C9 read", LOG_VGA);
  var $color8$$ = this.vga256_palette[this.dac_color_index_read / 3 | 0] >> 8 * (2 - this.dac_color_index_read % 3) & 255;
  this.dac_color_index_read++;
  return this.dispi_enable_value & 32 ? $color8$$ : $color8$$ >> 2;
};
VGAScreen.prototype.port3CC_read = function() {
  dbg_log("3CC read", LOG_VGA);
  return this.miscellaneous_output_register;
};
VGAScreen.prototype.port3CE_write = function($value$$) {
  this.graphics_index = $value$$;
};
VGAScreen.prototype.port3CE_read = function() {
  return this.graphics_index;
};
VGAScreen.prototype.port3CF_write = function($value$$) {
  switch(this.graphics_index) {
    case 0:
      this.planar_setreset = $value$$;
      dbg_log("plane set/reset: " + h($value$$), LOG_VGA);
      break;
    case 1:
      this.planar_setreset_enable = $value$$;
      dbg_log("plane set/reset enable: " + h($value$$), LOG_VGA);
      break;
    case 2:
      this.color_compare = $value$$;
      dbg_log("color compare: " + h($value$$), LOG_VGA);
      break;
    case 3:
      this.planar_rotate_reg = $value$$;
      dbg_log("plane rotate: " + h($value$$), LOG_VGA);
      break;
    case 4:
      this.plane_read = $value$$;
      dbg_log("plane read: " + h($value$$), LOG_VGA);
      break;
    case 5:
      var $previous_planar_mode$$ = this.planar_mode;
      this.planar_mode = $value$$;
      dbg_log("planar mode: " + h($value$$), LOG_VGA);
      ($previous_planar_mode$$ ^ $value$$) & 96 && this.complete_replot();
      break;
    case 6:
      dbg_log("miscellaneous graphics register: " + h($value$$), LOG_VGA);
      this.miscellaneous_graphics_register !== $value$$ && (this.miscellaneous_graphics_register = $value$$, this.update_vga_size());
      break;
    case 7:
      this.color_dont_care = $value$$;
      dbg_log("color don't care: " + h($value$$), LOG_VGA);
      break;
    case 8:
      this.planar_bitmap = $value$$;
      dbg_log("planar bitmap: " + h($value$$), LOG_VGA);
      break;
    default:
      dbg_log("3CF / graphics write " + h(this.graphics_index) + ": " + h($value$$), LOG_VGA);
  }
};
VGAScreen.prototype.port3CF_read = function() {
  dbg_log("3CF / graphics read " + h(this.graphics_index), LOG_VGA);
  switch(this.graphics_index) {
    case 0:
      return this.planar_setreset;
    case 1:
      return this.planar_setreset_enable;
    case 2:
      return this.color_compare;
    case 3:
      return this.planar_rotate_reg;
    case 4:
      return this.plane_read;
    case 5:
      return this.planar_mode;
    case 6:
      return this.miscellaneous_graphics_register;
    case 7:
      return this.color_dont_care;
    case 8:
      return this.planar_bitmap;
  }
  return 0;
};
VGAScreen.prototype.port3D4_write = function($register$$) {
  dbg_log("3D4 / crtc index: " + $register$$, LOG_VGA);
  this.index_crtc = $register$$;
};
VGAScreen.prototype.port3D4_read = function() {
  dbg_log("3D4 read / crtc index: " + this.index_crtc, LOG_VGA);
  return this.index_crtc;
};
VGAScreen.prototype.port3D5_write = function($value$$) {
  switch(this.index_crtc) {
    case 1:
      dbg_log("3D5 / hdisp enable end write: " + h($value$$), LOG_VGA);
      this.horizontal_display_enable_end !== $value$$ && (this.horizontal_display_enable_end = $value$$, this.update_vga_size());
      break;
    case 2:
      this.horizontal_blank_start !== $value$$ && (this.horizontal_blank_start = $value$$, this.update_vga_size());
      break;
    case 7:
      dbg_log("3D5 / overflow register write: " + h($value$$), LOG_VGA);
      var $previous_mode$$ = this.vertical_display_enable_end;
      this.vertical_display_enable_end &= 255;
      this.vertical_display_enable_end = this.vertical_display_enable_end | $value$$ << 3 & 512 | $value$$ << 7 & 256;
      $previous_mode$$ != this.vertical_display_enable_end && this.update_vga_size();
      this.line_compare = this.line_compare & 767 | $value$$ << 4 & 256;
      $previous_mode$$ = this.vertical_blank_start;
      this.vertical_blank_start = this.vertical_blank_start & 767 | $value$$ << 5 & 256;
      $previous_mode$$ !== this.vertical_blank_start && this.update_vga_size();
      this.update_layers();
      break;
    case 8:
      dbg_log("3D5 / preset row scan write: " + h($value$$), LOG_VGA);
      this.preset_row_scan = $value$$;
      this.update_layers();
      break;
    case 9:
      dbg_log("3D5 / max scan line write: " + h($value$$), LOG_VGA);
      this.max_scan_line = $value$$;
      this.line_compare = this.line_compare & 511 | $value$$ << 3 & 512;
      $previous_mode$$ = this.vertical_blank_start;
      this.vertical_blank_start = this.vertical_blank_start & 511 | $value$$ << 4 & 512;
      $previous_mode$$ !== this.vertical_blank_start && this.update_vga_size();
      this.update_layers();
      break;
    case 10:
      dbg_log("3D5 / cursor scanline start write: " + h($value$$), LOG_VGA);
      this.cursor_scanline_start = $value$$;
      this.update_cursor_scanline();
      break;
    case 11:
      dbg_log("3D5 / cursor scanline end write: " + h($value$$), LOG_VGA);
      this.cursor_scanline_end = $value$$;
      this.update_cursor_scanline();
      break;
    case 12:
      (this.start_address >> 8 & 255) !== $value$$ && (this.start_address = this.start_address & 255 | $value$$ << 8, this.update_layers(), ~this.crtc_mode & 3 && this.complete_replot());
      dbg_log("3D5 / start addr hi write: " + h($value$$) + " -> " + h(this.start_address, 4), LOG_VGA);
      break;
    case 13:
      (this.start_address & 255) !== $value$$ && (this.start_address = this.start_address & 65280 | $value$$, this.update_layers(), ~this.crtc_mode & 3 && this.complete_replot());
      dbg_log("3D5 / start addr lo write: " + h($value$$) + " -> " + h(this.start_address, 4), LOG_VGA);
      break;
    case 14:
      dbg_log("3D5 / cursor address hi write: " + h($value$$), LOG_VGA);
      this.cursor_address = this.cursor_address & 255 | $value$$ << 8;
      this.update_cursor();
      break;
    case 15:
      dbg_log("3D5 / cursor address lo write: " + h($value$$), LOG_VGA);
      this.cursor_address = this.cursor_address & 65280 | $value$$;
      this.update_cursor();
      break;
    case 18:
      dbg_log("3D5 / vdisp enable end write: " + h($value$$), LOG_VGA);
      (this.vertical_display_enable_end & 255) !== $value$$ && (this.vertical_display_enable_end = this.vertical_display_enable_end & 768 | $value$$, this.update_vga_size());
      break;
    case 19:
      dbg_log("3D5 / offset register write: " + h($value$$), LOG_VGA);
      this.offset_register !== $value$$ && (this.offset_register = $value$$, this.update_vga_size(), ~this.crtc_mode & 3 && this.complete_replot());
      break;
    case 20:
      dbg_log("3D5 / underline location write: " + h($value$$), LOG_VGA);
      this.underline_location_register !== $value$$ && ($previous_mode$$ = this.underline_location_register, this.underline_location_register = $value$$, this.update_vga_size(), ($previous_mode$$ ^ $value$$) & 64 && this.complete_replot());
      break;
    case 21:
      dbg_log("3D5 / vertical blank start write: " + h($value$$), LOG_VGA);
      (this.vertical_blank_start & 255) !== $value$$ && (this.vertical_blank_start = this.vertical_blank_start & 768 | $value$$, this.update_vga_size());
      break;
    case 23:
      dbg_log("3D5 / crtc mode write: " + h($value$$), LOG_VGA);
      this.crtc_mode !== $value$$ && ($previous_mode$$ = this.crtc_mode, this.crtc_mode = $value$$, this.update_vga_size(), ($previous_mode$$ ^ $value$$) & 67 && this.complete_replot());
      break;
    case 24:
      dbg_log("3D5 / line compare write: " + h($value$$), LOG_VGA);
      this.line_compare = this.line_compare & 768 | $value$$;
      this.update_layers();
      break;
    default:
      this.index_crtc < this.crtc.length && (this.crtc[this.index_crtc] = $value$$), dbg_log("3D5 / CRTC write " + h(this.index_crtc) + ": " + h($value$$), LOG_VGA);
  }
};
VGAScreen.prototype.port3D5_read = function() {
  dbg_log("3D5 read " + h(this.index_crtc), LOG_VGA);
  switch(this.index_crtc) {
    case 1:
      return this.horizontal_display_enable_end;
    case 2:
      return this.horizontal_blank_start;
    case 7:
      return this.vertical_display_enable_end >> 7 & 2 | this.vertical_blank_start >> 5 & 8 | this.line_compare >> 4 & 16 | this.vertical_display_enable_end >> 3 & 64;
    case 8:
      return this.preset_row_scan;
    case 9:
      return this.max_scan_line;
    case 10:
      return this.cursor_scanline_start;
    case 11:
      return this.cursor_scanline_end;
    case 12:
      return this.start_address & 255;
    case 13:
      return this.start_address >> 8;
    case 14:
      return this.cursor_address >> 8;
    case 15:
      return this.cursor_address & 255;
    case 18:
      return this.vertical_display_enable_end & 255;
    case 19:
      return this.offset_register;
    case 20:
      return this.underline_location_register;
    case 21:
      return this.vertical_blank_start & 255;
    case 23:
      return this.crtc_mode;
    case 24:
      return this.line_compare & 255;
  }
  return this.index_crtc < this.crtc.length ? this.crtc[this.index_crtc] : 0;
};
VGAScreen.prototype.port3DA_read = function() {
  dbg_log("3DA read - status 1 and clear attr index", LOG_VGA);
  var $value$$ = this.port_3DA_value;
  this.graphical_mode ? (this.port_3DA_value ^= 1, this.port_3DA_value &= 1) : (this.port_3DA_value & 1 && (this.port_3DA_value ^= 8), this.port_3DA_value ^= 1);
  this.attribute_controller_index = -1;
  return $value$$;
};
VGAScreen.prototype.port1CE_write = function($value$$) {
  this.dispi_index = $value$$;
};
VGAScreen.prototype.port1CF_write = function($value$$) {
  dbg_log("1CF / dispi write " + h(this.dispi_index) + ": " + h($value$$), LOG_VGA);
  switch(this.dispi_index) {
    case 0:
      45248 <= $value$$ && 45253 >= $value$$ ? this.svga_version = $value$$ : dbg_log("Invalid version value: " + h($value$$), LOG_VGA);
      break;
    case 1:
      this.svga_width = $value$$;
      this.svga_width > MAX_XRES && (dbg_log("svga_width reduced from " + this.svga_width + " to " + MAX_XRES, LOG_VGA), this.svga_width = MAX_XRES);
      break;
    case 2:
      this.svga_height = $value$$;
      this.svga_height > MAX_YRES && (dbg_log("svga_height reduced from " + this.svga_height + " to " + MAX_YRES, LOG_VGA), this.svga_height = MAX_YRES);
      break;
    case 3:
      this.svga_bpp = $value$$;
      break;
    case 4:
      this.svga_enabled = 1 === ($value$$ & 1);
      this.dispi_enable_value = $value$$;
      break;
    case 5:
      dbg_log("SVGA bank offset: " + h($value$$ << 16), LOG_VGA);
      this.svga_bank_offset = $value$$ << 16;
      break;
    case 9:
      const $offset$$ = $value$$ * this.svga_width;
      dbg_log("SVGA offset: " + h($offset$$) + " y=" + h($value$$), LOG_VGA);
      this.svga_offset !== $offset$$ && (this.svga_offset = $offset$$, this.complete_redraw());
  }
  !this.svga_enabled || this.svga_width && this.svga_height || (dbg_log("SVGA: disabled because of invalid width/height: " + this.svga_width + "x" + this.svga_height, LOG_VGA), this.svga_enabled = !1);
  dbg_assert(4 !== this.svga_bpp, "unimplemented svga bpp: 4");
  dbg_assert(4 === this.svga_bpp || 8 === this.svga_bpp || 15 === this.svga_bpp || 16 === this.svga_bpp || 24 === this.svga_bpp || 32 === this.svga_bpp, "unexpected svga bpp: " + this.svga_bpp);
  dbg_log("SVGA: enabled=" + this.svga_enabled + ", " + this.svga_width + "x" + this.svga_height + "x" + this.svga_bpp, LOG_VGA);
  this.svga_enabled && 4 === this.dispi_index && (this.set_size_graphical(this.svga_width, this.svga_height, this.svga_bpp, this.svga_width, this.svga_height), this.bus.send("screen-set-mode", !0), this.graphical_mode_is_linear = this.graphical_mode = !0);
  this.svga_enabled || (this.svga_bank_offset = 0);
  this.update_layers();
};
VGAScreen.prototype.port1CF_read = function() {
  dbg_log("1CF / dispi read " + h(this.dispi_index), LOG_VGA);
  return this.svga_register_read(this.dispi_index);
};
VGAScreen.prototype.svga_register_read = function($n$$) {
  switch($n$$) {
    case 0:
      return this.svga_version;
    case 1:
      return this.dispi_enable_value & 2 ? MAX_XRES : this.svga_width;
    case 2:
      return this.dispi_enable_value & 2 ? MAX_YRES : this.svga_height;
    case 3:
      return this.dispi_enable_value & 2 ? MAX_BPP : this.svga_bpp;
    case 4:
      return this.dispi_enable_value;
    case 5:
      return this.svga_bank_offset >>> 16;
    case 6:
      return this.screen_width ? this.screen_width : 1;
    case 8:
      return 0;
    case 10:
      return this.vga_memory_size / VGA_BANK_SIZE | 0;
  }
  return 255;
};
VGAScreen.prototype.vga_replot = function() {
  for (var $pixel_addr$jscomp$2_start$$ = this.diff_plot_min & -16, $end$$ = Math.min(this.diff_plot_max | 15, VGA_PIXEL_BUFFER_SIZE - 1), $addr_shift$$ = this.vga_addr_shift_count(), $addr_substitution$$ = ~this.crtc_mode & 3, $shift_mode$$ = this.planar_mode & 96, $pel_width$$ = this.attribute_mode & 64; $pixel_addr$jscomp$2_start$$ <= $end$$;) {
    var $addr$$ = $pixel_addr$jscomp$2_start$$ >>> $addr_shift$$;
    if ($addr_substitution$$) {
      var $byte0_j$jscomp$4_row$$ = $pixel_addr$jscomp$2_start$$ / this.virtual_width | 0, $byte1_col$$ = $pixel_addr$jscomp$2_start$$ - this.virtual_width * $byte0_j$jscomp$4_row$$;
      switch($addr_substitution$$) {
        case 1:
          $addr$$ = ($byte0_j$jscomp$4_row$$ & 1) << 13;
          $byte0_j$jscomp$4_row$$ >>>= 1;
          break;
        case 2:
          $addr$$ = ($byte0_j$jscomp$4_row$$ & 1) << 14;
          $byte0_j$jscomp$4_row$$ >>>= 1;
          break;
        case 3:
          $addr$$ = ($byte0_j$jscomp$4_row$$ & 3) << 13, $byte0_j$jscomp$4_row$$ >>>= 2;
      }
      $addr$$ |= ($byte0_j$jscomp$4_row$$ * this.virtual_width + $byte1_col$$ >>> $addr_shift$$) + this.start_address;
    }
    $byte0_j$jscomp$4_row$$ = this.plane0[$addr$$];
    $byte1_col$$ = this.plane1[$addr$$];
    var $byte2$$ = this.plane2[$addr$$], $byte3$$ = this.plane3[$addr$$];
    $addr$$ = new Uint8Array(8);
    switch($shift_mode$$) {
      case 0:
        $byte0_j$jscomp$4_row$$ <<= 0;
        $byte1_col$$ <<= 1;
        $byte2$$ <<= 2;
        $byte3$$ <<= 3;
        for (var $i$$ = 7; 0 <= $i$$; $i$$--) {
          $addr$$[7 - $i$$] = $byte0_j$jscomp$4_row$$ >> $i$$ & 1 | $byte1_col$$ >> $i$$ & 2 | $byte2$$ >> $i$$ & 4 | $byte3$$ >> $i$$ & 8;
        }
        break;
      case 32:
        $addr$$[0] = $byte0_j$jscomp$4_row$$ >> 6 & 3 | $byte2$$ >> 4 & 12;
        $addr$$[1] = $byte0_j$jscomp$4_row$$ >> 4 & 3 | $byte2$$ >> 2 & 12;
        $addr$$[2] = $byte0_j$jscomp$4_row$$ >> 2 & 3 | $byte2$$ >> 0 & 12;
        $addr$$[3] = $byte0_j$jscomp$4_row$$ >> 0 & 3 | $byte2$$ << 2 & 12;
        $addr$$[4] = $byte1_col$$ >> 6 & 3 | $byte3$$ >> 4 & 12;
        $addr$$[5] = $byte1_col$$ >> 4 & 3 | $byte3$$ >> 2 & 12;
        $addr$$[6] = $byte1_col$$ >> 2 & 3 | $byte3$$ >> 0 & 12;
        $addr$$[7] = $byte1_col$$ >> 0 & 3 | $byte3$$ << 2 & 12;
        break;
      case 64:
      case 96:
        $addr$$[0] = $byte0_j$jscomp$4_row$$ >> 4 & 15, $addr$$[1] = $byte0_j$jscomp$4_row$$ >> 0 & 15, $addr$$[2] = $byte1_col$$ >> 4 & 15, $addr$$[3] = $byte1_col$$ >> 0 & 15, $addr$$[4] = $byte2$$ >> 4 & 15, $addr$$[5] = $byte2$$ >> 0 & 15, $addr$$[6] = $byte3$$ >> 4 & 15, $addr$$[7] = $byte3$$ >> 0 & 15;
    }
    if ($pel_width$$) {
      for ($byte0_j$jscomp$4_row$$ = $i$$ = 0; 4 > $i$$; $i$$++, $pixel_addr$jscomp$2_start$$++, $byte0_j$jscomp$4_row$$ += 2) {
        this.pixel_buffer[$pixel_addr$jscomp$2_start$$] = $addr$$[$byte0_j$jscomp$4_row$$] << 4 | $addr$$[$byte0_j$jscomp$4_row$$ + 1];
      }
    } else {
      for ($i$$ = 0; 8 > $i$$; $i$$++, $pixel_addr$jscomp$2_start$$++) {
        this.pixel_buffer[$pixel_addr$jscomp$2_start$$] = $addr$$[$i$$];
      }
    }
  }
};
VGAScreen.prototype.vga_redraw = function() {
  var $pixel_addr$jscomp$3_start$$ = this.diff_addr_min, $end$$ = Math.min(this.diff_addr_max, VGA_PIXEL_BUFFER_SIZE - 1);
  const $buffer$$ = new Int32Array(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, this.virtual_width * this.virtual_height);
  var $mask$$ = 255, $colorset$$ = 0;
  this.attribute_mode & 128 && ($mask$$ &= 207, $colorset$$ |= this.color_select << 4 & 48);
  if (this.attribute_mode & 64) {
    for (; $pixel_addr$jscomp$3_start$$ <= $end$$; $pixel_addr$jscomp$3_start$$++) {
      var $color$$ = this.pixel_buffer[$pixel_addr$jscomp$3_start$$] & $mask$$ | $colorset$$;
      $color$$ = this.vga256_palette[$color$$];
      $buffer$$[$pixel_addr$jscomp$3_start$$] = $color$$ & 65280 | $color$$ << 16 | $color$$ >> 16 | 4278190080;
    }
  } else {
    for ($mask$$ &= 63, $colorset$$ |= this.color_select << 4 & 192; $pixel_addr$jscomp$3_start$$ <= $end$$; $pixel_addr$jscomp$3_start$$++) {
      $color$$ = this.dac_map[this.pixel_buffer[$pixel_addr$jscomp$3_start$$] & this.color_plane_enable] & $mask$$ | $colorset$$, $color$$ = this.vga256_palette[$color$$], $buffer$$[$pixel_addr$jscomp$3_start$$] = $color$$ & 65280 | $color$$ << 16 | $color$$ >> 16 | 4278190080;
    }
  }
};
VGAScreen.prototype.screen_fill_buffer = function() {
  if (this.graphical_mode) {
    if (0 === this.image_data.data.byteLength) {
      var $buffer$jscomp$0$$ = new Uint8ClampedArray(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, 4 * this.virtual_width * this.virtual_height);
      this.image_data = new ImageData($buffer$jscomp$0$$, this.virtual_width, this.virtual_height);
      this.update_layers();
    }
    if (this.svga_enabled) {
      $buffer$jscomp$0$$ = 0;
      let $max_y$$ = this.svga_height;
      if (8 === this.svga_bpp) {
        const $buffer$$ = new Int32Array(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, this.screen_width * this.screen_height), $svga_memory$$ = new Uint8Array(this.cpu.wasm_memory.buffer, this.svga_memory.byteOffset, this.vga_memory_size);
        for (var $bytes_per_pixel_i$$ = 0; $bytes_per_pixel_i$$ < $buffer$$.length; $bytes_per_pixel_i$$++) {
          var $color$$ = this.vga256_palette[$svga_memory$$[$bytes_per_pixel_i$$]];
          $buffer$$[$bytes_per_pixel_i$$] = $color$$ & 65280 | $color$$ << 16 | $color$$ >> 16 | 4278190080;
        }
      } else {
        this.cpu.svga_fill_pixel_buffer(this.svga_bpp, this.svga_offset), $bytes_per_pixel_i$$ = 15 === this.svga_bpp ? 2 : this.svga_bpp / 8, $buffer$jscomp$0$$ = ((this.cpu.svga_dirty_bitmap_min_offset[0] / $bytes_per_pixel_i$$ | 0) - this.svga_offset) / this.svga_width | 0, $max_y$$ = (((this.cpu.svga_dirty_bitmap_max_offset[0] / $bytes_per_pixel_i$$ | 0) - this.svga_offset) / this.svga_width | 0) + 1;
      }
      $buffer$jscomp$0$$ < $max_y$$ && ($buffer$jscomp$0$$ = Math.max($buffer$jscomp$0$$, 0), $max_y$$ = Math.min($max_y$$, this.svga_height), this.bus.send("screen-fill-buffer-end", [{image_data:this.image_data, screen_x:0, screen_y:$buffer$jscomp$0$$, buffer_x:0, buffer_y:$buffer$jscomp$0$$, buffer_width:this.svga_width, buffer_height:$max_y$$ - $buffer$jscomp$0$$, }]));
    } else {
      this.vga_replot(), this.vga_redraw(), this.bus.send("screen-fill-buffer-end", this.layers);
    }
    this.reset_diffs();
  }
  this.update_vertical_retrace();
};
let PS2_LOG_VERBOSE = !1;
function PS2($cpu$$, $bus$$) {
  this.cpu = $cpu$$;
  this.bus = $bus$$;
  this.use_mouse = this.enable_mouse_stream = !1;
  this.have_mouse = !0;
  this.mouse_clicks = this.mouse_delta_y = this.mouse_delta_x = 0;
  this.have_keyboard = !0;
  this.next_read_resolution = this.next_read_rate = this.next_handle_scan_code_set = this.next_read_led = this.next_read_sample = this.next_is_mouse_command = this.enable_keyboard_stream = !1;
  this.kbd_buffer = new ByteQueue(1024);
  this.last_port60_byte = 0;
  this.sample_rate = 100;
  this.mouse_id = this.mouse_detect_state = 0;
  this.mouse_reset_workaround = !1;
  this.wheel_movement = 0;
  this.resolution = 4;
  this.scaling2 = !1;
  this.last_mouse_packet = -1;
  this.mouse_buffer = new ByteQueue(1024);
  this.next_byte_is_aux = this.next_byte_is_ready = !1;
  this.bus.register("keyboard-code", function($code$$) {
    this.kbd_send_code($code$$);
  }, this);
  this.bus.register("mouse-click", function($data$$) {
    this.mouse_send_click($data$$[0], $data$$[1], $data$$[2]);
  }, this);
  this.bus.register("mouse-delta", function($data$$) {
    this.mouse_send_delta($data$$[0], $data$$[1]);
  }, this);
  this.bus.register("mouse-wheel", function($data$$) {
    this.wheel_movement -= $data$$[0];
    this.wheel_movement -= 2 * $data$$[1];
    this.wheel_movement = Math.min(7, Math.max(-8, this.wheel_movement));
    this.send_mouse_packet(0, 0);
  }, this);
  this.command_register = 5;
  this.controller_output_port = 0;
  this.read_controller_output_port = this.read_command_register = this.read_output_register = !1;
  $cpu$$.io.register_read(96, this, this.port60_read);
  $cpu$$.io.register_read(100, this, this.port64_read);
  $cpu$$.io.register_write(96, this, this.port60_write);
  $cpu$$.io.register_write(100, this, this.port64_write);
}
PS2.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.enable_mouse_stream;
  $state$$[1] = this.use_mouse;
  $state$$[2] = this.have_mouse;
  $state$$[3] = this.mouse_delta_x;
  $state$$[4] = this.mouse_delta_y;
  $state$$[5] = this.mouse_clicks;
  $state$$[6] = this.have_keyboard;
  $state$$[7] = this.enable_keyboard_stream;
  $state$$[8] = this.next_is_mouse_command;
  $state$$[9] = this.next_read_sample;
  $state$$[10] = this.next_read_led;
  $state$$[11] = this.next_handle_scan_code_set;
  $state$$[12] = this.next_read_rate;
  $state$$[13] = this.next_read_resolution;
  $state$$[15] = this.last_port60_byte;
  $state$$[16] = this.sample_rate;
  $state$$[17] = this.resolution;
  $state$$[18] = this.scaling2;
  $state$$[20] = this.command_register;
  $state$$[21] = this.read_output_register;
  $state$$[22] = this.read_command_register;
  $state$$[23] = this.controller_output_port;
  $state$$[24] = this.read_controller_output_port;
  $state$$[25] = this.mouse_id;
  $state$$[26] = this.mouse_detect_state;
  $state$$[27] = this.mouse_reset_workaround;
  return $state$$;
};
PS2.prototype.set_state = function($state$$) {
  this.enable_mouse_stream = $state$$[0];
  this.use_mouse = $state$$[1];
  this.have_mouse = $state$$[2];
  this.mouse_delta_x = $state$$[3];
  this.mouse_delta_y = $state$$[4];
  this.mouse_clicks = $state$$[5];
  this.have_keyboard = $state$$[6];
  this.enable_keyboard_stream = $state$$[7];
  this.next_is_mouse_command = $state$$[8];
  this.next_read_sample = $state$$[9];
  this.next_read_led = $state$$[10];
  this.next_handle_scan_code_set = $state$$[11];
  this.next_read_rate = $state$$[12];
  this.next_read_resolution = $state$$[13];
  this.last_port60_byte = $state$$[15];
  this.sample_rate = $state$$[16];
  this.resolution = $state$$[17];
  this.scaling2 = $state$$[18];
  this.command_register = $state$$[20];
  this.read_output_register = $state$$[21];
  this.read_command_register = $state$$[22];
  this.controller_output_port = $state$$[23];
  this.read_controller_output_port = $state$$[24];
  this.mouse_id = $state$$[25] || 0;
  this.mouse_detect_state = $state$$[26] || 0;
  this.mouse_reset_workaround = $state$$[27] || !1;
  this.next_byte_is_aux = this.next_byte_is_ready = !1;
  this.kbd_buffer.clear();
  this.mouse_buffer.clear();
  this.bus.send("mouse-enable", this.use_mouse);
};
PS2.prototype.raise_irq = function() {
  this.next_byte_is_ready || (this.kbd_buffer.length ? this.kbd_irq() : this.mouse_buffer.length && this.mouse_irq());
};
PS2.prototype.mouse_irq = function() {
  this.next_byte_is_aux = this.next_byte_is_ready = !0;
  this.command_register & 2 && (dbg_log("Mouse irq", LOG_PS2), this.cpu.device_lower_irq(12), this.cpu.device_raise_irq(12));
};
PS2.prototype.kbd_irq = function() {
  this.next_byte_is_ready = !0;
  this.next_byte_is_aux = !1;
  this.command_register & 1 && (dbg_log("Keyboard irq", LOG_PS2), this.cpu.device_lower_irq(1), this.cpu.device_raise_irq(1));
};
PS2.prototype.kbd_send_code = function($code$$) {
  this.enable_keyboard_stream && (dbg_log("adding kbd code: " + h($code$$), LOG_PS2), this.kbd_buffer.push($code$$), this.raise_irq());
};
PS2.prototype.mouse_send_delta = function($change_x_delta_x$$, $change_y_delta_y$$) {
  if (this.have_mouse && this.use_mouse) {
    var $factor$$ = this.resolution * this.sample_rate / 80;
    this.mouse_delta_x += $change_x_delta_x$$ * $factor$$;
    this.mouse_delta_y += $change_y_delta_y$$ * $factor$$;
    this.enable_mouse_stream && ($change_x_delta_x$$ = this.mouse_delta_x | 0, $change_y_delta_y$$ = this.mouse_delta_y | 0, $change_x_delta_x$$ || $change_y_delta_y$$) && (Date.now(), this.mouse_delta_x -= $change_x_delta_x$$, this.mouse_delta_y -= $change_y_delta_y$$, this.send_mouse_packet($change_x_delta_x$$, $change_y_delta_y$$));
  }
};
PS2.prototype.mouse_send_click = function($left$$, $middle$$, $right$$) {
  this.have_mouse && this.use_mouse && (this.mouse_clicks = $left$$ | $right$$ << 1 | $middle$$ << 2, this.enable_mouse_stream && this.send_mouse_packet(0, 0));
};
PS2.prototype.send_mouse_packet = function($dx$$, $dy$$) {
  var $info_byte$$ = (0 > $dy$$) << 5 | (0 > $dx$$) << 4 | 8 | this.mouse_clicks;
  this.last_mouse_packet = Date.now();
  this.mouse_buffer.push($info_byte$$);
  this.mouse_buffer.push($dx$$);
  this.mouse_buffer.push($dy$$);
  4 === this.mouse_id ? (this.mouse_buffer.push(0 | this.wheel_movement & 15), this.wheel_movement = 0) : 3 === this.mouse_id && (this.mouse_buffer.push(this.wheel_movement & 255), this.wheel_movement = 0);
  PS2_LOG_VERBOSE && dbg_log("adding mouse packets: " + [$info_byte$$, $dx$$, $dy$$], LOG_PS2);
  this.raise_irq();
};
PS2.prototype.apply_scaling2 = function($n$$) {
  var $sign$$ = $n$$ >> 31;
  switch(Math.abs($n$$)) {
    case 0:
    case 1:
    case 3:
      return $n$$;
    case 2:
      return $sign$$;
    case 4:
      return 6 * $sign$$;
    case 5:
      return 9 * $sign$$;
    default:
      return $n$$ << 1;
  }
};
PS2.prototype.port60_read = function() {
  this.next_byte_is_ready = !1;
  if (!this.kbd_buffer.length && !this.mouse_buffer.length) {
    return dbg_log("Port 60 read: Empty", LOG_PS2), this.last_port60_byte;
  }
  this.next_byte_is_aux ? (this.cpu.device_lower_irq(12), this.last_port60_byte = this.mouse_buffer.shift(), dbg_log("Port 60 read (mouse): " + h(this.last_port60_byte), LOG_PS2)) : (this.cpu.device_lower_irq(1), this.last_port60_byte = this.kbd_buffer.shift(), dbg_log("Port 60 read (kbd)  : " + h(this.last_port60_byte), LOG_PS2));
  (this.kbd_buffer.length || this.mouse_buffer.length) && this.raise_irq();
  return this.last_port60_byte;
};
PS2.prototype.port64_read = function() {
  var $status_byte$$ = 16;
  this.next_byte_is_ready && ($status_byte$$ |= 1);
  this.next_byte_is_aux && ($status_byte$$ |= 32);
  dbg_log("port 64 read: " + h($status_byte$$), LOG_PS2);
  return $status_byte$$;
};
PS2.prototype.port60_write = function($write_byte$$) {
  dbg_log("port 60 write: " + h($write_byte$$), LOG_PS2);
  if (this.read_command_register) {
    this.command_register = $write_byte$$, this.read_command_register = !1, dbg_log("Keyboard command register = " + h(this.command_register), LOG_PS2);
  } else {
    if (this.read_output_register) {
      this.read_output_register = !1, this.mouse_buffer.clear(), this.mouse_buffer.push($write_byte$$), this.mouse_irq();
    } else {
      if (this.next_read_sample) {
        this.next_read_sample = !1;
        this.mouse_buffer.clear();
        this.mouse_buffer.push(250);
        this.sample_rate = $write_byte$$;
        switch(this.mouse_detect_state) {
          case -1:
            60 === $write_byte$$ ? (this.mouse_reset_workaround = !0, this.mouse_detect_state = 0) : (this.mouse_reset_workaround = !1, this.mouse_detect_state = 200 === $write_byte$$ ? 1 : 0);
            break;
          case 0:
            200 === $write_byte$$ && (this.mouse_detect_state = 1);
            break;
          case 1:
            this.mouse_detect_state = 100 === $write_byte$$ ? 2 : 200 === $write_byte$$ ? 3 : 0;
            break;
          case 2:
            80 === $write_byte$$ && (this.mouse_id = 3);
            this.mouse_detect_state = -1;
            break;
          case 3:
            80 === $write_byte$$ && (this.mouse_id = 4), this.mouse_detect_state = -1;
        }
        dbg_log("mouse sample rate: " + h($write_byte$$) + ", mouse id: " + h(this.mouse_id), LOG_PS2);
        this.sample_rate || (dbg_log("invalid sample rate, reset to 100", LOG_PS2), this.sample_rate = 100);
        this.mouse_irq();
      } else {
        if (this.next_read_resolution) {
          this.next_read_resolution = !1, this.mouse_buffer.clear(), this.mouse_buffer.push(250), 3 < $write_byte$$ ? (this.resolution = 4, dbg_log("invalid resolution, resetting to 4", LOG_PS2)) : (this.resolution = 1 << $write_byte$$, dbg_log("resolution: " + this.resolution, LOG_PS2)), this.mouse_irq();
        } else {
          if (this.next_read_led) {
            this.next_read_led = !1, this.kbd_buffer.push(250), this.kbd_irq();
          } else {
            if (this.next_handle_scan_code_set) {
              this.next_handle_scan_code_set = !1, this.kbd_buffer.push(250), this.kbd_irq(), $write_byte$$ || this.kbd_buffer.push(2);
            } else {
              if (this.next_read_rate) {
                this.next_read_rate = !1, this.kbd_buffer.push(250), this.kbd_irq();
              } else {
                if (this.next_is_mouse_command) {
                  if (this.next_is_mouse_command = !1, dbg_log("Port 60 data register write: " + h($write_byte$$), LOG_PS2), this.have_mouse) {
                    this.kbd_buffer.clear();
                    this.mouse_buffer.clear();
                    this.mouse_buffer.push(250);
                    switch($write_byte$$) {
                      case 230:
                        dbg_log("Scaling 1:1", LOG_PS2);
                        this.scaling2 = !1;
                        break;
                      case 231:
                        dbg_log("Scaling 2:1", LOG_PS2);
                        this.scaling2 = !0;
                        break;
                      case 232:
                        this.next_read_resolution = !0;
                        break;
                      case 233:
                        this.send_mouse_packet(0, 0);
                        break;
                      case 235:
                        dbg_log("unimplemented request single packet", LOG_PS2);
                        this.send_mouse_packet(0, 0);
                        break;
                      case 242:
                        dbg_log("required id: " + h(this.mouse_id), LOG_PS2);
                        this.mouse_buffer.push(this.mouse_id);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
                        this.raise_irq();
                        break;
                      case 243:
                        this.next_read_sample = !0;
                        break;
                      case 244:
                        this.use_mouse = this.enable_mouse_stream = !0;
                        this.bus.send("mouse-enable", !0);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
                        break;
                      case 245:
                        this.enable_mouse_stream = !1;
                        break;
                      case 246:
                        this.enable_mouse_stream = !1;
                        this.sample_rate = 100;
                        this.scaling2 = !1;
                        this.resolution = 4;
                        break;
                      case 255:
                        dbg_log("Mouse reset", LOG_PS2);
                        this.mouse_buffer.push(170);
                        this.mouse_buffer.push(0);
                        this.use_mouse = !0;
                        this.bus.send("mouse-enable", !0);
                        this.enable_mouse_stream = !1;
                        this.sample_rate = 100;
                        this.scaling2 = !1;
                        this.resolution = 4;
                        this.mouse_reset_workaround || (this.mouse_id = 0);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
                        break;
                      default:
                        dbg_log("Unimplemented mouse command: " + h($write_byte$$), LOG_PS2);
                    }
                    this.mouse_irq();
                  }
                } else {
                  if (this.read_controller_output_port) {
                    this.read_controller_output_port = !1, this.controller_output_port = $write_byte$$;
                  } else {
                    dbg_log("Port 60 data register write: " + h($write_byte$$), LOG_PS2);
                    this.mouse_buffer.clear();
                    this.kbd_buffer.clear();
                    this.kbd_buffer.push(250);
                    switch($write_byte$$) {
                      case 237:
                        this.next_read_led = !0;
                        break;
                      case 240:
                        this.next_handle_scan_code_set = !0;
                        break;
                      case 242:
                        this.kbd_buffer.push(171);
                        this.kbd_buffer.push(83);
                        break;
                      case 243:
                        this.next_read_rate = !0;
                        break;
                      case 244:
                        dbg_log("kbd enable scanning", LOG_PS2);
                        this.enable_keyboard_stream = !0;
                        break;
                      case 245:
                        dbg_log("kbd disable scanning", LOG_PS2);
                        this.enable_keyboard_stream = !1;
                        break;
                      case 246:
                        break;
                      case 255:
                        this.kbd_buffer.clear();
                        this.kbd_buffer.push(250);
                        this.kbd_buffer.push(170);
                        this.kbd_buffer.push(0);
                        break;
                      default:
                        dbg_log("Unimplemented keyboard command: " + h($write_byte$$), LOG_PS2);
                    }
                    this.kbd_irq();
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
PS2.prototype.port64_write = function($write_byte$$) {
  dbg_log("port 64 write: " + h($write_byte$$), LOG_PS2);
  switch($write_byte$$) {
    case 32:
      this.kbd_buffer.clear();
      this.mouse_buffer.clear();
      this.kbd_buffer.push(this.command_register);
      this.kbd_irq();
      break;
    case 96:
      this.read_command_register = !0;
      break;
    case 209:
      this.read_controller_output_port = !0;
      break;
    case 211:
      this.read_output_register = !0;
      break;
    case 212:
      this.next_is_mouse_command = !0;
      break;
    case 167:
      dbg_log("Disable second port", LOG_PS2);
      this.command_register |= 32;
      break;
    case 168:
      dbg_log("Enable second port", LOG_PS2);
      this.command_register &= -33;
      break;
    case 169:
      this.kbd_buffer.clear();
      this.mouse_buffer.clear();
      this.kbd_buffer.push(0);
      this.kbd_irq();
      break;
    case 170:
      this.kbd_buffer.clear();
      this.mouse_buffer.clear();
      this.kbd_buffer.push(85);
      this.kbd_irq();
      break;
    case 171:
      this.kbd_buffer.clear();
      this.mouse_buffer.clear();
      this.kbd_buffer.push(0);
      this.kbd_irq();
      break;
    case 173:
      dbg_log("Disable Keyboard", LOG_PS2);
      this.command_register |= 16;
      break;
    case 174:
      dbg_log("Enable Keyboard", LOG_PS2);
      this.command_register &= -17;
      break;
    case 254:
      dbg_log("CPU reboot via PS2");
      this.cpu.reboot_internal();
      break;
    default:
      dbg_log("port 64: Unimplemented command byte: " + h($write_byte$$), LOG_PS2);
  }
};
var PIC_LOG_VERBOSE = !1;
function PIC($cpu$$, $iobase_high_master$$) {
  this.irq_value = this.irr = this.isr = this.irq_map = this.irq_mask = 0;
  this.requested_irq = -1;
  this.master = $iobase_high_master$$;
  this.is_master = void 0 === this.master;
  this.slave = void 0;
  this.name = this.is_master ? "master" : "slave ";
  this.expect_icw4 = !1;
  this.read_isr = this.state = 0;
  this.auto_eoi = 1;
  this.elcr = this.special_mask_mode = 0;
  this.cpu = $cpu$$;
  this.is_master ? (this.slave = new PIC(this.cpu, this), this.check_irqs = function() {
    if (0 <= this.requested_irq) {
      PIC_LOG_VERBOSE && dbg_log("master> Already requested irq: " + this.requested_irq, LOG_PIC), this.cpu.handle_irqs();
    } else {
      var $enabled_irr_irq_mask$$ = this.irr & this.irq_mask;
      if ($enabled_irr_irq_mask$$) {
        $enabled_irr_irq_mask$$ &= -$enabled_irr_irq_mask$$;
        var $irq_number_special_mask$$ = this.special_mask_mode ? this.irq_mask : -1;
        this.isr && (this.isr & -this.isr & $irq_number_special_mask$$) <= $enabled_irr_irq_mask$$ ? dbg_log("master> higher prio: isr=" + h(this.isr, 2) + " mask=" + h(this.irq_mask & 255, 2) + " irq=" + h($enabled_irr_irq_mask$$, 2), LOG_PIC) : (dbg_assert(0 !== $enabled_irr_irq_mask$$), $irq_number_special_mask$$ = v86util.int_log2_byte($enabled_irr_irq_mask$$), dbg_assert($enabled_irr_irq_mask$$ === 1 << $irq_number_special_mask$$), PIC_LOG_VERBOSE && dbg_log("master> request irq " + $irq_number_special_mask$$, 
        LOG_PIC), this.requested_irq = $irq_number_special_mask$$, this.cpu.handle_irqs());
      } else {
        PIC_LOG_VERBOSE && dbg_log("master> no unmasked irrs. irr=" + h(this.irr, 2) + " mask=" + h(this.irq_mask & 255, 2) + " isr=" + h(this.isr, 2), LOG_PIC);
      }
    }
  }, this.acknowledge_irq = function() {
    if (-1 !== this.requested_irq) {
      if (0 === this.irr) {
        PIC_LOG_VERBOSE && dbg_log("master> spurious requested=" + this.requested_irq, LOG_PIC), this.requested_irq = -1;
      } else {
        dbg_assert(this.irr);
        dbg_assert(0 <= this.requested_irq);
        var $irq_mask$$ = 1 << this.requested_irq;
        0 === (this.elcr & $irq_mask$$) && (this.irr &= ~$irq_mask$$);
        this.auto_eoi || (this.isr |= $irq_mask$$);
        PIC_LOG_VERBOSE && dbg_log("master> acknowledge " + this.requested_irq, LOG_PIC);
        2 === this.requested_irq ? this.slave.acknowledge_irq() : this.cpu.pic_call_irq(this.irq_map | this.requested_irq);
        this.requested_irq = -1;
        this.check_irqs();
      }
    }
  }) : (this.check_irqs = function() {
    if (0 <= this.requested_irq) {
      PIC_LOG_VERBOSE && dbg_log("slave > Already requested irq: " + this.requested_irq, LOG_PIC), this.cpu.handle_irqs();
    } else {
      var $enabled_irr$jscomp$1_irq_mask$$ = this.irr & this.irq_mask;
      if ($enabled_irr$jscomp$1_irq_mask$$) {
        $enabled_irr$jscomp$1_irq_mask$$ &= -$enabled_irr$jscomp$1_irq_mask$$;
        var $irq_number$jscomp$1_special_mask$$ = this.special_mask_mode ? this.irq_mask : -1;
        this.isr && (this.isr & -this.isr & $irq_number$jscomp$1_special_mask$$) <= $enabled_irr$jscomp$1_irq_mask$$ ? PIC_LOG_VERBOSE && dbg_log("slave > higher prio: isr=" + h(this.isr, 2) + " irq=" + h($enabled_irr$jscomp$1_irq_mask$$, 2), LOG_PIC) : (dbg_assert(0 !== $enabled_irr$jscomp$1_irq_mask$$), $irq_number$jscomp$1_special_mask$$ = v86util.int_log2_byte($enabled_irr$jscomp$1_irq_mask$$), dbg_assert($enabled_irr$jscomp$1_irq_mask$$ === 1 << $irq_number$jscomp$1_special_mask$$), PIC_LOG_VERBOSE && 
        dbg_log("slave > request irq " + $irq_number$jscomp$1_special_mask$$, LOG_PIC), this.requested_irq = $irq_number$jscomp$1_special_mask$$, this.master.set_irq(2));
      } else {
        PIC_LOG_VERBOSE && dbg_log("slave > no unmasked irrs. irr=" + h(this.irr, 2) + " mask=" + h(this.irq_mask & 255, 2) + " isr=" + h(this.isr, 2), LOG_PIC);
      }
    }
  }, this.acknowledge_irq = function() {
    if (-1 !== this.requested_irq) {
      if (0 === this.irr) {
        PIC_LOG_VERBOSE && dbg_log("slave > spurious requested=" + this.requested_irq, LOG_PIC), this.requested_irq = -1, this.master.irq_value &= -5, this.cpu.pic_call_irq(this.irq_map | 7);
      } else {
        dbg_assert(this.irr);
        dbg_assert(0 <= this.requested_irq);
        var $irq_mask$$ = 1 << this.requested_irq;
        0 === (this.elcr & $irq_mask$$) && (this.irr &= ~$irq_mask$$);
        this.auto_eoi || (this.isr |= $irq_mask$$);
        this.master.irq_value &= -5;
        PIC_LOG_VERBOSE && dbg_log("slave > acknowledge " + this.requested_irq, LOG_PIC);
        this.cpu.pic_call_irq(this.irq_map | this.requested_irq);
        this.requested_irq = -1;
        this.check_irqs();
      }
    }
  });
  this.dump = function() {
    dbg_log("mask: " + h(this.irq_mask & 255), LOG_PIC);
    dbg_log("base: " + h(this.irq_map), LOG_PIC);
    dbg_log("requested: " + h(this.irr), LOG_PIC);
    dbg_log("serviced: " + h(this.isr), LOG_PIC);
    this.is_master && this.slave.dump();
  };
  this.is_master ? ($cpu$$ = 32, $iobase_high_master$$ = 1232) : ($cpu$$ = 160, $iobase_high_master$$ = 1233);
  this.cpu.io.register_write($cpu$$, this, this.port20_write);
  this.cpu.io.register_read($cpu$$, this, this.port20_read);
  this.cpu.io.register_write($cpu$$ | 1, this, this.port21_write);
  this.cpu.io.register_read($cpu$$ | 1, this, this.port21_read);
  this.cpu.io.register_write($iobase_high_master$$, this, this.port4D0_write);
  this.cpu.io.register_read($iobase_high_master$$, this, this.port4D0_read);
  this.is_master ? (this.set_irq = function($irq_number$$) {
    dbg_assert(0 <= $irq_number$$ && 16 > $irq_number$$);
    if (8 <= $irq_number$$) {
      this.slave.set_irq($irq_number$$ - 8);
    } else {
      var $irq_mask$$ = 1 << $irq_number$$;
      0 === (this.irq_value & $irq_mask$$) ? (PIC_LOG_VERBOSE && dbg_log("master> set irq " + $irq_number$$, LOG_PIC), this.irr |= $irq_mask$$, this.irq_value |= $irq_mask$$, this.check_irqs()) : PIC_LOG_VERBOSE && dbg_log("master> set irq " + $irq_number$$ + ": already set!", LOG_PIC);
    }
  }, this.clear_irq = function($irq_mask$jscomp$5_irq_number$$) {
    dbg_assert(0 <= $irq_mask$jscomp$5_irq_number$$ && 16 > $irq_mask$jscomp$5_irq_number$$);
    PIC_LOG_VERBOSE && dbg_log("master> clear irq " + $irq_mask$jscomp$5_irq_number$$, LOG_PIC);
    8 <= $irq_mask$jscomp$5_irq_number$$ ? this.slave.clear_irq($irq_mask$jscomp$5_irq_number$$ - 8) : ($irq_mask$jscomp$5_irq_number$$ = 1 << $irq_mask$jscomp$5_irq_number$$, this.irq_value & $irq_mask$jscomp$5_irq_number$$ && (this.irq_value &= ~$irq_mask$jscomp$5_irq_number$$, this.irr &= ~$irq_mask$jscomp$5_irq_number$$, this.check_irqs()));
  }) : (this.set_irq = function($irq_number$$) {
    dbg_assert(0 <= $irq_number$$ && 8 > $irq_number$$);
    var $irq_mask$$ = 1 << $irq_number$$;
    0 === (this.irq_value & $irq_mask$$) ? (PIC_LOG_VERBOSE && dbg_log("slave > set irq " + $irq_number$$, LOG_PIC), this.irr |= $irq_mask$$, this.irq_value |= $irq_mask$$, this.check_irqs()) : PIC_LOG_VERBOSE && dbg_log("slave > set irq " + $irq_number$$ + ": already set!", LOG_PIC);
  }, this.clear_irq = function($irq_mask$jscomp$7_irq_number$$) {
    dbg_assert(0 <= $irq_mask$jscomp$7_irq_number$$ && 8 > $irq_mask$jscomp$7_irq_number$$);
    PIC_LOG_VERBOSE && dbg_log("slave > clear irq " + $irq_mask$jscomp$7_irq_number$$, LOG_PIC);
    $irq_mask$jscomp$7_irq_number$$ = 1 << $irq_mask$jscomp$7_irq_number$$;
    this.irq_value & $irq_mask$jscomp$7_irq_number$$ && (this.irq_value &= ~$irq_mask$jscomp$7_irq_number$$, this.irr &= ~$irq_mask$jscomp$7_irq_number$$, this.check_irqs());
  });
  this.get_isr = function() {
    return this.isr;
  };
}
PIC.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.irq_mask;
  $state$$[1] = this.irq_map;
  $state$$[2] = this.isr;
  $state$$[3] = this.irr;
  $state$$[4] = this.is_master;
  $state$$[5] = this.slave;
  $state$$[6] = this.expect_icw4;
  $state$$[7] = this.state;
  $state$$[8] = this.read_isr;
  $state$$[9] = this.auto_eoi;
  $state$$[10] = this.elcr;
  return $state$$;
};
PIC.prototype.set_state = function($state$$) {
  this.irq_mask = $state$$[0];
  this.irq_map = $state$$[1];
  this.isr = $state$$[2];
  this.irr = $state$$[3];
  this.is_master = $state$$[4];
  this.slave && this.slave.set_state($state$$[5]);
  this.expect_icw4 = $state$$[6];
  this.state = $state$$[7];
  this.read_isr = $state$$[8];
  this.auto_eoi = $state$$[9];
  this.elcr = $state$$[10];
};
PIC.prototype.port20_write = function($data_byte$$) {
  if ($data_byte$$ & 16) {
    dbg_log("icw1 = " + h($data_byte$$), LOG_PIC), this.irq_value = this.irq_mask = this.irr = this.isr = 0, this.auto_eoi = 1, this.requested_irq = -1, this.expect_icw4 = $data_byte$$ & 1, this.state = 1;
  } else {
    if ($data_byte$$ & 8) {
      dbg_log("ocw3: " + h($data_byte$$), LOG_PIC), $data_byte$$ & 2 && (this.read_isr = $data_byte$$ & 1), $data_byte$$ & 4 && dbg_assert(!1, "unimplemented: polling", LOG_PIC), $data_byte$$ & 64 && (this.special_mask_mode = 32 === ($data_byte$$ & 32), dbg_log("special mask mode: " + this.special_mask_mode, LOG_PIC));
    } else {
      dbg_log("eoi: " + h($data_byte$$) + " (" + this.name + ")", LOG_PIC);
      var $eoi_type$$ = $data_byte$$ >> 5;
      1 === $eoi_type$$ ? (this.isr &= this.isr - 1, dbg_log("new isr: " + h(this.isr, 2), LOG_PIC)) : 3 === $eoi_type$$ ? this.isr &= ~(1 << ($data_byte$$ & 7)) : 192 === ($data_byte$$ & 200) ? dbg_log("lowest priority: " + h($data_byte$$ & 7), LOG_PIC) : (dbg_log("Unknown eoi: " + h($data_byte$$), LOG_PIC), dbg_assert(!1), this.isr &= this.isr - 1);
      this.check_irqs();
    }
  }
};
PIC.prototype.port20_read = function() {
  if (this.read_isr) {
    return dbg_log("read port 20h (isr): " + h(this.isr), LOG_PIC), this.isr;
  }
  dbg_log("read port 20h (irr): " + h(this.irr), LOG_PIC);
  return this.irr;
};
PIC.prototype.port21_write = function($data_byte$$) {
  0 === this.state ? this.expect_icw4 ? (this.expect_icw4 = !1, this.auto_eoi = $data_byte$$ & 2, dbg_log("icw4: " + h($data_byte$$) + " autoeoi=" + this.auto_eoi, LOG_PIC), 0 === ($data_byte$$ & 1) && dbg_assert(!1, "unimplemented: not 8086 mode", LOG_PIC)) : (this.irq_mask = ~$data_byte$$, PIC_LOG_VERBOSE && dbg_log("interrupt mask: " + (this.irq_mask & 255).toString(2) + " (" + this.name + ")", LOG_PIC), this.check_irqs()) : 1 === this.state ? (this.irq_map = $data_byte$$, dbg_log("interrupts are mapped to " + 
  h(this.irq_map) + " (" + this.name + ")", LOG_PIC), this.state++) : 2 === this.state && (this.state = 0, dbg_log("icw3: " + h($data_byte$$), LOG_PIC));
};
PIC.prototype.port21_read = function() {
  dbg_log("21h read " + h(~this.irq_mask & 255), LOG_PIC);
  return ~this.irq_mask & 255;
};
PIC.prototype.port4D0_read = function() {
  dbg_log("elcr read: " + h(this.elcr, 2), LOG_PIC);
  return this.elcr;
};
PIC.prototype.port4D0_write = function($value$$) {
  dbg_log("elcr write: " + h($value$$, 2), LOG_PIC);
  this.elcr = $value$$;
};
var CMOS_RTC_SECONDS = 0, CMOS_RTC_SECONDS_ALARM = 1, CMOS_RTC_MINUTES = 2, CMOS_RTC_MINUTES_ALARM = 3, CMOS_RTC_HOURS = 4, CMOS_RTC_HOURS_ALARM = 5, CMOS_RTC_DAY_WEEK = 6, CMOS_RTC_DAY_MONTH = 7, CMOS_RTC_MONTH = 8, CMOS_RTC_YEAR = 9, CMOS_STATUS_A = 10, CMOS_STATUS_B = 11, CMOS_STATUS_C = 12, CMOS_STATUS_D = 13, CMOS_RESET_CODE = 15, CMOS_FLOPPY_DRIVE_TYPE = 16, CMOS_DISK_DATA = 18, CMOS_EQUIPMENT_INFO = 20, CMOS_MEM_BASE_LOW = 21, CMOS_MEM_BASE_HIGH = 22, CMOS_MEM_OLD_EXT_LOW = 23, CMOS_MEM_OLD_EXT_HIGH = 
24, CMOS_DISK_DRIVE1_TYPE = 25, CMOS_DISK_DRIVE2_TYPE = 26, CMOS_DISK_DRIVE1_CYL = 27, CMOS_DISK_DRIVE2_CYL = 36, CMOS_MEM_EXTMEM_LOW = 48, CMOS_MEM_EXTMEM_HIGH = 49, CMOS_CENTURY = 50, CMOS_MEM_EXTMEM2_LOW = 52, CMOS_MEM_EXTMEM2_HIGH = 53, CMOS_BIOS_BOOTFLAG1 = 56, CMOS_BIOS_DISKTRANSFLAG = 57, CMOS_BIOS_BOOTFLAG2 = 61, CMOS_MEM_HIGHMEM_LOW = 91, CMOS_MEM_HIGHMEM_MID = 92, CMOS_MEM_HIGHMEM_HIGH = 93, CMOS_BIOS_SMP_COUNT = 95;
function RTC($cpu$$) {
  this.cpu = $cpu$$;
  this.cmos_index = 0;
  this.cmos_data = new Uint8Array(128);
  this.last_update = this.rtc_time = Date.now();
  this.next_interrupt_alarm = this.next_interrupt = 0;
  this.periodic_interrupt = !1;
  this.periodic_interrupt_time = .9765625;
  this.cmos_a = 38;
  this.cmos_b = 2;
  this.nmi_disabled = this.cmos_c = 0;
  $cpu$$.io.register_write(112, this, function($out_byte$$) {
    this.cmos_index = $out_byte$$ & 127;
    this.nmi_disabled = $out_byte$$ >> 7;
  });
  $cpu$$.io.register_write(113, this, this.cmos_port_write);
  $cpu$$.io.register_read(113, this, this.cmos_port_read);
}
RTC.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.cmos_index;
  $state$$[1] = this.cmos_data;
  $state$$[2] = this.rtc_time;
  $state$$[3] = this.last_update;
  $state$$[4] = this.next_interrupt;
  $state$$[5] = this.next_interrupt_alarm;
  $state$$[6] = this.periodic_interrupt;
  $state$$[7] = this.periodic_interrupt_time;
  $state$$[8] = this.cmos_a;
  $state$$[9] = this.cmos_b;
  $state$$[10] = this.cmos_c;
  $state$$[11] = this.nmi_disabled;
  return $state$$;
};
RTC.prototype.set_state = function($state$$) {
  this.cmos_index = $state$$[0];
  this.cmos_data = $state$$[1];
  this.rtc_time = $state$$[2];
  this.last_update = $state$$[3];
  this.next_interrupt = $state$$[4];
  this.next_interrupt_alarm = $state$$[5];
  this.periodic_interrupt = $state$$[6];
  this.periodic_interrupt_time = $state$$[7];
  this.cmos_a = $state$$[8];
  this.cmos_b = $state$$[9];
  this.cmos_c = $state$$[10];
  this.nmi_disabled = $state$$[11];
};
RTC.prototype.timer = function($time$$, $legacy_mode_t$$) {
  $time$$ = Date.now();
  this.rtc_time += $time$$ - this.last_update;
  this.last_update = $time$$;
  this.periodic_interrupt && this.next_interrupt < $time$$ ? (this.cpu.device_raise_irq(8), this.cmos_c |= 192, this.next_interrupt += this.periodic_interrupt_time * Math.ceil(($time$$ - this.next_interrupt) / this.periodic_interrupt_time)) : this.next_interrupt_alarm && this.next_interrupt_alarm < $time$$ && (this.cpu.device_raise_irq(8), this.cmos_c |= 160, this.next_interrupt_alarm = 0);
  $legacy_mode_t$$ = 100;
  this.periodic_interrupt && this.next_interrupt && ($legacy_mode_t$$ = Math.min($legacy_mode_t$$, Math.max(0, this.next_interrupt - $time$$)));
  this.next_interrupt_alarm && ($legacy_mode_t$$ = Math.min($legacy_mode_t$$, Math.max(0, this.next_interrupt_alarm - $time$$)));
  return $legacy_mode_t$$;
};
RTC.prototype.bcd_pack = function($n$$) {
  for (var $i$$ = 0, $result$$ = 0, $digit$$; $n$$;) {
    $digit$$ = $n$$ % 10, $result$$ |= $digit$$ << 4 * $i$$, $i$$++, $n$$ = ($n$$ - $digit$$) / 10;
  }
  return $result$$;
};
RTC.prototype.bcd_unpack = function($n$$) {
  const $low$$ = $n$$ & 15, $high$$ = $n$$ >> 4 & 15;
  dbg_assert(256 > $n$$);
  dbg_assert(10 > $low$$);
  dbg_assert(10 > $high$$);
  return $low$$ + 10 * $high$$;
};
RTC.prototype.encode_time = function($t$$) {
  return this.cmos_b & 4 ? $t$$ : this.bcd_pack($t$$);
};
RTC.prototype.decode_time = function($t$$) {
  return this.cmos_b & 4 ? $t$$ : this.bcd_unpack($t$$);
};
RTC.prototype.cmos_port_read = function() {
  var $c$jscomp$2_index$$ = this.cmos_index;
  switch($c$jscomp$2_index$$) {
    case CMOS_RTC_SECONDS:
      return this.encode_time((new Date(this.rtc_time)).getUTCSeconds());
    case CMOS_RTC_MINUTES:
      return this.encode_time((new Date(this.rtc_time)).getUTCMinutes());
    case CMOS_RTC_HOURS:
      return this.encode_time((new Date(this.rtc_time)).getUTCHours());
    case CMOS_RTC_DAY_MONTH:
      return this.encode_time((new Date(this.rtc_time)).getUTCDate());
    case CMOS_RTC_MONTH:
      return this.encode_time((new Date(this.rtc_time)).getUTCMonth() + 1);
    case CMOS_RTC_YEAR:
      return this.encode_time((new Date(this.rtc_time)).getUTCFullYear() % 100);
    case CMOS_STATUS_A:
      return 999 <= v86.microtick() % 1000 ? this.cmos_a | 128 : this.cmos_a;
    case CMOS_STATUS_B:
      return this.cmos_b;
    case CMOS_STATUS_C:
      return this.cpu.device_lower_irq(8), dbg_log("cmos reg C read", LOG_RTC), $c$jscomp$2_index$$ = this.cmos_c, this.cmos_c &= -241, $c$jscomp$2_index$$;
    case CMOS_STATUS_D:
      return 0;
    case CMOS_CENTURY:
      return this.encode_time((new Date(this.rtc_time)).getUTCFullYear() / 100 | 0);
    default:
      return dbg_log("cmos read from index " + h($c$jscomp$2_index$$), LOG_RTC), this.cmos_data[this.cmos_index];
  }
};
RTC.prototype.cmos_port_write = function($data_byte$jscomp$13_now$$) {
  switch(this.cmos_index) {
    case 10:
      this.cmos_a = $data_byte$jscomp$13_now$$ & 127;
      this.periodic_interrupt_time = 1000 / (32768 >> (this.cmos_a & 15) - 1);
      dbg_log("Periodic interrupt, a=" + h(this.cmos_a, 2) + " t=" + this.periodic_interrupt_time, LOG_RTC);
      break;
    case 11:
      this.cmos_b = $data_byte$jscomp$13_now$$;
      this.cmos_b & 64 && (this.next_interrupt = Date.now());
      if (this.cmos_b & 32) {
        $data_byte$jscomp$13_now$$ = new Date;
        const $seconds$$ = this.decode_time(this.cmos_data[CMOS_RTC_SECONDS_ALARM]), $minutes$$ = this.decode_time(this.cmos_data[CMOS_RTC_MINUTES_ALARM]), $hours$$ = this.decode_time(this.cmos_data[CMOS_RTC_HOURS_ALARM]), $alarm_date$$ = new Date(Date.UTC($data_byte$jscomp$13_now$$.getUTCFullYear(), $data_byte$jscomp$13_now$$.getUTCMonth(), $data_byte$jscomp$13_now$$.getUTCDate(), $hours$$, $minutes$$, $seconds$$));
        dbg_log("RTC alarm scheduled for " + $alarm_date$$ + " hh:mm:ss=" + $hours$$ + ":" + $minutes$$ + ":" + $seconds$$ + " ms_from_now=" + ($alarm_date$$ - $data_byte$jscomp$13_now$$), LOG_RTC);
        this.next_interrupt_alarm = +$alarm_date$$;
      }
      this.cmos_b & 16 && dbg_log("Unimplemented: updated interrupt", LOG_RTC);
      dbg_log("cmos b=" + h(this.cmos_b, 2), LOG_RTC);
      break;
    case CMOS_RTC_SECONDS_ALARM:
    case CMOS_RTC_MINUTES_ALARM:
    case CMOS_RTC_HOURS_ALARM:
      this.cmos_write(this.cmos_index, $data_byte$jscomp$13_now$$);
      break;
    default:
      dbg_log("cmos write index " + h(this.cmos_index) + ": " + h($data_byte$jscomp$13_now$$), LOG_RTC);
  }
  this.periodic_interrupt = 64 === (this.cmos_b & 64) && 0 < (this.cmos_a & 15);
};
RTC.prototype.cmos_read = function($index$$) {
  dbg_assert(128 > $index$$);
  return this.cmos_data[$index$$];
};
RTC.prototype.cmos_write = function($index$$, $value$$) {
  dbg_log("cmos " + h($index$$) + " <- " + h($value$$), LOG_RTC);
  dbg_assert(128 > $index$$);
  this.cmos_data[$index$$] = $value$$;
};
var DLAB = 128, UART_IER_MSI = 8, UART_IER_THRI = 2, UART_IER_RDI = 1, UART_IIR_MSI = 0, UART_IIR_NO_INT = 1, UART_IIR_THRI = 2, UART_IIR_RDI = 4, UART_IIR_RLSI = 6, UART_IIR_CTI = 12, UART_LSR_DATA_READY = 1, UART_LSR_TX_EMPTY = 32, UART_LSR_TRANSMITTER_EMPTY = 64;
function UART($cpu$jscomp$13_io$$, $port$$, $bus$$) {
  this.bus = $bus$$;
  this.cpu = $cpu$jscomp$13_io$$;
  this.ints = 1 << UART_IIR_THRI;
  this.line_control = this.baud_rate = 0;
  this.lsr = UART_LSR_TRANSMITTER_EMPTY | UART_LSR_TX_EMPTY;
  this.ier = this.fifo_control = 0;
  this.iir = UART_IIR_NO_INT;
  this.irq = this.scratch_register = this.modem_status = this.modem_control = 0;
  this.input = new ByteQueue(4096);
  this.current_line = "";
  switch($port$$) {
    case 1016:
      this.com = 0;
      this.irq = 4;
      break;
    case 760:
      this.com = 1;
      this.irq = 3;
      break;
    case 1E3:
      this.com = 2;
      this.irq = 4;
      break;
    case 744:
      this.irq = this.com = 3;
      break;
    default:
      dbg_log("Invalid serial port: " + h($port$$), LOG_SERIAL), this.com = 0, this.irq = 4;
  }
  this.bus.register("serial" + this.com + "-input", function($data$$) {
    this.data_received($data$$);
  }, this);
  $cpu$jscomp$13_io$$ = $cpu$jscomp$13_io$$.io;
  $cpu$jscomp$13_io$$.register_write($port$$, this, function($out_byte$$) {
    this.write_data($out_byte$$);
  }, function($out_word$$) {
    this.write_data($out_word$$ & 255);
    this.write_data($out_word$$ >> 8);
  });
  $cpu$jscomp$13_io$$.register_write($port$$ | 1, this, function($out_byte$$) {
    this.line_control & DLAB ? (this.baud_rate = this.baud_rate & 255 | $out_byte$$ << 8, dbg_log("baud rate: " + h(this.baud_rate), LOG_SERIAL)) : (0 === (this.ier & UART_IIR_THRI) && $out_byte$$ & UART_IIR_THRI && this.ThrowInterrupt(UART_IIR_THRI), this.ier = $out_byte$$ & 15, dbg_log("interrupt enable: " + h($out_byte$$), LOG_SERIAL), this.CheckInterrupt());
  });
  $cpu$jscomp$13_io$$.register_read($port$$, this, function() {
    if (this.line_control & DLAB) {
      return this.baud_rate & 255;
    }
    var $data$$ = this.input.shift();
    -1 === $data$$ ? dbg_log("Read input empty", LOG_SERIAL) : dbg_log("Read input: " + h($data$$), LOG_SERIAL);
    0 === this.input.length && (this.lsr &= ~UART_LSR_DATA_READY, this.ClearInterrupt(UART_IIR_CTI), this.ClearInterrupt(UART_IIR_RDI));
    return $data$$;
  });
  $cpu$jscomp$13_io$$.register_read($port$$ | 1, this, function() {
    return this.line_control & DLAB ? this.baud_rate >> 8 : this.ier & 15;
  });
  $cpu$jscomp$13_io$$.register_read($port$$ | 2, this, function() {
    var $ret$$ = this.iir & 15;
    dbg_log("read interrupt identification: " + h(this.iir), LOG_SERIAL);
    this.iir == UART_IIR_THRI && this.ClearInterrupt(UART_IIR_THRI);
    this.fifo_control & 1 && ($ret$$ |= 192);
    return $ret$$;
  });
  $cpu$jscomp$13_io$$.register_write($port$$ | 2, this, function($out_byte$$) {
    dbg_log("fifo control: " + h($out_byte$$), LOG_SERIAL);
    this.fifo_control = $out_byte$$;
  });
  $cpu$jscomp$13_io$$.register_read($port$$ | 3, this, function() {
    dbg_log("read line control: " + h(this.line_control), LOG_SERIAL);
    return this.line_control;
  });
  $cpu$jscomp$13_io$$.register_write($port$$ | 3, this, function($out_byte$$) {
    dbg_log("line control: " + h($out_byte$$), LOG_SERIAL);
    this.line_control = $out_byte$$;
  });
  $cpu$jscomp$13_io$$.register_read($port$$ | 4, this, function() {
    return this.modem_control;
  });
  $cpu$jscomp$13_io$$.register_write($port$$ | 4, this, function($out_byte$$) {
    dbg_log("modem control: " + h($out_byte$$), LOG_SERIAL);
    this.modem_control = $out_byte$$;
  });
  $cpu$jscomp$13_io$$.register_read($port$$ | 5, this, function() {
    dbg_log("read line status: " + h(this.lsr), LOG_SERIAL);
    return this.lsr;
  });
  $cpu$jscomp$13_io$$.register_write($port$$ | 5, this, function($out_byte$$) {
    dbg_log("Factory test write", LOG_SERIAL);
  });
  $cpu$jscomp$13_io$$.register_read($port$$ | 6, this, function() {
    dbg_log("read modem status: " + h(this.modem_status), LOG_SERIAL);
    return this.modem_status;
  });
  $cpu$jscomp$13_io$$.register_write($port$$ | 6, this, function($out_byte$$) {
    dbg_log("Unkown register write (base+6)", LOG_SERIAL);
  });
  $cpu$jscomp$13_io$$.register_read($port$$ | 7, this, function() {
    return this.scratch_register;
  });
  $cpu$jscomp$13_io$$.register_write($port$$ | 7, this, function($out_byte$$) {
    this.scratch_register = $out_byte$$;
  });
}
UART.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.ints;
  $state$$[1] = this.baud_rate;
  $state$$[2] = this.line_control;
  $state$$[3] = this.lsr;
  $state$$[4] = this.fifo_control;
  $state$$[5] = this.ier;
  $state$$[6] = this.iir;
  $state$$[7] = this.modem_control;
  $state$$[8] = this.modem_status;
  $state$$[9] = this.scratch_register;
  $state$$[10] = this.irq;
  return $state$$;
};
UART.prototype.set_state = function($state$$) {
  this.ints = $state$$[0];
  this.baud_rate = $state$$[1];
  this.line_control = $state$$[2];
  this.lsr = $state$$[3];
  this.fifo_control = $state$$[4];
  this.ier = $state$$[5];
  this.iir = $state$$[6];
  this.modem_control = $state$$[7];
  this.modem_status = $state$$[8];
  this.scratch_register = $state$$[9];
  this.irq = $state$$[10];
};
UART.prototype.CheckInterrupt = function() {
  this.ints & 1 << UART_IIR_CTI && this.ier & UART_IER_RDI ? (this.iir = UART_IIR_CTI, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << UART_IIR_RDI && this.ier & UART_IER_RDI ? (this.iir = UART_IIR_RDI, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << UART_IIR_THRI && this.ier & UART_IER_THRI ? (this.iir = UART_IIR_THRI, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << UART_IIR_MSI && this.ier & UART_IER_MSI ? (this.iir = UART_IIR_MSI, this.cpu.device_raise_irq(this.irq)) : 
  (this.iir = UART_IIR_NO_INT, this.cpu.device_lower_irq(this.irq));
};
UART.prototype.ThrowInterrupt = function($line$$) {
  this.ints |= 1 << $line$$;
  this.CheckInterrupt();
};
UART.prototype.ClearInterrupt = function($line$$) {
  this.ints &= ~(1 << $line$$);
  this.CheckInterrupt();
};
UART.prototype.data_received = function($data$$) {
  dbg_log("input: " + h($data$$), LOG_SERIAL);
  this.input.push($data$$);
  this.lsr |= UART_LSR_DATA_READY;
  this.fifo_control & 1 ? this.ThrowInterrupt(UART_IIR_CTI) : this.ThrowInterrupt(UART_IIR_RDI);
};
UART.prototype.write_data = function($char_line$jscomp$4_out_byte$$) {
  this.line_control & DLAB ? this.baud_rate = this.baud_rate & -256 | $char_line$jscomp$4_out_byte$$ : (dbg_log("data: " + h($char_line$jscomp$4_out_byte$$), LOG_SERIAL), this.ThrowInterrupt(UART_IIR_THRI), 255 !== $char_line$jscomp$4_out_byte$$ && ($char_line$jscomp$4_out_byte$$ = String.fromCharCode($char_line$jscomp$4_out_byte$$), this.bus.send("serial" + this.com + "-output-char", $char_line$jscomp$4_out_byte$$), DEBUG && (this.current_line += $char_line$jscomp$4_out_byte$$, "\n" === $char_line$jscomp$4_out_byte$$ && 
  ($char_line$jscomp$4_out_byte$$ = this.current_line.trimRight().replace(/[\x00-\x08\x0b-\x1f\x7f\x80-\xff]/g, ""), dbg_log("SERIAL: " + $char_line$jscomp$4_out_byte$$), this.current_line = ""))));
};
var HPET_ADDR = 4275044352, HPET_PERIOD = 1E8, HPET_FREQ_MS = 1e12 / HPET_PERIOD, HPET_SUPPORT_64 = 0, HPET_COUNTER_CONFIG = 16 | HPET_SUPPORT_64 << 5, HPET_COUNTER_CONFIG_MASK = 32816, HPET_NUM_COUNTERS = 4;
function HPET($cpu$$) {
  function $get_counter$$() {
    return $hpet_enabled$$ ? (Date.now() - $hpet_start$$) * HPET_FREQ_MS + $hpet_offset_low$$ | 0 : $hpet_offset_low$$;
  }
  function $get_counter_high$$() {
    return HPET_SUPPORT_64 ? $hpet_enabled$$ ? (Date.now() - $hpet_start$$) * (HPET_FREQ_MS / 4294967296) + $hpet_offset_high$$ | 0 : $hpet_offset_high$$ : 0;
  }
  var $me$$ = this, $hpet_enabled$$ = !1, $hpet_start$$ = Date.now(), $hpet_offset_low$$ = 0, $hpet_offset_high$$ = 0, $counter_read_acc_next$$ = !1, $interrupt_status$$ = 0, $counter_config$$ = new Int32Array(HPET_NUM_COUNTERS << 1), $counter_comparator$$ = new Int32Array(HPET_NUM_COUNTERS << 1), $counter_accumulator$$ = new Int32Array(HPET_NUM_COUNTERS << 1), $last_check$$ = 0;
  this.legacy_mode = !1;
  this.timer = function($counter_value_now$$) {
    if (!$hpet_enabled$$) {
      return 100;
    }
    $counter_value_now$$ = $get_counter$$() >>> 0;
    for (var $config$$, $comparator_do_irq$$, $i$$ = 0; $i$$ < HPET_NUM_COUNTERS; $i$$++) {
      if ($config$$ = $counter_config$$[$i$$ << 1], $comparator_do_irq$$ = $counter_comparator$$[$i$$ << 1] >>> 0, $last_check$$ <= $counter_value_now$$ ? $comparator_do_irq$$ > $last_check$$ && $comparator_do_irq$$ <= $counter_value_now$$ : $comparator_do_irq$$ > $last_check$$ || $comparator_do_irq$$ <= $counter_value_now$$) {
        $comparator_do_irq$$ = $config$$ & 4, $config$$ & 2 ? ($comparator_do_irq$$ = $comparator_do_irq$$ && !($interrupt_status$$ & 1 << $i$$), $interrupt_status$$ |= 1 << $i$$) : $interrupt_status$$ &= ~(1 << $i$$), $config$$ & 8 && ($counter_comparator$$[$i$$ << 1] += $counter_accumulator$$[$i$$ << 1]), $comparator_do_irq$$ && $cpu$$.device_raise_irq(0);
      }
    }
    $last_check$$ = $counter_value_now$$;
    return 100;
  };
  $cpu$$.io.mmap_register(HPET_ADDR, 16384, function($addr$$) {
    dbg_log("Read " + h($addr$$, 4) + " (ctr=" + h($get_counter$$() >>> 0) + ")", LOG_HPET);
    switch($addr$$) {
      case 0:
        return HPET_NUM_COUNTERS - 1 << 8 | 98305 | HPET_SUPPORT_64 << 13;
      case 4:
        return HPET_PERIOD;
      case 16:
        return $me$$.legacy_mode << 1 | $hpet_enabled$$;
      case 240:
        return $get_counter$$();
      case 244:
        return $get_counter_high$$();
    }
    var $register$$ = $addr$$ >> 2 & 7, $counter$$ = $addr$$ - 256 >> 5;
    if (256 > $addr$$ || $counter$$ >= HPET_NUM_COUNTERS || 5 < $register$$) {
      return dbg_log("Read reserved address: " + h($addr$$), LOG_HPET), 0;
    }
    dbg_log("Read counter: addr=" + h($addr$$) + " counter=" + h($counter$$, 2) + " reg=" + h($register$$), LOG_HPET);
    switch($register$$) {
      case 0:
        return $counter_config$$[$counter$$ << 1] & ~HPET_COUNTER_CONFIG_MASK | HPET_COUNTER_CONFIG;
      case 1:
        return $counter_config$$[$counter$$ << 1 | 1];
      case 2:
        return $counter_comparator$$[$counter$$ << 1];
      case 3:
        return $counter_comparator$$[$counter$$ << 1 | 1];
      case 4:
      case 5:
        return 0;
    }
  }, function($addr$$, $data$$) {
    dbg_log("Write " + h($addr$$, 4) + ": " + h($data$$, 2), LOG_HPET);
    switch($addr$$) {
      case 16:
        dbg_log("conf: enabled=" + ($data$$ & 1) + " legacy=" + ($data$$ >> 1 & 1), LOG_HPET);
        ($hpet_enabled$$ ^ $data$$) & 1 && ($data$$ & 1 ? $hpet_start$$ = Date.now() : ($hpet_offset_low$$ = $get_counter$$(), $hpet_offset_high$$ = $get_counter_high$$()));
        $hpet_enabled$$ = 1 === ($data$$ & 1);
        $me$$.legacy_mode = 2 === ($data$$ & 2);
        return;
      case 32:
        $interrupt_status$$ &= ~$data$$;
        return;
      case 240:
        $hpet_offset_low$$ = $data$$;
        return;
      case 244:
        $hpet_offset_high$$ = $data$$;
        return;
    }
    var $register$$ = $addr$$ >> 2 & 7, $counter$$ = $addr$$ - 256 >> 5;
    if (256 > $addr$$ || $counter$$ >= HPET_NUM_COUNTERS || 2 < $register$$) {
      dbg_log("Write reserved address: " + h($addr$$) + " data=" + h($data$$), LOG_HPET);
    } else {
      switch(dbg_log("Write counter: addr=" + h($addr$$) + " counter=" + h($counter$$, 2) + " reg=" + h($register$$) + " data=" + h($data$$, 2), LOG_HPET), $register$$) {
        case 0:
          $counter_config$$[$counter$$ << 1] = $data$$;
          break;
        case 2:
          $counter_read_acc_next$$ ? ($counter_accumulator$$[$counter$$ << 1] = $data$$, $counter_read_acc_next$$ = !1, dbg_log("Accumulator acc=" + h($data$$ >>> 0, 8) + " ctr=" + h($counter$$, 2), LOG_HPET)) : ($counter_comparator$$[$counter$$ << 1] = $data$$, $counter_config$$[$counter$$ << 1] & 64 && ($counter_read_acc_next$$ = !0, $counter_config$$[$counter$$ << 1] &= -65));
          break;
        case 3:
          $counter_comparator$$[$counter$$ << 1 | 1] = $data$$;
      }
    }
  });
}
;var PMTIMER_FREQ_SECONDS = 3579545;
function ACPI($cpu$$) {
  this.cpu = $cpu$$;
  var $io$$ = $cpu$$.io;
  $cpu$$.devices.pci.register_device({pci_id:56, pci_space:[134, 128, 19, 113, 7, 0, 128, 2, 8, 0, 128, 6, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, ], pci_bars:[], name:"acpi", });
  this.timer_imprecision_offset = this.timer_last_value = 0;
  this.status = 1;
  this.pm1_enable = this.pm1_status = 0;
  this.last_timer = this.get_timer(v86.microtick());
  this.gpe = new Uint8Array(4);
  $io$$.register_read(45056, this, void 0, function() {
    dbg_log("ACPI pm1_status read", LOG_ACPI);
    return this.pm1_status;
  });
  $io$$.register_write(45056, this, void 0, function($value$$) {
    dbg_log("ACPI pm1_status write: " + h($value$$, 4), LOG_ACPI);
    this.pm1_status &= ~$value$$;
  });
  $io$$.register_read(45058, this, void 0, function() {
    dbg_log("ACPI pm1_enable read", LOG_ACPI);
    return this.pm1_enable;
  });
  $io$$.register_write(45058, this, void 0, function($value$$) {
    dbg_log("ACPI pm1_enable write: " + h($value$$), LOG_ACPI);
    this.pm1_enable = $value$$;
  });
  $io$$.register_read(45060, this, void 0, function() {
    dbg_log("ACPI status read", LOG_ACPI);
    return this.status;
  });
  $io$$.register_write(45060, this, void 0, function($value$$) {
    dbg_log("ACPI status write: " + h($value$$), LOG_ACPI);
    this.status = $value$$;
  });
  $io$$.register_read(45064, this, void 0, void 0, function() {
    return this.get_timer(v86.microtick()) & 16777215;
  });
  $io$$.register_read(45024, this, function() {
    dbg_log("Read gpe#0", LOG_ACPI);
    return this.gpe[0];
  });
  $io$$.register_read(45025, this, function() {
    dbg_log("Read gpe#1", LOG_ACPI);
    return this.gpe[1];
  });
  $io$$.register_read(45026, this, function() {
    dbg_log("Read gpe#2", LOG_ACPI);
    return this.gpe[2];
  });
  $io$$.register_read(45027, this, function() {
    dbg_log("Read gpe#3", LOG_ACPI);
    return this.gpe[3];
  });
  $io$$.register_write(45024, this, function($value$$) {
    dbg_log("Write gpe#0: " + h($value$$), LOG_ACPI);
    this.gpe[0] = $value$$;
  });
  $io$$.register_write(45025, this, function($value$$) {
    dbg_log("Write gpe#1: " + h($value$$), LOG_ACPI);
    this.gpe[1] = $value$$;
  });
  $io$$.register_write(45026, this, function($value$$) {
    dbg_log("Write gpe#2: " + h($value$$), LOG_ACPI);
    this.gpe[2] = $value$$;
  });
  $io$$.register_write(45027, this, function($value$$) {
    dbg_log("Write gpe#3: " + h($value$$), LOG_ACPI);
    this.gpe[3] = $value$$;
  });
}
ACPI.prototype.timer = function($now$$) {
  $now$$ = this.get_timer($now$$);
  var $highest_bit_changed$$ = 0 !== (($now$$ ^ this.last_timer) & 8388608);
  this.pm1_enable & 1 && $highest_bit_changed$$ ? (dbg_log("ACPI raise irq", LOG_ACPI), this.pm1_status |= 1, this.cpu.device_raise_irq(9)) : this.cpu.device_lower_irq(9);
  this.last_timer = $now$$;
  return 100;
};
ACPI.prototype.get_timer = function($now$jscomp$8_t$$) {
  $now$jscomp$8_t$$ = Math.round(PMTIMER_FREQ_SECONDS / 1000 * $now$jscomp$8_t$$);
  $now$jscomp$8_t$$ === this.timer_last_value ? this.timer_imprecision_offset < PMTIMER_FREQ_SECONDS / 1000 && this.timer_imprecision_offset++ : (dbg_assert($now$jscomp$8_t$$ > this.timer_last_value), this.timer_last_value + this.timer_imprecision_offset <= $now$jscomp$8_t$$ ? (this.timer_imprecision_offset = 0, this.timer_last_value = $now$jscomp$8_t$$) : dbg_log("Warning: Overshot pmtimer, waiting; current=" + $now$jscomp$8_t$$ + " last=" + this.timer_last_value + " offset=" + this.timer_imprecision_offset, 
  LOG_ACPI));
  return this.timer_last_value + this.timer_imprecision_offset;
};
ACPI.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.status;
  $state$$[1] = this.pm1_status;
  $state$$[2] = this.pm1_enable;
  $state$$[3] = this.gpe;
  return $state$$;
};
ACPI.prototype.set_state = function($state$$) {
  this.status = $state$$[0];
  this.pm1_status = $state$$[1];
  this.pm1_enable = $state$$[2];
  this.gpe = $state$$[3];
};
var APIC_LOG_VERBOSE = !1, APIC_ADDRESS = 4276092928, APIC_TIMER_MODE_MASK = 393216, APIC_TIMER_MODE_ONE_SHOT = 0, APIC_TIMER_MODE_PERIODIC = 131072, APIC_TIMER_MODE_TSC = 262144, DELIVERY_MODES = "Fixed (0);Lowest Prio (1);SMI (2);Reserved (3);NMI (4);INIT (5);Reserved (6);ExtINT (7)".split(";"), DESTINATION_MODES = ["physical", "logical"];
function APIC($cpu$$) {
  this.cpu = $cpu$$;
  this.timer_divider = this.apic_id = 0;
  this.timer_divider_shift = 1;
  this.timer_current_count = this.timer_initial_count = 0;
  this.next_tick = v86.microtick();
  this.lvt_error = this.lvt_int1 = this.lvt_int0 = this.lvt_perf_counter = this.lvt_timer = IOAPIC_CONFIG_MASKED;
  this.icr1 = this.icr0 = this.tpr = 0;
  this.irr = new Int32Array(8);
  this.isr = new Int32Array(8);
  this.tmr = new Int32Array(8);
  this.spurious_vector = 254;
  this.destination_format = -1;
  this.read_error = this.error = this.local_destination = 0;
  $cpu$$.io.mmap_register(APIC_ADDRESS, 1048576, $addr$$ => {
    dbg_log("Unsupported read8 from apic: " + h($addr$$ >>> 0), LOG_APIC);
    var $off$$ = $addr$$ & 3;
    return this.read32($addr$$ & -4) >> 8 * $off$$ & 255;
  }, ($addr$$, $value$$) => {
    dbg_log("Unsupported write8 from apic: " + h($addr$$) + " <- " + h($value$$), LOG_APIC);
    dbg_trace();
    dbg_assert(!1);
  }, $addr$$ => this.read32($addr$$), ($addr$$, $value$$) => this.write32($addr$$, $value$$));
}
APIC.prototype.read32 = function($addr$jscomp$39_index$$) {
  $addr$jscomp$39_index$$ = $addr$jscomp$39_index$$ - APIC_ADDRESS | 0;
  switch($addr$jscomp$39_index$$) {
    case 32:
      return dbg_log("APIC read id", LOG_APIC), this.apic_id;
    case 48:
      return dbg_log("APIC read version", LOG_APIC), 327700;
    case 128:
      return APIC_LOG_VERBOSE && dbg_log("APIC read tpr", LOG_APIC), this.tpr;
    case 208:
      return dbg_log("Read local destination", LOG_APIC), this.local_destination;
    case 224:
      return dbg_log("Read destination format", LOG_APIC), this.destination_format;
    case 240:
      return this.spurious_vector;
    case 256:
    case 272:
    case 288:
    case 304:
    case 320:
    case 336:
    case 352:
    case 368:
      return $addr$jscomp$39_index$$ = $addr$jscomp$39_index$$ - 256 >> 4, dbg_log("Read isr " + $addr$jscomp$39_index$$ + ": " + h(this.isr[$addr$jscomp$39_index$$] >>> 0, 8), LOG_APIC), this.isr[$addr$jscomp$39_index$$];
    case 384:
    case 400:
    case 416:
    case 432:
    case 448:
    case 464:
    case 480:
    case 496:
      return $addr$jscomp$39_index$$ = $addr$jscomp$39_index$$ - 384 >> 4, dbg_log("Read tmr " + $addr$jscomp$39_index$$ + ": " + h(this.tmr[$addr$jscomp$39_index$$] >>> 0, 8), LOG_APIC), this.tmr[$addr$jscomp$39_index$$];
    case 512:
    case 528:
    case 544:
    case 560:
    case 576:
    case 592:
    case 608:
    case 624:
      return $addr$jscomp$39_index$$ = $addr$jscomp$39_index$$ - 512 >> 4, dbg_log("Read irr " + $addr$jscomp$39_index$$ + ": " + h(this.irr[$addr$jscomp$39_index$$] >>> 0, 8), LOG_APIC), this.irr[$addr$jscomp$39_index$$];
    case 640:
      return dbg_log("Read error: " + h(this.read_error >>> 0, 8), LOG_APIC), this.read_error;
    case 768:
      return APIC_LOG_VERBOSE && dbg_log("APIC read icr0", LOG_APIC), this.icr0;
    case 784:
      return dbg_log("APIC read icr1", LOG_APIC), this.icr1;
    case 800:
      return dbg_log("read timer lvt", LOG_APIC), this.lvt_timer;
    case 832:
      return dbg_log("read lvt perf counter", LOG_APIC), this.lvt_perf_counter;
    case 848:
      return dbg_log("read lvt int0", LOG_APIC), this.lvt_int0;
    case 864:
      return dbg_log("read lvt int1", LOG_APIC), this.lvt_int1;
    case 880:
      return dbg_log("read lvt error", LOG_APIC), this.lvt_error;
    case 992:
      return dbg_log("read timer divider", LOG_APIC), this.timer_divider;
    case 896:
      return dbg_log("read timer initial count", LOG_APIC), this.timer_initial_count;
    case 912:
      return dbg_log("read timer current count: " + h(this.timer_current_count >>> 0, 8), LOG_APIC), this.timer_current_count;
    default:
      return dbg_log("APIC read " + h($addr$jscomp$39_index$$), LOG_APIC), dbg_assert(!1), 0;
  }
};
APIC.prototype.write32 = function($addr$$, $divide_shift_value$$) {
  $addr$$ = $addr$$ - APIC_ADDRESS | 0;
  switch($addr$$) {
    case 48:
      dbg_log("APIC write version: " + h($divide_shift_value$$ >>> 0, 8) + ", ignored", LOG_APIC);
      break;
    case 128:
      APIC_LOG_VERBOSE && dbg_log("Set tpr: " + h($divide_shift_value$$ & 255, 2), LOG_APIC);
      this.tpr = $divide_shift_value$$ & 255;
      this.check_vector();
      break;
    case 176:
      $addr$$ = this.highest_isr();
      -1 !== $addr$$ ? (APIC_LOG_VERBOSE && dbg_log("eoi: " + h($divide_shift_value$$ >>> 0, 8) + " for vector " + h($addr$$), LOG_APIC), this.register_clear_bit(this.isr, $addr$$), this.register_get_bit(this.tmr, $addr$$) && this.cpu.devices.ioapic.remote_eoi($addr$$), this.check_vector()) : dbg_log("Bad eoi: No isr set", LOG_APIC);
      break;
    case 208:
      dbg_log("Set local destination: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.local_destination = $divide_shift_value$$ & 4278190080;
      break;
    case 224:
      dbg_log("Set destination format: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.destination_format = $divide_shift_value$$ | 16777215;
      break;
    case 240:
      dbg_log("Set spurious vector: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.spurious_vector = $divide_shift_value$$;
      break;
    case 640:
      dbg_log("Write error: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.read_error = this.error;
      this.error = 0;
      break;
    case 768:
      $addr$$ = $divide_shift_value$$ & 255;
      var $delivery_mode$$ = $divide_shift_value$$ >> 8 & 7, $destination_mode$$ = $divide_shift_value$$ >> 11 & 1, $is_level$$ = $divide_shift_value$$ >> 15 & 1, $destination_shorthand$$ = $divide_shift_value$$ >> 18 & 3, $destination$$ = this.icr1 >>> 24;
      dbg_log("APIC write icr0: " + h($divide_shift_value$$, 8) + " vector=" + h($addr$$, 2) + " destination_mode=" + DESTINATION_MODES[$destination_mode$$] + " delivery_mode=" + DELIVERY_MODES[$delivery_mode$$] + " destination_shorthand=" + ["no", "self", "all with self", "all without self"][$destination_shorthand$$], LOG_APIC);
      this.icr0 = $divide_shift_value$$ & -4097;
      0 === $destination_shorthand$$ ? this.route($addr$$, $delivery_mode$$, $is_level$$, $destination$$, $destination_mode$$) : 1 === $destination_shorthand$$ ? this.deliver($addr$$, IOAPIC_DELIVERY_FIXED, $is_level$$) : 2 === $destination_shorthand$$ ? this.deliver($addr$$, $delivery_mode$$, $is_level$$) : 3 !== $destination_shorthand$$ && dbg_assert(!1);
      break;
    case 784:
      dbg_log("APIC write icr1: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.icr1 = $divide_shift_value$$;
      break;
    case 800:
      dbg_log("timer lvt: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.lvt_timer = $divide_shift_value$$;
      break;
    case 832:
      dbg_log("lvt perf counter: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.lvt_perf_counter = $divide_shift_value$$;
      break;
    case 848:
      dbg_log("lvt int0: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.lvt_int0 = $divide_shift_value$$;
      break;
    case 864:
      dbg_log("lvt int1: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.lvt_int1 = $divide_shift_value$$;
      break;
    case 880:
      dbg_log("lvt error: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.lvt_error = $divide_shift_value$$;
      break;
    case 992:
      dbg_log("timer divider: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.timer_divider = $divide_shift_value$$;
      $divide_shift_value$$ = $divide_shift_value$$ & 3 | ($divide_shift_value$$ & 8) >> 1;
      this.timer_divider_shift = 7 === $divide_shift_value$$ ? 0 : $divide_shift_value$$ + 1;
      break;
    case 896:
      dbg_log("timer initial: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      this.timer_initial_count = $divide_shift_value$$ >>> 0;
      this.timer_current_count = $divide_shift_value$$ >>> 0;
      this.next_tick = v86.microtick();
      this.timer_active = !0;
      break;
    case 912:
      dbg_log("timer current: " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC);
      dbg_assert(!1, "read-only register");
      break;
    default:
      dbg_log("APIC write32 " + h($addr$$) + " <- " + h($divide_shift_value$$ >>> 0, 8), LOG_APIC), dbg_assert(!1);
  }
};
APIC.prototype.timer = function($mode$jscomp$19_now$$) {
  if (0 === this.timer_current_count) {
    return 100;
  }
  const $freq$$ = TSC_RATE / (1 << this.timer_divider_shift);
  $mode$jscomp$19_now$$ = ($mode$jscomp$19_now$$ - this.next_tick) * $freq$$ >>> 0;
  this.next_tick += $mode$jscomp$19_now$$ / $freq$$;
  this.timer_current_count -= $mode$jscomp$19_now$$;
  0 >= this.timer_current_count && ($mode$jscomp$19_now$$ = this.lvt_timer & APIC_TIMER_MODE_MASK, $mode$jscomp$19_now$$ === APIC_TIMER_MODE_PERIODIC ? (this.timer_current_count %= this.timer_initial_count, 0 >= this.timer_current_count && (this.timer_current_count += this.timer_initial_count), dbg_assert(0 !== this.timer_current_count), 0 === (this.lvt_timer & IOAPIC_CONFIG_MASKED) && this.deliver(this.lvt_timer & 255, IOAPIC_DELIVERY_FIXED, !1)) : $mode$jscomp$19_now$$ === APIC_TIMER_MODE_ONE_SHOT && 
  (this.timer_current_count = 0, dbg_log("APIC timer one shot end", LOG_APIC), 0 === (this.lvt_timer & IOAPIC_CONFIG_MASKED) && this.deliver(this.lvt_timer & 255, IOAPIC_DELIVERY_FIXED, !1)));
  return Math.max(0, this.timer_current_count / $freq$$);
};
APIC.prototype.route = function($vector$$, $mode$$, $is_level$$, $destination$$, $destination_mode$$) {
  this.deliver($vector$$, $mode$$, $is_level$$);
};
APIC.prototype.deliver = function($vector$$, $mode$$, $is_level$$) {
  APIC_LOG_VERBOSE && dbg_log("Deliver " + h($vector$$, 2) + " mode=" + $mode$$ + " level=" + $is_level$$, LOG_APIC);
  $mode$$ !== IOAPIC_DELIVERY_INIT && $mode$$ !== IOAPIC_DELIVERY_NMI && ((16 > $vector$$ || 255 === $vector$$) && dbg_assert(!1, "TODO: Invalid vector"), this.register_get_bit(this.irr, $vector$$) ? dbg_log("Not delivered: irr already set, vector=" + h($vector$$, 2), LOG_APIC) : (this.register_set_bit(this.irr, $vector$$), $is_level$$ ? this.register_set_bit(this.tmr, $vector$$) : this.register_clear_bit(this.tmr, $vector$$), this.check_vector()));
};
APIC.prototype.highest_irr = function() {
  var $highest$$ = this.register_get_highest_bit(this.irr);
  dbg_assert(255 !== $highest$$);
  dbg_assert(16 <= $highest$$ || -1 === $highest$$);
  return $highest$$;
};
APIC.prototype.highest_isr = function() {
  var $highest$$ = this.register_get_highest_bit(this.isr);
  dbg_assert(255 !== $highest$$);
  dbg_assert(16 <= $highest$$ || -1 === $highest$$);
  return $highest$$;
};
APIC.prototype.check_vector = function() {
  var $highest_irr$$ = this.highest_irr();
  if (-1 !== $highest_irr$$) {
    var $highest_isr$$ = this.highest_isr();
    $highest_isr$$ >= $highest_irr$$ ? APIC_LOG_VERBOSE && dbg_log("Higher isr, isr=" + h($highest_isr$$) + " irr=" + h($highest_irr$$), LOG_APIC) : ($highest_irr$$ & 240) <= (this.tpr & 240) ? APIC_LOG_VERBOSE && dbg_log("Higher tpr, tpr=" + h(this.tpr & 240) + " irr=" + h($highest_irr$$), LOG_APIC) : this.cpu.handle_irqs();
  }
};
APIC.prototype.acknowledge_irq = function() {
  var $highest_irr$$ = this.highest_irr();
  if (-1 !== $highest_irr$$) {
    var $highest_isr$$ = this.highest_isr();
    $highest_isr$$ >= $highest_irr$$ ? APIC_LOG_VERBOSE && dbg_log("Higher isr, isr=" + h($highest_isr$$) + " irr=" + h($highest_irr$$), LOG_APIC) : ($highest_irr$$ & 240) <= (this.tpr & 240) ? APIC_LOG_VERBOSE && dbg_log("Higher tpr, tpr=" + h(this.tpr & 240) + " irr=" + h($highest_irr$$), LOG_APIC) : (this.register_clear_bit(this.irr, $highest_irr$$), this.register_set_bit(this.isr, $highest_irr$$), APIC_LOG_VERBOSE && dbg_log("Calling vector " + h($highest_irr$$), LOG_APIC), this.cpu.pic_call_irq($highest_irr$$), 
    this.check_vector());
  }
};
APIC.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.apic_id;
  $state$$[1] = this.timer_divider;
  $state$$[2] = this.timer_divider_shift;
  $state$$[3] = this.timer_initial_count;
  $state$$[4] = this.timer_current_count;
  $state$$[5] = this.next_tick;
  $state$$[6] = this.lvt_timer;
  $state$$[7] = this.lvt_perf_counter;
  $state$$[8] = this.lvt_int0;
  $state$$[9] = this.lvt_int1;
  $state$$[10] = this.lvt_error;
  $state$$[11] = this.tpr;
  $state$$[12] = this.icr0;
  $state$$[13] = this.icr1;
  $state$$[14] = this.irr;
  $state$$[15] = this.isr;
  $state$$[16] = this.tmr;
  $state$$[17] = this.spurious_vector;
  $state$$[18] = this.destination_format;
  $state$$[19] = this.local_destination;
  $state$$[20] = this.error;
  $state$$[21] = this.read_error;
  return $state$$;
};
APIC.prototype.set_state = function($state$$) {
  this.apic_id = $state$$[0];
  this.timer_divider = $state$$[1];
  this.timer_divider_shift = $state$$[2];
  this.timer_initial_count = $state$$[3];
  this.timer_current_count = $state$$[4];
  this.next_tick = $state$$[5];
  this.lvt_timer = $state$$[6];
  this.lvt_perf_counter = $state$$[7];
  this.lvt_int0 = $state$$[8];
  this.lvt_int1 = $state$$[9];
  this.lvt_error = $state$$[10];
  this.tpr = $state$$[11];
  this.icr0 = $state$$[12];
  this.icr1 = $state$$[13];
  this.irr = $state$$[14];
  this.isr = $state$$[15];
  this.tmr = $state$$[16];
  this.spurious_vector = $state$$[17];
  this.destination_format = $state$$[18];
  this.local_destination = $state$$[19];
  this.error = $state$$[20];
  this.read_error = $state$$[21];
};
APIC.prototype.register_get_bit = function($v$$, $bit$$) {
  dbg_assert(0 <= $bit$$ && 256 > $bit$$);
  return $v$$[$bit$$ >> 5] >> ($bit$$ & 31) & 1;
};
APIC.prototype.register_set_bit = function($v$$, $bit$$) {
  dbg_assert(0 <= $bit$$ && 256 > $bit$$);
  $v$$[$bit$$ >> 5] |= 1 << ($bit$$ & 31);
};
APIC.prototype.register_clear_bit = function($v$$, $bit$$) {
  dbg_assert(0 <= $bit$$ && 256 > $bit$$);
  $v$$[$bit$$ >> 5] &= ~(1 << ($bit$$ & 31));
};
APIC.prototype.register_get_highest_bit = function($v$$) {
  for (var $i$$ = 7; 0 <= $i$$; $i$$--) {
    var $word$$ = $v$$[$i$$];
    if ($word$$) {
      return v86util.int_log2($word$$ >>> 0) | $i$$ << 5;
    }
  }
  return -1;
};
var IOAPIC_ADDRESS = 4273995776, IOREGSEL = 0, IOWIN = 16, IOAPIC_IRQ_COUNT = 24, IOAPIC_ID = 0, IOAPIC_CONFIG_TRIGGER_MODE_LEVEL = 32768, IOAPIC_CONFIG_MASKED = 65536, IOAPIC_CONFIG_DELIVS = 4096, IOAPIC_CONFIG_REMOTE_IRR = 16384, IOAPIC_CONFIG_READONLY_MASK = IOAPIC_CONFIG_REMOTE_IRR | IOAPIC_CONFIG_DELIVS | 4294836224, IOAPIC_DELIVERY_FIXED = 0, IOAPIC_DELIVERY_LOWEST_PRIORITY = 1, IOAPIC_DELIVERY_NMI = 4, IOAPIC_DELIVERY_INIT = 5;
function IOAPIC($cpu$$) {
  this.cpu = $cpu$$;
  this.ioredtbl_config = new Int32Array(IOAPIC_IRQ_COUNT);
  this.ioredtbl_destination = new Int32Array(IOAPIC_IRQ_COUNT);
  for (var $i$$ = 0; $i$$ < this.ioredtbl_config.length; $i$$++) {
    this.ioredtbl_config[$i$$] = IOAPIC_CONFIG_MASKED;
  }
  this.ioregsel = 0;
  this.ioapic_id = IOAPIC_ID;
  this.irq_value = this.irr = 0;
  dbg_assert(32 <= MMAP_BLOCK_SIZE);
  $cpu$$.io.mmap_register(IOAPIC_ADDRESS, MMAP_BLOCK_SIZE, $addr$$ => {
    $addr$$ = $addr$$ - IOAPIC_ADDRESS | 0;
    if ($addr$$ >= IOWIN && $addr$$ < IOWIN + 4) {
      return $addr$$ -= IOWIN, dbg_log("ioapic read8 byte " + $addr$$ + " " + h(this.ioregsel), LOG_APIC), this.read(this.ioregsel) >> 8 * $addr$$ & 255;
    }
    dbg_log("Unexpected IOAPIC register read: " + h($addr$$ >>> 0), LOG_APIC);
    dbg_assert(!1);
    return 0;
  }, ($addr$$, $value$$) => {
    dbg_assert(!1, "unsupported write8 from ioapic: " + h($addr$$ >>> 0));
  }, $addr$$ => {
    $addr$$ = $addr$$ - IOAPIC_ADDRESS | 0;
    if ($addr$$ === IOREGSEL) {
      return this.ioregsel;
    }
    if ($addr$$ === IOWIN) {
      return this.read(this.ioregsel);
    }
    dbg_log("Unexpected IOAPIC register read: " + h($addr$$ >>> 0), LOG_APIC);
    dbg_assert(!1);
    return 0;
  }, ($addr$$, $value$$) => {
    $addr$$ = $addr$$ - IOAPIC_ADDRESS | 0;
    $addr$$ === IOREGSEL ? this.ioregsel = $value$$ : $addr$$ === IOWIN ? this.write(this.ioregsel, $value$$) : (dbg_log("Unexpected IOAPIC register write: " + h($addr$$ >>> 0) + " <- " + h($value$$ >>> 0, 8), LOG_APIC), dbg_assert(!1));
  });
}
IOAPIC.prototype.remote_eoi = function($vector$$) {
  for (var $i$$ = 0; $i$$ < IOAPIC_IRQ_COUNT; $i$$++) {
    var $config$$ = this.ioredtbl_config[$i$$];
    ($config$$ & 255) === $vector$$ && $config$$ & IOAPIC_CONFIG_REMOTE_IRR && (dbg_log("Clear remote IRR for irq=" + h($i$$), LOG_APIC), this.ioredtbl_config[$i$$] &= ~IOAPIC_CONFIG_REMOTE_IRR, this.check_irq($i$$));
  }
};
IOAPIC.prototype.check_irq = function($irq$$) {
  var $mask$$ = 1 << $irq$$;
  if (0 !== (this.irr & $mask$$)) {
    var $config$$ = this.ioredtbl_config[$irq$$];
    if (0 === ($config$$ & IOAPIC_CONFIG_MASKED)) {
      var $delivery_mode$$ = $config$$ >> 8 & 7, $destination_mode$$ = $config$$ >> 11 & 1, $vector$$ = $config$$ & 255, $destination$$ = this.ioredtbl_destination[$irq$$] >>> 24, $is_level$$ = ($config$$ & IOAPIC_CONFIG_TRIGGER_MODE_LEVEL) === IOAPIC_CONFIG_TRIGGER_MODE_LEVEL;
      if (0 === ($config$$ & IOAPIC_CONFIG_TRIGGER_MODE_LEVEL)) {
        this.irr &= ~$mask$$;
      } else {
        if (this.ioredtbl_config[$irq$$] |= IOAPIC_CONFIG_REMOTE_IRR, $config$$ & IOAPIC_CONFIG_REMOTE_IRR) {
          dbg_log("No route: level interrupt and remote IRR still set", LOG_APIC);
          return;
        }
      }
      $delivery_mode$$ === IOAPIC_DELIVERY_FIXED || $delivery_mode$$ === IOAPIC_DELIVERY_LOWEST_PRIORITY ? this.cpu.devices.apic.route($vector$$, $delivery_mode$$, $is_level$$, $destination$$, $destination_mode$$) : dbg_assert(!1, "TODO");
      this.ioredtbl_config[$irq$$] &= ~IOAPIC_CONFIG_DELIVS;
    }
  }
};
IOAPIC.prototype.set_irq = function($i$$) {
  if ($i$$ >= IOAPIC_IRQ_COUNT) {
    dbg_assert(!1, "Bad irq: " + $i$$, LOG_APIC);
  } else {
    var $mask$$ = 1 << $i$$;
    0 === (this.irq_value & $mask$$) && (APIC_LOG_VERBOSE && dbg_log("apic set irq " + $i$$, LOG_APIC), this.irq_value |= $mask$$, (this.ioredtbl_config[$i$$] & (IOAPIC_CONFIG_TRIGGER_MODE_LEVEL | IOAPIC_CONFIG_MASKED)) !== IOAPIC_CONFIG_MASKED && (this.irr |= $mask$$, this.check_irq($i$$)));
  }
};
IOAPIC.prototype.clear_irq = function($i$$) {
  if ($i$$ >= IOAPIC_IRQ_COUNT) {
    dbg_assert(!1, "Bad irq: " + $i$$, LOG_APIC);
  } else {
    var $mask$$ = 1 << $i$$;
    (this.irq_value & $mask$$) === $mask$$ && (this.irq_value &= ~$mask$$, this.ioredtbl_config[$i$$] & IOAPIC_CONFIG_TRIGGER_MODE_LEVEL && (this.irr &= ~$mask$$));
  }
};
IOAPIC.prototype.read = function($reg$jscomp$1_value$$) {
  if (0 === $reg$jscomp$1_value$$) {
    return dbg_log("IOAPIC Read id", LOG_APIC), this.ioapic_id << 24;
  }
  if (1 === $reg$jscomp$1_value$$) {
    return dbg_log("IOAPIC Read version", LOG_APIC), 17 | IOAPIC_IRQ_COUNT - 1 << 16;
  }
  if (2 === $reg$jscomp$1_value$$) {
    return dbg_log("IOAPIC Read arbitration id", LOG_APIC), this.ioapic_id << 24;
  }
  if (16 <= $reg$jscomp$1_value$$ && $reg$jscomp$1_value$$ < 16 + 2 * IOAPIC_IRQ_COUNT) {
    var $irq$$ = $reg$jscomp$1_value$$ - 16 >> 1;
    $reg$jscomp$1_value$$ & 1 ? ($reg$jscomp$1_value$$ = this.ioredtbl_destination[$irq$$], dbg_log("IOAPIC Read destination irq=" + h($irq$$) + " -> " + h($reg$jscomp$1_value$$, 8), LOG_APIC)) : ($reg$jscomp$1_value$$ = this.ioredtbl_config[$irq$$], dbg_log("IOAPIC Read config irq=" + h($irq$$) + " -> " + h($reg$jscomp$1_value$$, 8), LOG_APIC));
    return $reg$jscomp$1_value$$;
  }
  dbg_log("IOAPIC register read outside of range " + h($reg$jscomp$1_value$$), LOG_APIC);
  dbg_assert(!1);
  return 0;
};
IOAPIC.prototype.write = function($reg$jscomp$2_vector$$, $value$$) {
  if (0 === $reg$jscomp$2_vector$$) {
    this.ioapic_id = $value$$ >>> 24 & 15;
  } else {
    if (1 === $reg$jscomp$2_vector$$ || 2 === $reg$jscomp$2_vector$$) {
      dbg_log("Invalid write: " + $reg$jscomp$2_vector$$, LOG_APIC);
    } else {
      if (16 <= $reg$jscomp$2_vector$$ && $reg$jscomp$2_vector$$ < 16 + 2 * IOAPIC_IRQ_COUNT) {
        var $irq$$ = $reg$jscomp$2_vector$$ - 16 >> 1;
        if ($reg$jscomp$2_vector$$ & 1) {
          this.ioredtbl_destination[$irq$$] = $value$$ & 4278190080, dbg_log("Write destination " + h($value$$ >>> 0, 8) + " irq=" + h($irq$$) + " dest=" + h($value$$ >>> 24, 2), LOG_APIC);
        } else {
          this.ioredtbl_config[$irq$$] = $value$$ & ~IOAPIC_CONFIG_READONLY_MASK | this.ioredtbl_config[$irq$$] & IOAPIC_CONFIG_READONLY_MASK;
          $reg$jscomp$2_vector$$ = $value$$ & 255;
          var $delivery_mode$$ = $value$$ >> 8 & 7, $destination_mode$$ = $value$$ >> 11 & 1, $is_level$$ = $value$$ >> 15 & 1, $disabled$$ = $value$$ >> 16 & 1;
          dbg_log("Write config " + h($value$$ >>> 0, 8) + " irq=" + h($irq$$) + " vector=" + h($reg$jscomp$2_vector$$, 2) + " deliverymode=" + DELIVERY_MODES[$delivery_mode$$] + " destmode=" + DESTINATION_MODES[$destination_mode$$] + " is_level=" + $is_level$$ + " disabled=" + $disabled$$, LOG_APIC);
          this.check_irq($irq$$);
        }
      } else {
        dbg_log("IOAPIC register write outside of range " + h($reg$jscomp$2_vector$$) + ": " + h($value$$ >>> 0, 8), LOG_APIC), dbg_assert(!1);
      }
    }
  }
};
IOAPIC.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.ioredtbl_config;
  $state$$[1] = this.ioredtbl_destination;
  $state$$[2] = this.ioregsel;
  $state$$[3] = this.ioapic_id;
  $state$$[4] = this.irr;
  $state$$[5] = this.irq_value;
  return $state$$;
};
IOAPIC.prototype.set_state = function($state$$) {
  this.ioredtbl_config = $state$$[0];
  this.ioredtbl_destination = $state$$[1];
  this.ioregsel = $state$$[2];
  this.ioapic_id = $state$$[3];
  this.irr = $state$$[4];
  this.irq_value = $state$$[5];
};
var STATE_VERSION = 6, STATE_MAGIC = -2039052682, STATE_INDEX_MAGIC = 0, STATE_INDEX_VERSION = 1, STATE_INDEX_TOTAL_LEN = 2, STATE_INDEX_INFO_LEN = 3, STATE_INFO_BLOCK_START = 16;
const ZSTD_MAGIC = 4247762216;
function StateLoadError($msg$$) {
  this.message = $msg$$;
}
StateLoadError.prototype = Error();
const CONSTRUCTOR_TABLE = {Uint8Array, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array, };
function save_object($constructor$jscomp$1_obj$jscomp$27_result$$, $saved_buffers$$) {
  if ("object" !== typeof $constructor$jscomp$1_obj$jscomp$27_result$$ || null === $constructor$jscomp$1_obj$jscomp$27_result$$) {
    return dbg_assert("function" !== typeof $constructor$jscomp$1_obj$jscomp$27_result$$), $constructor$jscomp$1_obj$jscomp$27_result$$;
  }
  if ($constructor$jscomp$1_obj$jscomp$27_result$$ instanceof Array) {
    return $constructor$jscomp$1_obj$jscomp$27_result$$.map($x$$ => save_object($x$$, $saved_buffers$$));
  }
  $constructor$jscomp$1_obj$jscomp$27_result$$.constructor === Object && (console.log($constructor$jscomp$1_obj$jscomp$27_result$$), dbg_assert($constructor$jscomp$1_obj$jscomp$27_result$$.constructor !== Object, "Expected non-object"));
  if ($constructor$jscomp$1_obj$jscomp$27_result$$.BYTES_PER_ELEMENT) {
    var $buffer$jscomp$33_state$$ = new Uint8Array($constructor$jscomp$1_obj$jscomp$27_result$$.buffer, $constructor$jscomp$1_obj$jscomp$27_result$$.byteOffset, $constructor$jscomp$1_obj$jscomp$27_result$$.length * $constructor$jscomp$1_obj$jscomp$27_result$$.BYTES_PER_ELEMENT);
    $constructor$jscomp$1_obj$jscomp$27_result$$ = $constructor$jscomp$1_obj$jscomp$27_result$$.constructor.name.replace("bound ", "");
    dbg_assert(CONSTRUCTOR_TABLE[$constructor$jscomp$1_obj$jscomp$27_result$$]);
    return {__state_type__:$constructor$jscomp$1_obj$jscomp$27_result$$, buffer_id:$saved_buffers$$.push($buffer$jscomp$33_state$$) - 1, };
  }
  DEBUG && !$constructor$jscomp$1_obj$jscomp$27_result$$.get_state && console.log("Object without get_state: ", $constructor$jscomp$1_obj$jscomp$27_result$$);
  $buffer$jscomp$33_state$$ = $constructor$jscomp$1_obj$jscomp$27_result$$.get_state();
  $constructor$jscomp$1_obj$jscomp$27_result$$ = [];
  for (var $i$$ = 0; $i$$ < $buffer$jscomp$33_state$$.length; $i$$++) {
    var $value$$ = $buffer$jscomp$33_state$$[$i$$];
    dbg_assert("function" !== typeof $value$$);
    $constructor$jscomp$1_obj$jscomp$27_result$$[$i$$] = save_object($value$$, $saved_buffers$$);
  }
  return $constructor$jscomp$1_obj$jscomp$27_result$$;
}
function restore_buffers($obj$$, $buffers$$) {
  if ("object" !== typeof $obj$$ || null === $obj$$) {
    return dbg_assert("function" !== typeof $obj$$), $obj$$;
  }
  if ($obj$$ instanceof Array) {
    for ($i$jscomp$44_type$$ = 0; $i$jscomp$44_type$$ < $obj$$.length; $i$jscomp$44_type$$++) {
      $obj$$[$i$jscomp$44_type$$] = restore_buffers($obj$$[$i$jscomp$44_type$$], $buffers$$);
    }
    return $obj$$;
  }
  var $i$jscomp$44_type$$ = $obj$$.__state_type__;
  dbg_assert(void 0 !== $i$jscomp$44_type$$);
  const $constructor$$ = CONSTRUCTOR_TABLE[$i$jscomp$44_type$$];
  dbg_assert($constructor$$, "Unkown type: " + $i$jscomp$44_type$$);
  return new $constructor$$($buffers$$[$obj$$.buffer_id]);
}
CPU.prototype.save_state = function() {
  for (var $saved_buffers$$ = [], $info_block_info_object_state$$ = save_object(this, $saved_buffers$$), $buffer_infos$$ = [], $result$$ = 0, $buffer_block_start_i$$ = 0; $buffer_block_start_i$$ < $saved_buffers$$.length; $buffer_block_start_i$$++) {
    var $buffer_block_len$$ = $saved_buffers$$[$buffer_block_start_i$$].byteLength;
    $buffer_infos$$[$buffer_block_start_i$$] = {offset:$result$$, length:$buffer_block_len$$, };
    $result$$ += $buffer_block_len$$;
    $result$$ = $result$$ + 3 & -4;
  }
  $info_block_info_object_state$$ = JSON.stringify({buffer_infos:$buffer_infos$$, state:$info_block_info_object_state$$, });
  $info_block_info_object_state$$ = (new TextEncoder).encode($info_block_info_object_state$$);
  $buffer_block_start_i$$ = STATE_INFO_BLOCK_START + $info_block_info_object_state$$.length;
  $buffer_block_start_i$$ = $buffer_block_start_i$$ + 3 & -4;
  var $buffer$$ = $buffer_block_start_i$$ + $result$$;
  $result$$ = new ArrayBuffer($buffer$$);
  var $header_block$$ = new Int32Array($result$$, 0, STATE_INFO_BLOCK_START / 4);
  (new Uint8Array($result$$, STATE_INFO_BLOCK_START, $info_block_info_object_state$$.length)).set($info_block_info_object_state$$);
  $buffer_block_len$$ = new Uint8Array($result$$, $buffer_block_start_i$$);
  $header_block$$[STATE_INDEX_MAGIC] = STATE_MAGIC;
  $header_block$$[STATE_INDEX_VERSION] = STATE_VERSION;
  $header_block$$[STATE_INDEX_TOTAL_LEN] = $buffer$$;
  $header_block$$[STATE_INDEX_INFO_LEN] = $info_block_info_object_state$$.length;
  for ($buffer_block_start_i$$ = 0; $buffer_block_start_i$$ < $saved_buffers$$.length; $buffer_block_start_i$$++) {
    $buffer$$ = $saved_buffers$$[$buffer_block_start_i$$], dbg_assert($buffer$$.constructor === Uint8Array), $buffer_block_len$$.set($buffer$$, $buffer_infos$$[$buffer_block_start_i$$].offset);
  }
  dbg_log("State: json size " + ($info_block_info_object_state$$.byteLength >> 10) + "k");
  dbg_log("State: Total buffers size " + ($buffer_block_len$$.byteLength >> 10) + "k");
  return $result$$;
};
CPU.prototype.restore_state = function($state$$) {
  function $read_state_header$$($header_block$jscomp$1_state$$, $check_length$$) {
    const $len$$ = $header_block$jscomp$1_state$$.length;
    if ($len$$ < STATE_INFO_BLOCK_START) {
      throw new StateLoadError("Invalid length: " + $len$$);
    }
    $header_block$jscomp$1_state$$ = new Int32Array($header_block$jscomp$1_state$$.buffer, $header_block$jscomp$1_state$$.byteOffset, 4);
    if ($header_block$jscomp$1_state$$[STATE_INDEX_MAGIC] !== STATE_MAGIC) {
      throw new StateLoadError("Invalid header: " + h($header_block$jscomp$1_state$$[STATE_INDEX_MAGIC] >>> 0));
    }
    if ($header_block$jscomp$1_state$$[STATE_INDEX_VERSION] !== STATE_VERSION) {
      throw new StateLoadError("Version mismatch: dump=" + $header_block$jscomp$1_state$$[STATE_INDEX_VERSION] + " we=" + STATE_VERSION);
    }
    if ($check_length$$ && $header_block$jscomp$1_state$$[STATE_INDEX_TOTAL_LEN] !== $len$$) {
      throw new StateLoadError("Length doesn't match header: real=" + $len$$ + " header=" + $header_block$jscomp$1_state$$[STATE_INDEX_TOTAL_LEN]);
    }
    return $header_block$jscomp$1_state$$[STATE_INDEX_INFO_LEN];
  }
  function $read_info_block$$($info_block$$) {
    $info_block$$ = (new TextDecoder).decode($info_block$$);
    return JSON.parse($info_block$$);
  }
  $state$$ = new Uint8Array($state$$);
  if ((new Uint32Array($state$$.buffer, 0, 1))[0] === ZSTD_MAGIC) {
    var $buffers$jscomp$4_ctx_info_block_len$$ = this.zstd_create_ctx($state$$.length);
    (new Uint8Array(this.wasm_memory.buffer, this.zstd_get_src_ptr($buffers$jscomp$4_ctx_info_block_len$$), $state$$.length)).set($state$$);
    var $buffer_infos$jscomp$2_info_block_obj$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$$, 16), $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$ = new Uint8Array(this.wasm_memory.buffer, $buffer_infos$jscomp$2_info_block_obj$$, 16), $info_block_len_position$$ = $read_state_header$$($buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$, !1);
    this.zstd_read_free($buffer_infos$jscomp$2_info_block_obj$$, 16);
    $buffer_infos$jscomp$2_info_block_obj$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$$, $info_block_len_position$$);
    $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$ = new Uint8Array(this.wasm_memory.buffer, $buffer_infos$jscomp$2_info_block_obj$$, $info_block_len_position$$);
    $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$ = $read_info_block$$($buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$);
    this.zstd_read_free($buffer_infos$jscomp$2_info_block_obj$$, $info_block_len_position$$);
    $buffer_infos$jscomp$2_info_block_obj$$ = $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$.state;
    var $buffer_infos$$ = $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$.buffer_infos;
    $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$ = [];
    $info_block_len_position$$ = STATE_INFO_BLOCK_START + $info_block_len_position$$;
    for (var $buffer_info_info_block_buffer$jscomp$2_state_object$$ of $buffer_infos$$) {
      $buffer_infos$$ = ($info_block_len_position$$ + 3 & -4) - $info_block_len_position$$;
      if (1048576 < $buffer_info_info_block_buffer$jscomp$2_state_object$$.length) {
        var $buffer$jscomp$36_ptr$jscomp$1_ptr$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$$, $buffer_infos$$);
        this.zstd_read_free($buffer$jscomp$36_ptr$jscomp$1_ptr$$, $buffer_infos$$);
        $buffer$jscomp$36_ptr$jscomp$1_ptr$$ = new Uint8Array($buffer_info_info_block_buffer$jscomp$2_state_object$$.length);
        $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$.push($buffer$jscomp$36_ptr$jscomp$1_ptr$$.buffer);
        for (var $have_offset$$ = 0; $have_offset$$ < $buffer_info_info_block_buffer$jscomp$2_state_object$$.length;) {
          var $remaining_to_read$$ = $buffer_info_info_block_buffer$jscomp$2_state_object$$.length - $have_offset$$;
          dbg_assert(0 <= $remaining_to_read$$);
          $remaining_to_read$$ = Math.min($remaining_to_read$$, 1048576);
          const $ptr$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$$, $remaining_to_read$$);
          $buffer$jscomp$36_ptr$jscomp$1_ptr$$.set(new Uint8Array(this.wasm_memory.buffer, $ptr$$, $remaining_to_read$$), $have_offset$$);
          this.zstd_read_free($ptr$$, $remaining_to_read$$);
          $have_offset$$ += $remaining_to_read$$;
        }
      } else {
        $buffer$jscomp$36_ptr$jscomp$1_ptr$$ = this.zstd_read($buffers$jscomp$4_ctx_info_block_len$$, $buffer_infos$$ + $buffer_info_info_block_buffer$jscomp$2_state_object$$.length), $have_offset$$ = $buffer$jscomp$36_ptr$jscomp$1_ptr$$ + $buffer_infos$$, $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$.push(this.wasm_memory.buffer.slice($have_offset$$, $have_offset$$ + $buffer_info_info_block_buffer$jscomp$2_state_object$$.length)), this.zstd_read_free($buffer$jscomp$36_ptr$jscomp$1_ptr$$, 
        $buffer_infos$$ + $buffer_info_info_block_buffer$jscomp$2_state_object$$.length);
      }
      $info_block_len_position$$ += $buffer_infos$$ + $buffer_info_info_block_buffer$jscomp$2_state_object$$.length;
    }
    $buffer_infos$jscomp$2_info_block_obj$$ = restore_buffers($buffer_infos$jscomp$2_info_block_obj$$, $buffers$jscomp$3_header_block$jscomp$2_info_block_buffer$$);
    this.set_state($buffer_infos$jscomp$2_info_block_obj$$);
    this.zstd_free_ctx($buffers$jscomp$4_ctx_info_block_len$$);
  } else {
    $buffers$jscomp$4_ctx_info_block_len$$ = $read_state_header$$($state$$, !0);
    if (0 > $buffers$jscomp$4_ctx_info_block_len$$ || $buffers$jscomp$4_ctx_info_block_len$$ + 12 >= $state$$.length) {
      throw new StateLoadError("Invalid info block length: " + $buffers$jscomp$4_ctx_info_block_len$$);
    }
    $buffer_info_info_block_buffer$jscomp$2_state_object$$ = $state$$.subarray(STATE_INFO_BLOCK_START, STATE_INFO_BLOCK_START + $buffers$jscomp$4_ctx_info_block_len$$);
    $buffer_infos$jscomp$2_info_block_obj$$ = $read_info_block$$($buffer_info_info_block_buffer$jscomp$2_state_object$$);
    $buffer_info_info_block_buffer$jscomp$2_state_object$$ = $buffer_infos$jscomp$2_info_block_obj$$.state;
    $buffer_infos$jscomp$2_info_block_obj$$ = $buffer_infos$jscomp$2_info_block_obj$$.buffer_infos;
    let $buffer_block_start$$ = STATE_INFO_BLOCK_START + $buffers$jscomp$4_ctx_info_block_len$$;
    $buffer_block_start$$ = $buffer_block_start$$ + 3 & -4;
    $buffers$jscomp$4_ctx_info_block_len$$ = $buffer_infos$jscomp$2_info_block_obj$$.map($buffer_info$$ => {
      const $offset$$ = $buffer_block_start$$ + $buffer_info$$.offset;
      return $state$$.buffer.slice($offset$$, $offset$$ + $buffer_info$$.length);
    });
    $buffer_info_info_block_buffer$jscomp$2_state_object$$ = restore_buffers($buffer_info_info_block_buffer$jscomp$2_state_object$$, $buffers$jscomp$4_ctx_info_block_len$$);
    this.set_state($buffer_info_info_block_buffer$jscomp$2_state_object$$);
  }
};
const NE2K_LOG_VERBOSE = !1, NE2K_LOG_PACKETS = !1;
var E8390_CMD = 0, EN0_CLDALO = 1, EN0_STARTPG = 1, EN0_CLDAHI = 2, EN0_STOPPG = 2, EN0_BOUNDARY = 3, EN0_TSR = 4, EN0_TPSR = 4, EN0_NCR = 5, EN0_TCNTLO = 5, EN0_FIFO = 6, EN0_TCNTHI = 6, EN0_ISR = 7, EN0_CRDALO = 8, EN0_RSARLO = 8, EN0_CRDAHI = 9, EN0_RSARHI = 9, EN0_RCNTLO = 10, EN0_RCNTHI = 11, EN0_RSR = 12, EN0_RXCR = 12, EN0_TXCR = 13, EN0_COUNTER0 = 13, EN0_DCFG = 14, EN0_COUNTER1 = 14, EN0_IMR = 15, EN0_COUNTER2 = 15, NE_DATAPORT = 16, NE_RESET = 31, ENISR_RX = 1, ENISR_TX = 2, ENISR_RX_ERR = 
4, ENISR_TX_ERR = 8, ENISR_OVER = 16, ENISR_COUNTERS = 32, ENISR_RDC = 64, ENISR_RESET = 128, ENISR_ALL = 63, ENRSR_RXOK = 1, START_PAGE = 64, START_RX_PAGE = 76, STOP_PAGE = 128;
function translate_mac_address($arp_packet_ipv4_packet_packet_udp_packet$$, $search_mac$$, $replacement_mac$$) {
  $arp_packet_ipv4_packet_packet_udp_packet$$[0] === $search_mac$$[0] && $arp_packet_ipv4_packet_packet_udp_packet$$[1] === $search_mac$$[1] && $arp_packet_ipv4_packet_packet_udp_packet$$[2] === $search_mac$$[2] && $arp_packet_ipv4_packet_packet_udp_packet$$[3] === $search_mac$$[3] && $arp_packet_ipv4_packet_packet_udp_packet$$[4] === $search_mac$$[4] && $arp_packet_ipv4_packet_packet_udp_packet$$[5] === $search_mac$$[5] && (dbg_log("Replace mac in eth destination field", LOG_NET), $arp_packet_ipv4_packet_packet_udp_packet$$[0] = 
  $replacement_mac$$[0], $arp_packet_ipv4_packet_packet_udp_packet$$[1] = $replacement_mac$$[1], $arp_packet_ipv4_packet_packet_udp_packet$$[2] = $replacement_mac$$[2], $arp_packet_ipv4_packet_packet_udp_packet$$[3] = $replacement_mac$$[3], $arp_packet_ipv4_packet_packet_udp_packet$$[4] = $replacement_mac$$[4], $arp_packet_ipv4_packet_packet_udp_packet$$[5] = $replacement_mac$$[5]);
  $arp_packet_ipv4_packet_packet_udp_packet$$[6] === $search_mac$$[0] && $arp_packet_ipv4_packet_packet_udp_packet$$[7] === $search_mac$$[1] && $arp_packet_ipv4_packet_packet_udp_packet$$[8] === $search_mac$$[2] && $arp_packet_ipv4_packet_packet_udp_packet$$[9] === $search_mac$$[3] && $arp_packet_ipv4_packet_packet_udp_packet$$[10] === $search_mac$$[4] && $arp_packet_ipv4_packet_packet_udp_packet$$[11] === $search_mac$$[5] && (dbg_log("Replace mac in eth source field", LOG_NET), $arp_packet_ipv4_packet_packet_udp_packet$$[6] = 
  $replacement_mac$$[0], $arp_packet_ipv4_packet_packet_udp_packet$$[7] = $replacement_mac$$[1], $arp_packet_ipv4_packet_packet_udp_packet$$[8] = $replacement_mac$$[2], $arp_packet_ipv4_packet_packet_udp_packet$$[9] = $replacement_mac$$[3], $arp_packet_ipv4_packet_packet_udp_packet$$[10] = $replacement_mac$$[4], $arp_packet_ipv4_packet_packet_udp_packet$$[11] = $replacement_mac$$[5]);
  var $dhcp_packet_ethertype_ipv4_version_source_port$$ = $arp_packet_ipv4_packet_packet_udp_packet$$[12] << 8 | $arp_packet_ipv4_packet_packet_udp_packet$$[13];
  if (2048 === $dhcp_packet_ethertype_ipv4_version_source_port$$) {
    if ($arp_packet_ipv4_packet_packet_udp_packet$$ = $arp_packet_ipv4_packet_packet_udp_packet$$.subarray(14), $dhcp_packet_ethertype_ipv4_version_source_port$$ = $arp_packet_ipv4_packet_packet_udp_packet$$[0] >> 4, 4 !== $dhcp_packet_ethertype_ipv4_version_source_port$$) {
      dbg_log("Expected ipv4.version==4 but got: " + $dhcp_packet_ethertype_ipv4_version_source_port$$, LOG_NET);
    } else {
      if (dbg_assert(5 === ($arp_packet_ipv4_packet_packet_udp_packet$$[0] & 15), "TODO: ihl!=5"), 17 === $arp_packet_ipv4_packet_packet_udp_packet$$[9] && ($arp_packet_ipv4_packet_packet_udp_packet$$ = $arp_packet_ipv4_packet_packet_udp_packet$$.subarray(20), $dhcp_packet_ethertype_ipv4_version_source_port$$ = $arp_packet_ipv4_packet_packet_udp_packet$$[0] << 8 | $arp_packet_ipv4_packet_packet_udp_packet$$[1], $destination_port_dhcp_magic_offset$$ = $arp_packet_ipv4_packet_packet_udp_packet$$[2] << 
      8 | $arp_packet_ipv4_packet_packet_udp_packet$$[3], dbg_log("udp srcport=" + $dhcp_packet_ethertype_ipv4_version_source_port$$ + " dstport=" + $destination_port_dhcp_magic_offset$$ + " checksum=" + h($arp_packet_ipv4_packet_packet_udp_packet$$[6] << 8 | $arp_packet_ipv4_packet_packet_udp_packet$$[7], 4), LOG_NET), 67 === $dhcp_packet_ethertype_ipv4_version_source_port$$ || 67 === $destination_port_dhcp_magic_offset$$)) {
        if ($dhcp_packet_ethertype_ipv4_version_source_port$$ = $arp_packet_ipv4_packet_packet_udp_packet$$.subarray(8), $destination_port_dhcp_magic_offset$$ = $dhcp_packet_ethertype_ipv4_version_source_port$$[236] << 24 | $dhcp_packet_ethertype_ipv4_version_source_port$$[237] << 16 | $dhcp_packet_ethertype_ipv4_version_source_port$$[238] << 8 | $dhcp_packet_ethertype_ipv4_version_source_port$$[239], 1669485411 !== $destination_port_dhcp_magic_offset$$) {
          dbg_log("dhcp packet didn't match magic: " + h($destination_port_dhcp_magic_offset$$, 8));
        } else {
          $dhcp_packet_ethertype_ipv4_version_source_port$$[28] === $search_mac$$[0] && $dhcp_packet_ethertype_ipv4_version_source_port$$[29] === $search_mac$$[1] && $dhcp_packet_ethertype_ipv4_version_source_port$$[30] === $search_mac$$[2] && $dhcp_packet_ethertype_ipv4_version_source_port$$[31] === $search_mac$$[3] && $dhcp_packet_ethertype_ipv4_version_source_port$$[32] === $search_mac$$[4] && $dhcp_packet_ethertype_ipv4_version_source_port$$[33] === $search_mac$$[5] && (dbg_log("Replace mac in dhcp.chaddr", 
          LOG_NET), $dhcp_packet_ethertype_ipv4_version_source_port$$[28] = $replacement_mac$$[0], $dhcp_packet_ethertype_ipv4_version_source_port$$[29] = $replacement_mac$$[1], $dhcp_packet_ethertype_ipv4_version_source_port$$[30] = $replacement_mac$$[2], $dhcp_packet_ethertype_ipv4_version_source_port$$[31] = $replacement_mac$$[3], $dhcp_packet_ethertype_ipv4_version_source_port$$[32] = $replacement_mac$$[4], $dhcp_packet_ethertype_ipv4_version_source_port$$[33] = $replacement_mac$$[5], $arp_packet_ipv4_packet_packet_udp_packet$$[6] = 
          $arp_packet_ipv4_packet_packet_udp_packet$$[7] = 0);
          for (var $destination_port_dhcp_magic_offset$$ = 240; $destination_port_dhcp_magic_offset$$ < $dhcp_packet_ethertype_ipv4_version_source_port$$.length;) {
            const $dhcp_option_type$$ = $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$++];
            if (255 === $dhcp_option_type$$) {
              break;
            }
            const $length$$ = $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$++];
            61 === $dhcp_option_type$$ && 1 === $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 0] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 1] === $search_mac$$[0] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 2] === $search_mac$$[1] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 3] === $search_mac$$[2] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 
            4] === $search_mac$$[3] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 5] === $search_mac$$[4] && $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 6] === $search_mac$$[5] && (dbg_log("Replace mac in dhcp.clientidentifier", LOG_NET), $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 1] = $replacement_mac$$[0], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 
            2] = $replacement_mac$$[1], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 3] = $replacement_mac$$[2], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 4] = $replacement_mac$$[3], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 5] = $replacement_mac$$[4], $dhcp_packet_ethertype_ipv4_version_source_port$$[$destination_port_dhcp_magic_offset$$ + 6] = $replacement_mac$$[5], 
            $arp_packet_ipv4_packet_packet_udp_packet$$[6] = $arp_packet_ipv4_packet_packet_udp_packet$$[7] = 0);
            $destination_port_dhcp_magic_offset$$ += $length$$;
          }
        }
      }
    }
  } else {
    2054 === $dhcp_packet_ethertype_ipv4_version_source_port$$ && ($arp_packet_ipv4_packet_packet_udp_packet$$ = $arp_packet_ipv4_packet_packet_udp_packet$$.subarray(14), dbg_log("arp oper=" + $arp_packet_ipv4_packet_packet_udp_packet$$[7] + " " + format_mac($arp_packet_ipv4_packet_packet_udp_packet$$.subarray(8, 14)) + " " + format_mac($arp_packet_ipv4_packet_packet_udp_packet$$.subarray(18, 24)), LOG_NET), $arp_packet_ipv4_packet_packet_udp_packet$$[8] === $search_mac$$[0] && $arp_packet_ipv4_packet_packet_udp_packet$$[9] === 
    $search_mac$$[1] && $arp_packet_ipv4_packet_packet_udp_packet$$[10] === $search_mac$$[2] && $arp_packet_ipv4_packet_packet_udp_packet$$[11] === $search_mac$$[3] && $arp_packet_ipv4_packet_packet_udp_packet$$[12] === $search_mac$$[4] && $arp_packet_ipv4_packet_packet_udp_packet$$[13] === $search_mac$$[5] && (dbg_log("Replace mac in arp.sha", LOG_NET), $arp_packet_ipv4_packet_packet_udp_packet$$[8] = $replacement_mac$$[0], $arp_packet_ipv4_packet_packet_udp_packet$$[9] = $replacement_mac$$[1], 
    $arp_packet_ipv4_packet_packet_udp_packet$$[10] = $replacement_mac$$[2], $arp_packet_ipv4_packet_packet_udp_packet$$[11] = $replacement_mac$$[3], $arp_packet_ipv4_packet_packet_udp_packet$$[12] = $replacement_mac$$[4], $arp_packet_ipv4_packet_packet_udp_packet$$[13] = $replacement_mac$$[5]));
  }
}
function format_mac($mac$$) {
  return [$mac$$[0].toString(16).padStart(2, "0"), $mac$$[1].toString(16).padStart(2, "0"), $mac$$[2].toString(16).padStart(2, "0"), $mac$$[3].toString(16).padStart(2, "0"), $mac$$[4].toString(16).padStart(2, "0"), $mac$$[5].toString(16).padStart(2, "0"), ].join(":");
}
function dump_packet($packet$$, $prefix$$) {
  const $ethertype$$ = $packet$$[12] << 8 | $packet$$[13] << 0;
  if (2048 === $ethertype$$) {
    var $ipv4_packet$jscomp$1_source_port$$ = $packet$$.subarray(14);
    const $ipv4_len$$ = $ipv4_packet$jscomp$1_source_port$$[2] << 8 | $ipv4_packet$jscomp$1_source_port$$[3];
    var $destination_port$jscomp$1_ipv4_proto$$ = $ipv4_packet$jscomp$1_source_port$$[9];
    if (17 === $destination_port$jscomp$1_ipv4_proto$$) {
      var $dhcp_chaddr_udp_packet$$ = $ipv4_packet$jscomp$1_source_port$$.subarray(20);
      $ipv4_packet$jscomp$1_source_port$$ = $dhcp_chaddr_udp_packet$$[0] << 8 | $dhcp_chaddr_udp_packet$$[1];
      $destination_port$jscomp$1_ipv4_proto$$ = $dhcp_chaddr_udp_packet$$[2] << 8 | $dhcp_chaddr_udp_packet$$[3];
      const $checksum$$ = $dhcp_chaddr_udp_packet$$[6] << 8 | $dhcp_chaddr_udp_packet$$[7];
      67 === $ipv4_packet$jscomp$1_source_port$$ || 67 === $destination_port$jscomp$1_ipv4_proto$$ ? ($dhcp_chaddr_udp_packet$$ = $dhcp_chaddr_udp_packet$$.subarray(8).subarray(28, 34), dbg_log($prefix$$ + " len=" + $packet$$.length + " ethertype=" + h($ethertype$$) + " ipv4.len=" + $ipv4_len$$ + " ipv4.proto=" + h($packet$$[23]) + " udp.srcport=" + $ipv4_packet$jscomp$1_source_port$$ + " udp.dstport=" + $destination_port$jscomp$1_ipv4_proto$$ + " udp.chksum=" + h($checksum$$, 4) + " dhcp.chaddr=" + 
      format_mac($dhcp_chaddr_udp_packet$$))) : dbg_log($prefix$$ + " len=" + $packet$$.length + " ethertype=" + h($ethertype$$) + " ipv4.len=" + $ipv4_len$$ + " ipv4.proto=" + h($packet$$[23]) + " udp.srcport=" + $ipv4_packet$jscomp$1_source_port$$ + " udp.dstport=" + $destination_port$jscomp$1_ipv4_proto$$ + " udp.chksum=" + h($checksum$$, 4));
    } else {
      1 !== $destination_port$jscomp$1_ipv4_proto$$ && dbg_log($prefix$$ + " len=" + $packet$$.length + " ethertype=" + h($ethertype$$) + " ipv4.len=" + $ipv4_len$$ + " ipv4.proto=" + h($packet$$[23]));
    }
  } else {
    $packet$$.subarray(14), dbg_log($prefix$$ + " len=" + $packet$$.length + " ethertype=" + h($ethertype$$) + " arp");
  }
  dbg_log(hex_dump($packet$$));
}
function Ne2k($cpu$$, $bus$jscomp$9_i$jscomp$46_io$$, $preserve_mac_from_state_image$$, $mac_address_translation$$) {
  this.cpu = $cpu$$;
  this.pci = $cpu$$.devices.pci;
  this.preserve_mac_from_state_image = $preserve_mac_from_state_image$$;
  this.mac_address_translation = $mac_address_translation$$;
  this.bus = $bus$jscomp$9_i$jscomp$46_io$$;
  this.bus.register("net0-receive", function($data$$) {
    this.receive($data$$);
  }, this);
  this.port = 768;
  this.name = "ne2k";
  this.pci_space = [236, 16, 41, 128, 3, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, this.port & 255 | 1, this.port >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, 0, 17, 0, 0, 184, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, ];
  this.pci_id = 40;
  this.pci_bars = [{size:32, }, ];
  this.imr = this.isr = 0;
  this.cr = 1;
  this.tpsr = this.tcnt = this.rcnt = this.dcfg = 0;
  this.memory = new Uint8Array(32768);
  this.txcr = this.rxcr = 0;
  this.tsr = 1;
  this.mac = new Uint8Array([0, 34, 21, 255 * Math.random() | 0, 255 * Math.random() | 0, 255 * Math.random() | 0, ]);
  this.mac_address_in_state = null;
  for ($bus$jscomp$9_i$jscomp$46_io$$ = 0; 6 > $bus$jscomp$9_i$jscomp$46_io$$; $bus$jscomp$9_i$jscomp$46_io$$++) {
    this.memory[$bus$jscomp$9_i$jscomp$46_io$$ << 1] = this.memory[$bus$jscomp$9_i$jscomp$46_io$$ << 1 | 1] = this.mac[$bus$jscomp$9_i$jscomp$46_io$$];
  }
  this.memory[28] = this.memory[29] = 87;
  this.memory[30] = this.memory[31] = 87;
  dbg_log("Mac: " + format_mac(this.mac), LOG_NET);
  this.rsar = 0;
  this.pstart = START_PAGE;
  this.pstop = STOP_PAGE;
  this.boundary = this.curpg = START_RX_PAGE;
  $bus$jscomp$9_i$jscomp$46_io$$ = $cpu$$.io;
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | E8390_CMD, this, function() {
    dbg_log("Read cmd", LOG_NET);
    return this.cr;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | E8390_CMD, this, function($data$jscomp$136_data_byte$jscomp$14_start$$) {
    this.cr = $data$jscomp$136_data_byte$jscomp$14_start$$;
    dbg_log("Write command: " + h($data$jscomp$136_data_byte$jscomp$14_start$$, 2) + " newpg=" + (this.cr >> 6) + " txcr=" + h(this.txcr, 2), LOG_NET);
    this.cr & 1 || ($data$jscomp$136_data_byte$jscomp$14_start$$ & 24 && 0 === this.rcnt && this.do_interrupt(ENISR_RDC), $data$jscomp$136_data_byte$jscomp$14_start$$ & 4 && ($data$jscomp$136_data_byte$jscomp$14_start$$ = this.tpsr << 8, $data$jscomp$136_data_byte$jscomp$14_start$$ = this.memory.subarray($data$jscomp$136_data_byte$jscomp$14_start$$, $data$jscomp$136_data_byte$jscomp$14_start$$ + this.tcnt), NE2K_LOG_PACKETS && dump_packet($data$jscomp$136_data_byte$jscomp$14_start$$, "send"), this.mac_address_in_state && 
    ($data$jscomp$136_data_byte$jscomp$14_start$$ = new Uint8Array($data$jscomp$136_data_byte$jscomp$14_start$$), translate_mac_address($data$jscomp$136_data_byte$jscomp$14_start$$, this.mac_address_in_state, this.mac)), this.bus.send("net0-send", $data$jscomp$136_data_byte$jscomp$14_start$$), this.bus.send("eth-transmit-end", [$data$jscomp$136_data_byte$jscomp$14_start$$.length]), this.cr &= -5, this.do_interrupt(ENISR_TX), dbg_log("Command: Transfer. length=" + h($data$jscomp$136_data_byte$jscomp$14_start$$.byteLength), 
    LOG_NET)));
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_COUNTER0, this, function() {
    dbg_log("Read counter0", LOG_NET);
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_COUNTER1, this, function() {
    dbg_log("Read8 counter1", LOG_NET);
    return 0;
  }, function() {
    dbg_log("Read16 counter1", LOG_NET);
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_COUNTER2, this, function() {
    dbg_log("Read counter2", LOG_NET);
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | NE_RESET, this, function() {
    this.get_page();
    dbg_log("Read reset", LOG_NET);
    this.do_interrupt(ENISR_RESET);
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | NE_RESET, this, function($data_byte$$) {
    this.get_page();
    dbg_log("Write reset: " + h($data_byte$$, 2), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_STARTPG, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return this.pstart;
    }
    if (1 === $pg$$) {
      return dbg_log("Read pg1/01 (mac[0])", LOG_NET), this.mac[0];
    }
    if (2 === $pg$$) {
      return this.pstart;
    }
    dbg_log("Read pg" + $pg$$ + "/01");
    dbg_assert(!1);
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_STARTPG, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("start page: " + h($data_byte$$, 2), LOG_NET), this.pstart = $data_byte$$) : 1 === $pg$$ ? (dbg_log("mac[0] = " + h($data_byte$$), LOG_NET), this.mac[0] = $data_byte$$) : 3 === $pg$$ ? dbg_log("Unimplemented: Write pg3/01 (9346CR): " + h($data_byte$$), LOG_NET) : (dbg_log("Write pg" + $pg$$ + "/01: " + h($data_byte$$), LOG_NET), dbg_assert(!1));
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_STOPPG, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return this.pstop;
    }
    if (1 === $pg$$) {
      return dbg_log("Read pg1/02 (mac[1])", LOG_NET), this.mac[1];
    }
    if (2 === $pg$$) {
      return this.pstop;
    }
    dbg_log("Read pg" + $pg$$ + "/02", LOG_NET);
    dbg_assert(!1);
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_STOPPG, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("stop page: " + h($data_byte$$, 2), LOG_NET), $data_byte$$ > this.memory.length >> 8 && ($data_byte$$ = this.memory.length >> 8, dbg_log("XXX: Adjusting stop page to " + h($data_byte$$), LOG_NET)), this.pstop = $data_byte$$) : 1 === $pg$$ ? (dbg_log("mac[1] = " + h($data_byte$$), LOG_NET), this.mac[1] = $data_byte$$) : (dbg_log("Write pg" + $pg$$ + "/02: " + h($data_byte$$), LOG_NET), dbg_assert(!1));
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_ISR, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return dbg_log("Read isr: " + h(this.isr, 2), LOG_NET), this.isr;
    }
    if (1 === $pg$$) {
      return dbg_log("Read curpg: " + h(this.curpg, 2), LOG_NET), this.curpg;
    }
    dbg_assert(!1);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_ISR, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write isr: " + h($data_byte$$, 2), LOG_NET), this.isr &= ~$data_byte$$, this.update_irq()) : 1 === $pg$$ ? (dbg_log("Write curpg: " + h($data_byte$$, 2), LOG_NET), this.curpg = $data_byte$$) : dbg_assert(!1);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_TXCR, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (this.txcr = $data_byte$$, dbg_log("Write tx config: " + h($data_byte$$, 2), LOG_NET)) : dbg_log("Unimplemented: Write pg" + $pg$$ + "/0d " + h($data_byte$$, 2), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_DCFG, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write data configuration: " + h($data_byte$$, 2), LOG_NET), this.dcfg = $data_byte$$) : dbg_log("Unimplemented: Write pg" + $pg$$ + "/0e " + h($data_byte$$, 2), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_RCNTLO, this, function() {
    if (0 === this.get_page()) {
      return dbg_log("Read pg0/0a", LOG_NET), 80;
    }
    dbg_assert(!1, "TODO");
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_RCNTLO, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write remote byte count low: " + h($data_byte$$, 2), LOG_NET), this.rcnt = this.rcnt & 65280 | $data_byte$$ & 255) : dbg_log("Unimplemented: Write pg" + $pg$$ + "/0a " + h($data_byte$$, 2), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_RCNTHI, this, function() {
    if (0 === this.get_page()) {
      return dbg_log("Read pg0/0b", LOG_NET), 67;
    }
    dbg_assert(!1, "TODO");
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_RCNTHI, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write remote byte count high: " + h($data_byte$$, 2), LOG_NET), this.rcnt = this.rcnt & 255 | $data_byte$$ << 8 & 65280) : dbg_log("Unimplemented: Write pg" + $pg$$ + "/0b " + h($data_byte$$, 2), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_RSARLO, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return dbg_log("Read remote start address low", LOG_NET), this.rsar & 255;
    }
    dbg_log("Unimplemented: Read pg" + $pg$$ + "/08", LOG_NET);
    dbg_assert(!1);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_RSARLO, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write remote start address low: " + h($data_byte$$, 2), LOG_NET), this.rsar = this.rsar & 65280 | $data_byte$$ & 255) : dbg_log("Unimplemented: Write pg" + $pg$$ + "/08 " + h($data_byte$$, 2), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_RSARHI, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return dbg_log("Read remote start address high", LOG_NET), this.rsar >> 8 & 255;
    }
    dbg_log("Unimplemented: Read pg" + $pg$$ + "/09", LOG_NET);
    dbg_assert(!1);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_RSARHI, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write remote start address low: " + h($data_byte$$, 2), LOG_NET), this.rsar = this.rsar & 255 | $data_byte$$ << 8 & 65280) : dbg_log("Unimplemented: Write pg" + $pg$$ + "/09 " + h($data_byte$$, 2), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_IMR, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write interrupt mask register: " + h($data_byte$$, 2) + " isr=" + h(this.isr, 2), LOG_NET), this.imr = $data_byte$$, this.update_irq()) : dbg_log("Unimplemented: Write pg" + $pg$$ + "/0f " + h($data_byte$$, 2), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_BOUNDARY, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return dbg_log("Read boundary: " + h(this.boundary, 2), LOG_NET), this.boundary;
    }
    if (1 === $pg$$) {
      return dbg_log("Read pg1/03 (mac[2])", LOG_NET), this.mac[2];
    }
    3 === $pg$$ ? dbg_log("Unimplemented: Read pg3/03 (CONFIG0)", LOG_NET) : (dbg_log("Read pg" + $pg$$ + "/03", LOG_NET), dbg_assert(!1));
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_BOUNDARY, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write boundary: " + h($data_byte$$, 2), LOG_NET), this.boundary = $data_byte$$) : 1 === $pg$$ ? (dbg_log("mac[2] = " + h($data_byte$$), LOG_NET), this.mac[2] = $data_byte$$) : (dbg_log("Write pg" + $pg$$ + "/03: " + h($data_byte$$), LOG_NET), dbg_assert(!1));
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_TSR, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return this.tsr;
    }
    if (1 === $pg$$) {
      return dbg_log("Read pg1/04 (mac[3])", LOG_NET), this.mac[3];
    }
    dbg_log("Read pg" + $pg$$ + "/04", LOG_NET);
    dbg_assert(!1);
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_TPSR, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write tpsr: " + h($data_byte$$, 2), LOG_NET), this.tpsr = $data_byte$$) : 1 === $pg$$ ? (dbg_log("mac[3] = " + h($data_byte$$), LOG_NET), this.mac[3] = $data_byte$$) : (dbg_log("Write pg" + $pg$$ + "/04: " + h($data_byte$$), LOG_NET), dbg_assert(!1));
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_TCNTLO, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return dbg_log("Unimplemented: Read pg0/05 (NCR: Number of Collisions Register)", LOG_NET), 0;
    }
    if (1 === $pg$$) {
      return dbg_log("Read pg1/05 (mac[4])", LOG_NET), this.mac[4];
    }
    3 === $pg$$ ? dbg_log("Unimplemented: Read pg3/05 (CONFIG2)", LOG_NET) : (dbg_log("Read pg" + $pg$$ + "/05", LOG_NET), dbg_assert(!1));
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_TCNTLO, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write tcnt low: " + h($data_byte$$, 2), LOG_NET), this.tcnt = this.tcnt & -256 | $data_byte$$) : 1 === $pg$$ ? (dbg_log("mac[4] = " + h($data_byte$$), LOG_NET), this.mac[4] = $data_byte$$) : 3 === $pg$$ ? dbg_log("Unimplemented: Write pg3/05 (CONFIG2): " + h($data_byte$$), LOG_NET) : (dbg_log("Write pg" + $pg$$ + "/05: " + h($data_byte$$), LOG_NET), dbg_assert(!1));
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_TCNTHI, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return dbg_assert(!1, "TODO"), 0;
    }
    if (1 === $pg$$) {
      return dbg_log("Read pg1/06 (mac[5])", LOG_NET), this.mac[5];
    }
    3 === $pg$$ ? dbg_log("Unimplemented: Read pg3/06 (CONFIG3)", LOG_NET) : (dbg_log("Read pg" + $pg$$ + "/06", LOG_NET), dbg_assert(!1));
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_TCNTHI, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("Write tcnt high: " + h($data_byte$$, 2), LOG_NET), this.tcnt = this.tcnt & 255 | $data_byte$$ << 8) : 1 === $pg$$ ? (dbg_log("mac[5] = " + h($data_byte$$), LOG_NET), this.mac[5] = $data_byte$$) : 3 === $pg$$ ? dbg_log("Unimplemented: Write pg3/06 (CONFIG3): " + h($data_byte$$), LOG_NET) : (dbg_log("Write pg" + $pg$$ + "/06: " + h($data_byte$$), LOG_NET), dbg_assert(!1));
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | EN0_RSR, this, function() {
    var $pg$$ = this.get_page();
    if (0 === $pg$$) {
      return 9;
    }
    dbg_log("Unimplemented: Read pg" + $pg$$ + "/0c", LOG_NET);
    dbg_assert(!1);
    return 0;
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | EN0_RXCR, this, function($data_byte$$) {
    var $pg$$ = this.get_page();
    0 === $pg$$ ? (dbg_log("RX configuration reg write: " + h($data_byte$$, 2), LOG_NET), this.rxcr = $data_byte$$) : dbg_log("Unimplemented: Write pg" + $pg$$ + "/0c: " + h($data_byte$$), LOG_NET);
  });
  $bus$jscomp$9_i$jscomp$46_io$$.register_read(this.port | NE_DATAPORT | 0, this, this.data_port_read8, this.data_port_read16, this.data_port_read32);
  $bus$jscomp$9_i$jscomp$46_io$$.register_write(this.port | NE_DATAPORT | 0, this, this.data_port_write16, this.data_port_write16, this.data_port_write32);
  $cpu$$.devices.pci.register_device(this);
}
Ne2k.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.isr;
  $state$$[1] = this.imr;
  $state$$[2] = this.cr;
  $state$$[3] = this.dcfg;
  $state$$[4] = this.rcnt;
  $state$$[5] = this.tcnt;
  $state$$[6] = this.tpsr;
  $state$$[7] = this.rsar;
  $state$$[8] = this.pstart;
  $state$$[9] = this.curpg;
  $state$$[10] = this.boundary;
  $state$$[11] = this.pstop;
  $state$$[12] = this.rxcr;
  $state$$[13] = this.txcr;
  $state$$[14] = this.tsr;
  $state$$[15] = this.mac;
  $state$$[16] = this.memory;
  return $state$$;
};
Ne2k.prototype.set_state = function($state$$) {
  this.isr = $state$$[0];
  this.imr = $state$$[1];
  this.cr = $state$$[2];
  this.dcfg = $state$$[3];
  this.rcnt = $state$$[4];
  this.tcnt = $state$$[5];
  this.tpsr = $state$$[6];
  this.rsar = $state$$[7];
  this.pstart = $state$$[8];
  this.curpg = $state$$[9];
  this.boundary = $state$$[10];
  this.pstop = $state$$[11];
  this.rxcr = $state$$[12];
  this.txcr = $state$$[13];
  this.tsr = $state$$[14];
  this.preserve_mac_from_state_image ? (this.mac = $state$$[15], this.memory = $state$$[16]) : this.mac_address_translation && (this.mac_address_in_state = $state$$[15], this.memory = $state$$[16], dbg_log("Using mac address translation guest_os_mac=" + format_mac(this.mac_address_in_state) + " real_mac=" + format_mac(this.mac), LOG_NET));
};
Ne2k.prototype.do_interrupt = function($ir_mask$$) {
  dbg_log("Do interrupt " + h($ir_mask$$, 2), LOG_NET);
  this.isr |= $ir_mask$$;
  this.update_irq();
};
Ne2k.prototype.update_irq = function() {
  this.imr & this.isr ? this.pci.raise_irq(this.pci_id) : this.pci.lower_irq(this.pci_id);
};
Ne2k.prototype.data_port_write = function($data_byte$$) {
  NE2K_LOG_VERBOSE && dbg_log("Write data port: data=" + h($data_byte$$ & 255, 2) + " rsar=" + h(this.rsar, 4) + " rcnt=" + h(this.rcnt, 4), LOG_NET);
  if (16 >= this.rsar || this.rsar >= START_PAGE << 8 && this.rsar < STOP_PAGE << 8) {
    this.memory[this.rsar] = $data_byte$$;
  }
  this.rsar++;
  this.rcnt--;
  this.rsar >= this.pstop << 8 && (this.rsar += this.pstart - this.pstop << 8);
  0 === this.rcnt && this.do_interrupt(ENISR_RDC);
};
Ne2k.prototype.data_port_write16 = function($data$$) {
  this.data_port_write($data$$);
  this.dcfg & 1 && this.data_port_write($data$$ >> 8);
};
Ne2k.prototype.data_port_write32 = function($data$$) {
  this.data_port_write($data$$);
  this.data_port_write($data$$ >> 8);
  this.data_port_write($data$$ >> 16);
  this.data_port_write($data$$ >> 24);
};
Ne2k.prototype.data_port_read = function() {
  let $data$$ = 0;
  this.rsar < STOP_PAGE << 8 && ($data$$ = this.memory[this.rsar]);
  NE2K_LOG_VERBOSE && dbg_log("Read data port: data=" + h($data$$, 2) + " rsar=" + h(this.rsar, 4) + " rcnt=" + h(this.rcnt, 4), LOG_NET);
  this.rsar++;
  this.rcnt--;
  this.rsar >= this.pstop << 8 && (this.rsar += this.pstart - this.pstop << 8);
  0 === this.rcnt && this.do_interrupt(ENISR_RDC);
  return $data$$;
};
Ne2k.prototype.data_port_read8 = function() {
  return this.data_port_read16() & 255;
};
Ne2k.prototype.data_port_read16 = function() {
  return this.dcfg & 1 ? this.data_port_read() | this.data_port_read() << 8 : this.data_port_read();
};
Ne2k.prototype.data_port_read32 = function() {
  return this.data_port_read() | this.data_port_read() << 8 | this.data_port_read() << 16 | this.data_port_read() << 24;
};
Ne2k.prototype.receive = function($data$$) {
  if (!(this.cr & 1) && (NE2K_LOG_PACKETS && dump_packet($data$$, "receive"), this.bus.send("eth-receive-end", [$data$$.length]), this.rxcr & 16 || this.rxcr & 4 && 255 === $data$$[0] && 255 === $data$$[1] && 255 === $data$$[2] && 255 === $data$$[3] && 255 === $data$$[4] && 255 === $data$$[5] || !(this.rxcr & 8 && 1 === ($data$$[0] & 1) || $data$$[0] !== this.mac[0] || $data$$[1] !== this.mac[1] || $data$$[2] !== this.mac[2] || $data$$[3] !== this.mac[3] || $data$$[4] !== this.mac[4] || $data$$[5] !== 
  this.mac[5]))) {
    this.mac_address_in_state && ($data$$ = new Uint8Array($data$$), translate_mac_address($data$$, this.mac, this.mac_address_in_state));
    var $offset$$ = this.curpg << 8, $total_length$$ = Math.max(60, $data$$.length) + 4, $data_start$$ = $offset$$ + 4, $next$$ = this.curpg + 1 + ($total_length$$ >> 8), $cut_end$$ = $offset$$ + $total_length$$, $needed$$ = 1 + ($total_length$$ >> 8), $available$$ = this.boundary > this.curpg ? this.boundary - this.curpg : this.pstop - this.curpg + this.boundary - this.pstart;
    $available$$ < $needed$$ && 0 !== this.boundary ? dbg_log("Buffer full, dropping packet pstart=" + h(this.pstart) + " pstop=" + h(this.pstop) + " curpg=" + h(this.curpg) + " needed=" + h($needed$$) + " boundary=" + h(this.boundary) + " available=" + h($available$$), LOG_NET) : ($cut_end$$ > this.pstop << 8 ? (dbg_assert(60 <= $data$$.length), $cut_end$$ = (this.pstop << 8) - $data_start$$, dbg_assert(0 <= $cut_end$$), this.memory.set($data$$.subarray(0, $cut_end$$), $data_start$$), this.memory.set($data$$.subarray($cut_end$$), 
    this.pstart << 8), dbg_log("rcv cut=" + h($cut_end$$), LOG_NET)) : (this.memory.set($data$$, $data_start$$), 60 > $data$$.length && this.memory.fill(0, $data_start$$ + $data$$.length, $data_start$$ + 60)), $next$$ >= this.pstop && ($next$$ += this.pstart - this.pstop), this.memory[$offset$$] = ENRSR_RXOK, this.memory[$offset$$ + 1] = $next$$, this.memory[$offset$$ + 2] = $total_length$$, this.memory[$offset$$ + 3] = $total_length$$ >> 8, this.curpg = $next$$, dbg_log("rcv offset=" + h($offset$$) + 
    " len=" + h($total_length$$) + " next=" + h($next$$), LOG_NET), this.do_interrupt(ENISR_RX));
  }
};
Ne2k.prototype.get_page = function() {
  return this.cr >> 6 & 3;
};
var DSP_COPYRIGHT = "COPYRIGHT (C) CREATIVE TECHNOLOGY LTD, 1992.", DSP_NO_COMMAND = 0, DSP_BUFSIZE = 64, DSP_DACSIZE = 65536, SB_DMA_BUFSIZE = 65536, SB_DMA_BLOCK_SAMPLES = 1024, SB_DMA0 = 0, SB_DMA1 = 1, SB_DMA3 = 3, SB_DMA5 = 5, SB_DMA6 = 6, SB_DMA7 = 7, SB_DMA_CHANNEL_8BIT = SB_DMA1, SB_DMA_CHANNEL_16BIT = SB_DMA5, SB_IRQ2 = 2, SB_IRQ5 = 5, SB_IRQ7 = 7, SB_IRQ10 = 10, SB_IRQ = SB_IRQ5, SB_IRQ_8BIT = 1, SB_IRQ_16BIT = 2, SB_IRQ_MIDI = 1, SB_IRQ_MPU = 4, DSP_COMMAND_SIZES = new Uint8Array(256), 
DSP_COMMAND_HANDLERS = [], MIXER_READ_HANDLERS = [], MIXER_WRITE_HANDLERS = [], MIXER_REGISTER_IS_LEGACY = new Uint8Array(256), FM_HANDLERS = [];
function SB16($cpu$$, $bus$$) {
  this.cpu = $cpu$$;
  this.bus = $bus$$;
  this.write_buffer = new ByteQueue(DSP_BUFSIZE);
  this.read_buffer = new ByteQueue(DSP_BUFSIZE);
  this.read_buffer_lastvalue = 0;
  this.command = DSP_NO_COMMAND;
  this.mixer_current_address = this.command_size = 0;
  this.mixer_registers = new Uint8Array(256);
  this.mixer_reset();
  this.dummy_speaker_enabled = !1;
  this.test_register = 0;
  this.dsp_signed = this.dsp_16bit = this.dsp_stereo = this.dsp_highspeed = !1;
  this.dac_buffers = [new FloatQueue(DSP_DACSIZE), new FloatQueue(DSP_DACSIZE), ];
  this.dma = $cpu$$.devices.dma;
  this.dma_channel = this.dma_irq = this.dma_bytes_block = this.dma_bytes_left = this.dma_bytes_count = this.dma_sample_count = 0;
  this.dma_channel_8bit = SB_DMA1;
  this.dma_channel_16bit = SB_DMA5;
  this.dma_autoinit = !1;
  this.dma_buffer = new ArrayBuffer(SB_DMA_BUFSIZE);
  this.dma_buffer_int8 = new Int8Array(this.dma_buffer);
  this.dma_buffer_uint8 = new Uint8Array(this.dma_buffer);
  this.dma_buffer_int16 = new Int16Array(this.dma_buffer);
  this.dma_buffer_uint16 = new Uint16Array(this.dma_buffer);
  this.dma_syncbuffer = new v86util.SyncBuffer(this.dma_buffer);
  this.dma_paused = this.dma_waiting_transfer = !1;
  this.sampling_rate = 22050;
  $bus$$.send("dac-tell-sampling-rate", this.sampling_rate);
  this.bytes_per_sample = 1;
  this.e2_value = 170;
  this.e2_count = 0;
  this.asp_registers = new Uint8Array(256);
  this.mpu_read_buffer = new ByteQueue(DSP_BUFSIZE);
  this.fm_current_address1 = this.fm_current_address0 = this.mpu_read_buffer_lastvalue = 0;
  this.fm_waveform_select_enable = !1;
  this.irq = SB_IRQ5;
  this.irq_triggered = new Uint8Array(16);
  $cpu$$.io.register_read_consecutive(544, this, this.port2x0_read, this.port2x1_read, this.port2x2_read, this.port2x3_read);
  $cpu$$.io.register_read_consecutive(904, this, this.port2x0_read, this.port2x1_read);
  $cpu$$.io.register_read_consecutive(548, this, this.port2x4_read, this.port2x5_read);
  $cpu$$.io.register_read(550, this, this.port2x6_read);
  $cpu$$.io.register_read(551, this, this.port2x7_read);
  $cpu$$.io.register_read(552, this, this.port2x8_read);
  $cpu$$.io.register_read(553, this, this.port2x9_read);
  $cpu$$.io.register_read(554, this, this.port2xA_read);
  $cpu$$.io.register_read(555, this, this.port2xB_read);
  $cpu$$.io.register_read(556, this, this.port2xC_read);
  $cpu$$.io.register_read(557, this, this.port2xD_read);
  $cpu$$.io.register_read_consecutive(558, this, this.port2xE_read, this.port2xF_read);
  $cpu$$.io.register_write_consecutive(544, this, this.port2x0_write, this.port2x1_write, this.port2x2_write, this.port2x3_write);
  $cpu$$.io.register_write_consecutive(904, this, this.port2x0_write, this.port2x1_write);
  $cpu$$.io.register_write_consecutive(548, this, this.port2x4_write, this.port2x5_write);
  $cpu$$.io.register_write(550, this, this.port2x6_write);
  $cpu$$.io.register_write(551, this, this.port2x7_write);
  $cpu$$.io.register_write_consecutive(552, this, this.port2x8_write, this.port2x9_write);
  $cpu$$.io.register_write(554, this, this.port2xA_write);
  $cpu$$.io.register_write(555, this, this.port2xB_write);
  $cpu$$.io.register_write(556, this, this.port2xC_write);
  $cpu$$.io.register_write(557, this, this.port2xD_write);
  $cpu$$.io.register_write(558, this, this.port2xE_write);
  $cpu$$.io.register_write(559, this, this.port2xF_write);
  $cpu$$.io.register_read_consecutive(816, this, this.port3x0_read, this.port3x1_read);
  $cpu$$.io.register_write_consecutive(816, this, this.port3x0_write, this.port3x1_write);
  this.dma.on_unmask(this.dma_on_unmask, this);
  $bus$$.register("dac-request-data", function() {
    this.dac_handle_request();
  }, this);
  $bus$$.register("speaker-has-initialized", function() {
    this.mixer_reset();
  }, this);
  $bus$$.send("speaker-confirm-initialized");
  this.dsp_reset();
}
SB16.prototype.dsp_reset = function() {
  this.write_buffer.clear();
  this.read_buffer.clear();
  this.command = DSP_NO_COMMAND;
  this.command_size = 0;
  this.dummy_speaker_enabled = !1;
  this.test_register = 0;
  this.dsp_signed = this.dsp_16bit = this.dsp_stereo = this.dsp_highspeed = !1;
  this.dac_buffers[0].clear();
  this.dac_buffers[1].clear();
  this.dma_channel = this.dma_irq = this.dma_bytes_block = this.dma_bytes_left = this.dma_bytes_count = this.dma_sample_count = 0;
  this.dma_autoinit = !1;
  this.dma_buffer_uint8.fill(0);
  this.dma_paused = this.dma_waiting_transfer = !1;
  this.e2_value = 170;
  this.e2_count = 0;
  this.sampling_rate = 22050;
  this.bytes_per_sample = 1;
  this.lower_irq(SB_IRQ_8BIT);
  this.irq_triggered.fill(0);
  this.asp_registers.fill(0);
  this.asp_registers[5] = 1;
  this.asp_registers[9] = 248;
};
SB16.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[2] = this.read_buffer_lastvalue;
  $state$$[3] = this.command;
  $state$$[4] = this.command_size;
  $state$$[5] = this.mixer_current_address;
  $state$$[6] = this.mixer_registers;
  $state$$[7] = this.dummy_speaker_enabled;
  $state$$[8] = this.test_register;
  $state$$[9] = this.dsp_highspeed;
  $state$$[10] = this.dsp_stereo;
  $state$$[11] = this.dsp_16bit;
  $state$$[12] = this.dsp_signed;
  $state$$[15] = this.dma_sample_count;
  $state$$[16] = this.dma_bytes_count;
  $state$$[17] = this.dma_bytes_left;
  $state$$[18] = this.dma_bytes_block;
  $state$$[19] = this.dma_irq;
  $state$$[20] = this.dma_channel;
  $state$$[21] = this.dma_channel_8bit;
  $state$$[22] = this.dma_channel_16bit;
  $state$$[23] = this.dma_autoinit;
  $state$$[24] = this.dma_buffer_uint8;
  $state$$[25] = this.dma_waiting_transfer;
  $state$$[26] = this.dma_paused;
  $state$$[27] = this.sampling_rate;
  $state$$[28] = this.bytes_per_sample;
  $state$$[29] = this.e2_value;
  $state$$[30] = this.e2_count;
  $state$$[31] = this.asp_registers;
  $state$$[33] = this.mpu_read_buffer_last_value;
  $state$$[34] = this.irq;
  $state$$[35] = this.irq_triggered;
  return $state$$;
};
SB16.prototype.set_state = function($state$$) {
  this.read_buffer_lastvalue = $state$$[2];
  this.command = $state$$[3];
  this.command_size = $state$$[4];
  this.mixer_current_address = $state$$[5];
  this.mixer_registers = $state$$[6];
  this.mixer_full_update();
  this.dummy_speaker_enabled = $state$$[7];
  this.test_register = $state$$[8];
  this.dsp_highspeed = $state$$[9];
  this.dsp_stereo = $state$$[10];
  this.dsp_16bit = $state$$[11];
  this.dsp_signed = $state$$[12];
  this.dma_sample_count = $state$$[15];
  this.dma_bytes_count = $state$$[16];
  this.dma_bytes_left = $state$$[17];
  this.dma_bytes_block = $state$$[18];
  this.dma_irq = $state$$[19];
  this.dma_channel = $state$$[20];
  this.dma_channel_8bit = $state$$[21];
  this.dma_channel_16bit = $state$$[22];
  this.dma_autoinit = $state$$[23];
  this.dma_buffer_uint8 = $state$$[24];
  this.dma_waiting_transfer = $state$$[25];
  this.dma_paused = $state$$[26];
  this.sampling_rate = $state$$[27];
  this.bytes_per_sample = $state$$[28];
  this.e2_value = $state$$[29];
  this.e2_count = $state$$[30];
  this.asp_registers = $state$$[31];
  this.mpu_read_buffer_last_value = $state$$[33];
  this.irq = $state$$[34];
  this.irq_triggered = $state$$[35];
  this.dma_buffer = this.dma_buffer_uint8.buffer;
  this.dma_buffer_int8 = new Int8Array(this.dma_buffer);
  this.dma_buffer_int16 = new Int16Array(this.dma_buffer);
  this.dma_buffer_uint16 = new Uint16Array(this.dma_buffer);
  this.dma_syncbuffer = new v86util.SyncBuffer(this.dma_buffer);
  this.dma_paused ? this.bus.send("dac-disable") : this.bus.send("dac-enable");
};
SB16.prototype.port2x0_read = function() {
  dbg_log("220 read: fm music status port (unimplemented)", LOG_SB16);
  return 255;
};
SB16.prototype.port2x1_read = function() {
  dbg_log("221 read: fm music data port (write only)", LOG_SB16);
  return 255;
};
SB16.prototype.port2x2_read = function() {
  dbg_log("222 read: advanced fm music status port (unimplemented)", LOG_SB16);
  return 255;
};
SB16.prototype.port2x3_read = function() {
  dbg_log("223 read: advanced music data port (write only)", LOG_SB16);
  return 255;
};
SB16.prototype.port2x4_read = function() {
  dbg_log("224 read: mixer address port", LOG_SB16);
  return this.mixer_current_address;
};
SB16.prototype.port2x5_read = function() {
  dbg_log("225 read: mixer data port", LOG_SB16);
  return this.mixer_read(this.mixer_current_address);
};
SB16.prototype.port2x6_read = function() {
  dbg_log("226 read: (write only)", LOG_SB16);
  return 255;
};
SB16.prototype.port2x7_read = function() {
  dbg_log("227 read: undocumented", LOG_SB16);
  return 255;
};
SB16.prototype.port2x8_read = function() {
  dbg_log("228 read: fm music status port (unimplemented)", LOG_SB16);
  return 255;
};
SB16.prototype.port2x9_read = function() {
  dbg_log("229 read: fm music data port (write only)", LOG_SB16);
  return 255;
};
SB16.prototype.port2xA_read = function() {
  dbg_log("22A read: read data", LOG_SB16);
  this.read_buffer.length && (this.read_buffer_lastvalue = this.read_buffer.shift());
  dbg_log(" <- " + this.read_buffer_lastvalue + " " + h(this.read_buffer_lastvalue) + " '" + String.fromCharCode(this.read_buffer_lastvalue) + "'", LOG_SB16);
  return this.read_buffer_lastvalue;
};
SB16.prototype.port2xB_read = function() {
  dbg_log("22B read: undocumented", LOG_SB16);
  return 255;
};
SB16.prototype.port2xC_read = function() {
  dbg_log("22C read: write-buffer status", LOG_SB16);
  return 127;
};
SB16.prototype.port2xD_read = function() {
  dbg_log("22D read: undocumented", LOG_SB16);
  return 255;
};
SB16.prototype.port2xE_read = function() {
  dbg_log("22E read: read-buffer status / irq 8bit ack.", LOG_SB16);
  this.irq_triggered[SB_IRQ_8BIT] && this.lower_irq(SB_IRQ_8BIT);
  return (this.read_buffer.length && !this.dsp_highspeed) << 7 | 127;
};
SB16.prototype.port2xF_read = function() {
  dbg_log("22F read: irq 16bit ack", LOG_SB16);
  this.lower_irq(SB_IRQ_16BIT);
  return 0;
};
SB16.prototype.port2x0_write = function($value$$) {
  dbg_log("220 write: (unimplemented) fm register 0 address = " + h($value$$), LOG_SB16);
  this.fm_current_address0 = 0;
};
SB16.prototype.port2x1_write = function($value$$) {
  dbg_log("221 write: (unimplemented) fm register 0 data = " + h($value$$), LOG_SB16);
  var $handler$$ = FM_HANDLERS[this.fm_current_address0];
  $handler$$ || ($handler$$ = this.fm_default_write);
  $handler$$.call(this, $value$$, 0, this.fm_current_address0);
};
SB16.prototype.port2x2_write = function($value$$) {
  dbg_log("222 write: (unimplemented) fm register 1 address = " + h($value$$), LOG_SB16);
  this.fm_current_address1 = 0;
};
SB16.prototype.port2x3_write = function($value$$) {
  dbg_log("223 write: (unimplemented) fm register 1 data =" + h($value$$), LOG_SB16);
  var $handler$$ = FM_HANDLERS[this.fm_current_address1];
  $handler$$ || ($handler$$ = this.fm_default_write);
  $handler$$.call(this, $value$$, 1, this.fm_current_address1);
};
SB16.prototype.port2x4_write = function($value$$) {
  dbg_log("224 write: mixer address = " + h($value$$), LOG_SB16);
  this.mixer_current_address = $value$$;
};
SB16.prototype.port2x5_write = function($value$$) {
  dbg_log("225 write: mixer data = " + h($value$$), LOG_SB16);
  this.mixer_write(this.mixer_current_address, $value$$);
};
SB16.prototype.port2x6_write = function($yesplease$$) {
  dbg_log("226 write: reset = " + h($yesplease$$), LOG_SB16);
  this.dsp_highspeed ? (dbg_log(" -> exit highspeed", LOG_SB16), this.dsp_highspeed = !1) : $yesplease$$ && (dbg_log(" -> reset", LOG_SB16), this.dsp_reset());
  this.read_buffer.clear();
  this.read_buffer.push(170);
};
SB16.prototype.port2x7_write = function($value$$) {
  dbg_log("227 write: undocumented", LOG_SB16);
};
SB16.prototype.port2x8_write = function($value$$) {
  dbg_log("228 write: fm music register port (unimplemented)", LOG_SB16);
};
SB16.prototype.port2x9_write = function($value$$) {
  dbg_log("229 write: fm music data port (unimplemented)", LOG_SB16);
};
SB16.prototype.port2xA_write = function($value$$) {
  dbg_log("22A write: dsp read data port (read only)", LOG_SB16);
};
SB16.prototype.port2xB_write = function($value$$) {
  dbg_log("22B write: undocumented", LOG_SB16);
};
SB16.prototype.port2xC_write = function($value$$) {
  dbg_log("22C write: write command/data", LOG_SB16);
  this.command === DSP_NO_COMMAND ? (dbg_log("22C write: command = " + h($value$$), LOG_SB16), this.command = $value$$, this.write_buffer.clear(), this.command_size = DSP_COMMAND_SIZES[$value$$]) : (dbg_log("22C write: data: " + h($value$$), LOG_SB16), this.write_buffer.push($value$$));
  this.write_buffer.length >= this.command_size && this.command_do();
};
SB16.prototype.port2xD_write = function($value$$) {
  dbg_log("22D write: undocumented", LOG_SB16);
};
SB16.prototype.port2xE_write = function($value$$) {
  dbg_log("22E write: dsp read buffer status (read only)", LOG_SB16);
};
SB16.prototype.port2xF_write = function($value$$) {
  dbg_log("22F write: undocumented", LOG_SB16);
};
SB16.prototype.port3x0_read = function() {
  dbg_log("330 read: mpu data", LOG_SB16);
  this.mpu_read_buffer.length && (this.mpu_read_buffer_lastvalue = this.mpu_read_buffer.shift());
  dbg_log(" <- " + h(this.mpu_read_buffer_lastvalue), LOG_SB16);
  return this.mpu_read_buffer_lastvalue;
};
SB16.prototype.port3x0_write = function($value$$) {
  dbg_log("330 write: mpu data (unimplemented) : " + h($value$$), LOG_SB16);
};
SB16.prototype.port3x1_read = function() {
  dbg_log("331 read: mpu status", LOG_SB16);
  return 0 | 128 * !this.mpu_read_buffer.length;
};
SB16.prototype.port3x1_write = function($value$$) {
  dbg_log("331 write: mpu command: " + h($value$$), LOG_SB16);
  255 == $value$$ && (this.mpu_read_buffer.clear(), this.mpu_read_buffer.push(254));
};
SB16.prototype.command_do = function() {
  var $handler$$ = DSP_COMMAND_HANDLERS[this.command];
  $handler$$ || ($handler$$ = this.dsp_default_handler);
  $handler$$.call(this);
  this.command = DSP_NO_COMMAND;
  this.command_size = 0;
  this.write_buffer.clear();
};
SB16.prototype.dsp_default_handler = function() {
  dbg_log("Unhandled command: " + h(this.command), LOG_SB16);
};
function register_dsp_command($commands$$, $size$$, $handler$$) {
  $handler$$ || ($handler$$ = SB16.prototype.dsp_default_handler);
  for (var $i$$ = 0; $i$$ < $commands$$.length; $i$$++) {
    DSP_COMMAND_SIZES[$commands$$[$i$$]] = $size$$, DSP_COMMAND_HANDLERS[$commands$$[$i$$]] = $handler$$;
  }
}
function any_first_digit($base$$) {
  for (var $commands$$ = [], $i$$ = 0; 16 > $i$$; $i$$++) {
    $commands$$.push($base$$ + $i$$);
  }
  return $commands$$;
}
register_dsp_command([14], 2, function() {
  this.asp_registers[this.write_buffer.shift()] = this.write_buffer.shift();
});
register_dsp_command([15], 1, function() {
  this.read_buffer.clear();
  this.read_buffer.push(this.asp_registers[this.write_buffer.shift()]);
});
register_dsp_command([16], 1, function() {
  var $value$$ = audio_normalize(this.write_buffer.shift(), 127.5, -1);
  this.dac_buffers[0].push($value$$);
  this.dac_buffers[1].push($value$$);
  this.bus.send("dac-enable");
});
register_dsp_command([20, 21], 2, function() {
  this.dma_irq = SB_IRQ_8BIT;
  this.dma_channel = this.dma_channel_8bit;
  this.dsp_highspeed = this.dsp_16bit = this.dsp_signed = this.dma_autoinit = !1;
  this.dma_transfer_size_set();
  this.dma_transfer_start();
});
register_dsp_command([22], 2);
register_dsp_command([23], 2);
register_dsp_command([28], 0, function() {
  this.dma_irq = SB_IRQ_8BIT;
  this.dma_channel = this.dma_channel_8bit;
  this.dma_autoinit = !0;
  this.dsp_highspeed = this.dsp_16bit = this.dsp_signed = !1;
  this.dma_transfer_start();
});
register_dsp_command([31], 0);
register_dsp_command([32], 0, function() {
  this.read_buffer.clear();
  this.read_buffer.push(127);
});
register_dsp_command([36], 2);
register_dsp_command([44], 0);
register_dsp_command([48], 0);
register_dsp_command([49], 0);
register_dsp_command([52], 0);
register_dsp_command([53], 0);
register_dsp_command([54], 0);
register_dsp_command([55], 0);
register_dsp_command([56], 0);
register_dsp_command([64], 1, function() {
  this.sampling_rate_change(1000000 / (256 - this.write_buffer.shift()) / this.get_channel_count());
});
register_dsp_command([65, 66], 2, function() {
  this.sampling_rate_change(this.write_buffer.shift() << 8 | this.write_buffer.shift());
});
register_dsp_command([72], 2, function() {
  this.dma_transfer_size_set();
});
register_dsp_command([116], 2);
register_dsp_command([117], 2);
register_dsp_command([118], 2);
register_dsp_command([119], 2);
register_dsp_command([125], 0);
register_dsp_command([127], 0);
register_dsp_command([128], 2);
register_dsp_command([144], 0, function() {
  this.dma_irq = SB_IRQ_8BIT;
  this.dma_channel = this.dma_channel_8bit;
  this.dma_autoinit = !0;
  this.dsp_signed = !1;
  this.dsp_highspeed = !0;
  this.dsp_16bit = !1;
  this.dma_transfer_start();
});
register_dsp_command([145], 0);
register_dsp_command([152], 0);
register_dsp_command([153], 0);
register_dsp_command([160], 0);
register_dsp_command([168], 0);
register_dsp_command(any_first_digit(176), 3, function() {
  if (this.command & 8) {
    this.dsp_default_handler();
  } else {
    var $mode$$ = this.write_buffer.shift();
    this.dma_irq = SB_IRQ_16BIT;
    this.dma_channel = this.dma_channel_16bit;
    this.dma_autoinit = !!(this.command & 4);
    this.dsp_signed = !!($mode$$ & 16);
    this.dsp_stereo = !!($mode$$ & 32);
    this.dsp_16bit = !0;
    this.dma_transfer_size_set();
    this.dma_transfer_start();
  }
});
register_dsp_command(any_first_digit(192), 3, function() {
  if (this.command & 8) {
    this.dsp_default_handler();
  } else {
    var $mode$$ = this.write_buffer.shift();
    this.dma_irq = SB_IRQ_8BIT;
    this.dma_channel = this.dma_channel_8bit;
    this.dma_autoinit = !!(this.command & 4);
    this.dsp_signed = !!($mode$$ & 16);
    this.dsp_stereo = !!($mode$$ & 32);
    this.dsp_16bit = !1;
    this.dma_transfer_size_set();
    this.dma_transfer_start();
  }
});
register_dsp_command([208], 0, function() {
  this.dma_paused = !0;
  this.bus.send("dac-disable");
});
register_dsp_command([209], 0, function() {
  this.dummy_speaker_enabled = !0;
});
register_dsp_command([211], 0, function() {
  this.dummy_speaker_enabled = !1;
});
register_dsp_command([212], 0, function() {
  this.dma_paused = !1;
  this.bus.send("dac-enable");
});
register_dsp_command([213], 0, function() {
  this.dma_paused = !0;
  this.bus.send("dac-disable");
});
register_dsp_command([214], 0, function() {
  this.dma_paused = !1;
  this.bus.send("dac-enable");
});
register_dsp_command([216], 0, function() {
  this.read_buffer.clear();
  this.read_buffer.push(255 * this.dummy_speaker_enabled);
});
register_dsp_command([217, 218], 0, function() {
  this.dma_autoinit = !1;
});
register_dsp_command([224], 1, function() {
  this.read_buffer.clear();
  this.read_buffer.push(~this.write_buffer.shift());
});
register_dsp_command([225], 0, function() {
  this.read_buffer.clear();
  this.read_buffer.push(4);
  this.read_buffer.push(5);
});
register_dsp_command([226], 1);
register_dsp_command([227], 0, function() {
  this.read_buffer.clear();
  for (var $i$$ = 0; $i$$ < DSP_COPYRIGHT.length; $i$$++) {
    this.read_buffer.push(DSP_COPYRIGHT.charCodeAt($i$$));
  }
  this.read_buffer.push(0);
});
register_dsp_command([228], 1, function() {
  this.test_register = this.write_buffer.shift();
});
register_dsp_command([232], 0, function() {
  this.read_buffer.clear();
  this.read_buffer.push(this.test_register);
});
register_dsp_command([242, 243], 0, function() {
  this.raise_irq();
});
var SB_F9 = new Uint8Array(256);
SB_F9[14] = 255;
SB_F9[15] = 7;
SB_F9[55] = 56;
register_dsp_command([249], 1, function() {
  var $input$$ = this.write_buffer.shift();
  dbg_log("dsp 0xf9: unknown function. input: " + $input$$, LOG_SB16);
  this.read_buffer.clear();
  this.read_buffer.push(SB_F9[$input$$]);
});
SB16.prototype.mixer_read = function($address$$) {
  var $data$jscomp$141_handler$$ = MIXER_READ_HANDLERS[$address$$];
  $data$jscomp$141_handler$$ ? $data$jscomp$141_handler$$ = $data$jscomp$141_handler$$.call(this) : ($data$jscomp$141_handler$$ = this.mixer_registers[$address$$], dbg_log("unhandled mixer register read. addr:" + h($address$$) + " data:" + h($data$jscomp$141_handler$$), LOG_SB16));
  return $data$jscomp$141_handler$$;
};
SB16.prototype.mixer_write = function($address$$, $data$$) {
  var $handler$$ = MIXER_WRITE_HANDLERS[$address$$];
  $handler$$ ? $handler$$.call(this, $data$$) : dbg_log("unhandled mixer register write. addr:" + h($address$$) + " data:" + h($data$$), LOG_SB16);
};
SB16.prototype.mixer_default_read = function() {
  dbg_log("mixer register read. addr:" + h(this.mixer_current_address), LOG_SB16);
  return this.mixer_registers[this.mixer_current_address];
};
SB16.prototype.mixer_default_write = function($data$$) {
  dbg_log("mixer register write. addr:" + h(this.mixer_current_address) + " data:" + h($data$$), LOG_SB16);
  this.mixer_registers[this.mixer_current_address] = $data$$;
};
SB16.prototype.mixer_reset = function() {
  this.mixer_registers[4] = 204;
  this.mixer_registers[34] = 204;
  this.mixer_registers[38] = 204;
  this.mixer_registers[40] = 0;
  this.mixer_registers[46] = 0;
  this.mixer_registers[10] = 0;
  this.mixer_registers[48] = 192;
  this.mixer_registers[49] = 192;
  this.mixer_registers[50] = 192;
  this.mixer_registers[51] = 192;
  this.mixer_registers[52] = 192;
  this.mixer_registers[53] = 192;
  this.mixer_registers[54] = 0;
  this.mixer_registers[55] = 0;
  this.mixer_registers[56] = 0;
  this.mixer_registers[57] = 0;
  this.mixer_registers[59] = 0;
  this.mixer_registers[60] = 31;
  this.mixer_registers[61] = 21;
  this.mixer_registers[62] = 11;
  this.mixer_registers[63] = 0;
  this.mixer_registers[64] = 0;
  this.mixer_registers[65] = 0;
  this.mixer_registers[66] = 0;
  this.mixer_registers[67] = 0;
  this.mixer_registers[68] = 128;
  this.mixer_registers[69] = 128;
  this.mixer_registers[70] = 128;
  this.mixer_registers[71] = 128;
  this.mixer_full_update();
};
SB16.prototype.mixer_full_update = function() {
  for (var $i$$ = 1; $i$$ < this.mixer_registers.length; $i$$++) {
    MIXER_REGISTER_IS_LEGACY[$i$$] || this.mixer_write($i$$, this.mixer_registers[$i$$]);
  }
};
function register_mixer_read($address$$, $handler$$) {
  $handler$$ || ($handler$$ = SB16.prototype.mixer_default_read);
  MIXER_READ_HANDLERS[$address$$] = $handler$$;
}
function register_mixer_write($address$$, $handler$$) {
  $handler$$ || ($handler$$ = SB16.prototype.mixer_default_write);
  MIXER_WRITE_HANDLERS[$address$$] = $handler$$;
}
function register_mixer_legacy($address_old$$, $address_new_left$$, $address_new_right$$) {
  MIXER_REGISTER_IS_LEGACY[$address_old$$] = 1;
  MIXER_READ_HANDLERS[$address_old$$] = function() {
    return this.mixer_registers[$address_new_left$$] & 240 | this.mixer_registers[$address_new_right$$] >>> 4;
  };
  MIXER_WRITE_HANDLERS[$address_old$$] = function($data$$) {
    this.mixer_registers[$address_old$$] = $data$$;
    var $right$$ = $data$$ << 4 & 240 | this.mixer_registers[$address_new_right$$] & 15;
    this.mixer_write($address_new_left$$, $data$$ & 240 | this.mixer_registers[$address_new_left$$] & 15);
    this.mixer_write($address_new_right$$, $right$$);
  };
}
function register_mixer_volume($address$$, $mixer_source$$, $channel$$) {
  MIXER_READ_HANDLERS[$address$$] = SB16.prototype.mixer_default_read;
  MIXER_WRITE_HANDLERS[$address$$] = function($data$$) {
    this.mixer_registers[$address$$] = $data$$;
    this.bus.send("mixer-volume", [$mixer_source$$, $channel$$, ($data$$ >>> 2) - 62]);
  };
}
register_mixer_read(0, function() {
  this.mixer_reset();
  return 0;
});
register_mixer_write(0);
register_mixer_legacy(4, 50, 51);
register_mixer_legacy(34, 48, 49);
register_mixer_legacy(38, 52, 53);
register_mixer_legacy(40, 54, 55);
register_mixer_legacy(46, 56, 57);
register_mixer_volume(48, MIXER_SRC_MASTER, MIXER_CHANNEL_LEFT);
register_mixer_volume(49, MIXER_SRC_MASTER, MIXER_CHANNEL_RIGHT);
register_mixer_volume(50, MIXER_SRC_DAC, MIXER_CHANNEL_LEFT);
register_mixer_volume(51, MIXER_SRC_DAC, MIXER_CHANNEL_RIGHT);
register_mixer_read(59);
register_mixer_write(59, function($data$$) {
  this.mixer_registers[59] = $data$$;
  this.bus.send("mixer-volume", [MIXER_SRC_PCSPEAKER, MIXER_CHANNEL_BOTH, 6 * ($data$$ >>> 6) - 18]);
});
register_mixer_read(65);
register_mixer_write(65, function($data$$) {
  this.mixer_registers[65] = $data$$;
  this.bus.send("mixer-gain-left", 6 * ($data$$ >>> 6));
});
register_mixer_read(66);
register_mixer_write(66, function($data$$) {
  this.mixer_registers[66] = $data$$;
  this.bus.send("mixer-gain-right", 6 * ($data$$ >>> 6));
});
register_mixer_read(68);
register_mixer_write(68, function($data$$) {
  this.mixer_registers[68] = $data$$;
  $data$$ >>>= 3;
  this.bus.send("mixer-treble-left", $data$$ - (16 > $data$$ ? 14 : 16));
});
register_mixer_read(69);
register_mixer_write(69, function($data$$) {
  this.mixer_registers[69] = $data$$;
  $data$$ >>>= 3;
  this.bus.send("mixer-treble-right", $data$$ - (16 > $data$$ ? 14 : 16));
});
register_mixer_read(70);
register_mixer_write(70, function($data$$) {
  this.mixer_registers[70] = $data$$;
  $data$$ >>>= 3;
  this.bus.send("mixer-bass-right", $data$$ - (16 > $data$$ ? 14 : 16));
});
register_mixer_read(71);
register_mixer_write(71, function($data$$) {
  this.mixer_registers[71] = $data$$;
  $data$$ >>>= 3;
  this.bus.send("mixer-bass-right", $data$$ - (16 > $data$$ ? 14 : 16));
});
register_mixer_read(128, function() {
  switch(this.irq) {
    case SB_IRQ2:
      return 1;
    case SB_IRQ5:
      return 2;
    case SB_IRQ7:
      return 4;
    case SB_IRQ10:
      return 8;
    default:
      return 0;
  }
});
register_mixer_write(128, function($bits$$) {
  $bits$$ & 1 && (this.irq = SB_IRQ2);
  $bits$$ & 2 && (this.irq = SB_IRQ5);
  $bits$$ & 4 && (this.irq = SB_IRQ7);
  $bits$$ & 8 && (this.irq = SB_IRQ10);
});
register_mixer_read(129, function() {
  var $ret$$ = 0;
  switch(this.dma_channel_8bit) {
    case SB_DMA0:
      $ret$$ |= 1;
      break;
    case SB_DMA1:
      $ret$$ |= 2;
      break;
    case SB_DMA3:
      $ret$$ |= 8;
  }
  switch(this.dma_channel_16bit) {
    case SB_DMA5:
      $ret$$ |= 32;
      break;
    case SB_DMA6:
      $ret$$ |= 64;
      break;
    case SB_DMA7:
      $ret$$ |= 128;
  }
  return $ret$$;
});
register_mixer_write(129, function($bits$$) {
  $bits$$ & 1 && (this.dma_channel_8bit = SB_DMA0);
  $bits$$ & 2 && (this.dma_channel_8bit = SB_DMA1);
  $bits$$ & 8 && (this.dma_channel_8bit = SB_DMA3);
  $bits$$ & 32 && (this.dma_channel_16bit = SB_DMA5);
  $bits$$ & 64 && (this.dma_channel_16bit = SB_DMA6);
  $bits$$ & 128 && (this.dma_channel_16bit = SB_DMA7);
});
register_mixer_read(130, function() {
  for (var $ret$$ = 32, $i$$ = 0; 16 > $i$$; $i$$++) {
    $ret$$ |= $i$$ * this.irq_triggered[$i$$];
  }
  return $ret$$;
});
SB16.prototype.fm_default_write = function($data$$, $register$$, $address$$) {
  dbg_log("unhandled fm register write. addr:" + $register$$ + "|" + h($address$$) + " data:" + h($data$$), LOG_SB16);
};
function register_fm_write($addresses$$, $handler$$) {
  $handler$$ || ($handler$$ = SB16.prototype.fm_default_write);
  for (var $i$$ = 0; $i$$ < $addresses$$.length; $i$$++) {
    FM_HANDLERS[$addresses$$[$i$$]] = $handler$$;
  }
}
function between($i$jscomp$53_start$$, $end$$) {
  for (var $a$$ = []; $i$jscomp$53_start$$ <= $end$$; $i$jscomp$53_start$$++) {
    $a$$.push($i$jscomp$53_start$$);
  }
  return $a$$;
}
var SB_FM_OPERATORS_BY_OFFSET = new Uint8Array(32);
SB_FM_OPERATORS_BY_OFFSET[0] = 0;
SB_FM_OPERATORS_BY_OFFSET[1] = 1;
SB_FM_OPERATORS_BY_OFFSET[2] = 2;
SB_FM_OPERATORS_BY_OFFSET[3] = 3;
SB_FM_OPERATORS_BY_OFFSET[4] = 4;
SB_FM_OPERATORS_BY_OFFSET[5] = 5;
SB_FM_OPERATORS_BY_OFFSET[8] = 6;
SB_FM_OPERATORS_BY_OFFSET[9] = 7;
SB_FM_OPERATORS_BY_OFFSET[10] = 8;
SB_FM_OPERATORS_BY_OFFSET[11] = 9;
SB_FM_OPERATORS_BY_OFFSET[12] = 10;
SB_FM_OPERATORS_BY_OFFSET[13] = 11;
SB_FM_OPERATORS_BY_OFFSET[16] = 12;
SB_FM_OPERATORS_BY_OFFSET[17] = 13;
SB_FM_OPERATORS_BY_OFFSET[18] = 14;
SB_FM_OPERATORS_BY_OFFSET[19] = 15;
SB_FM_OPERATORS_BY_OFFSET[20] = 16;
SB_FM_OPERATORS_BY_OFFSET[21] = 17;
function get_fm_operator($register$$, $offset$$) {
  return 18 * $register$$ + SB_FM_OPERATORS_BY_OFFSET[$offset$$];
}
register_fm_write([1], function($bits$$, $register$$, $address$$) {
  this.fm_waveform_select_enable[$register$$] = $bits$$ & 1;
  this.fm_update_waveforms();
});
register_fm_write([2]);
register_fm_write([3]);
register_fm_write([4], function($bits$$, $register$$, $address$$) {
});
register_fm_write([5], function($bits$$, $register$$, $address$$) {
  0 === $register$$ && this.fm_default_write($bits$$, $register$$, $address$$);
});
register_fm_write([8], function($bits$$, $register$$, $address$$) {
});
register_fm_write(between(32, 53), function($bits$$, $register$$, $address$$) {
  get_fm_operator($register$$, $address$$ - 32);
});
register_fm_write(between(64, 85), function($bits$$, $register$$, $address$$) {
  get_fm_operator($register$$, $address$$ - 64);
});
register_fm_write(between(96, 117), function($bits$$, $register$$, $address$$) {
  get_fm_operator($register$$, $address$$ - 96);
});
register_fm_write(between(128, 149), function($bits$$, $register$$, $address$$) {
  get_fm_operator($register$$, $address$$ - 128);
});
register_fm_write(between(160, 168), function($bits$$, $register$$, $address$$) {
});
register_fm_write(between(176, 184), function($bits$$, $register$$, $address$$) {
});
register_fm_write([189], function($bits$$, $register$$, $address$$) {
});
register_fm_write(between(192, 200), function($bits$$, $register$$, $address$$) {
});
register_fm_write(between(224, 245), function($bits$$, $register$$, $address$$) {
  get_fm_operator($register$$, $address$$ - 224);
});
SB16.prototype.fm_update_waveforms = function() {
};
SB16.prototype.sampling_rate_change = function($rate$$) {
  this.sampling_rate = $rate$$;
  this.bus.send("dac-tell-sampling-rate", $rate$$);
};
SB16.prototype.get_channel_count = function() {
  return this.dsp_stereo ? 2 : 1;
};
SB16.prototype.dma_transfer_size_set = function() {
  this.dma_sample_count = 1 + (this.write_buffer.shift() << 0) + (this.write_buffer.shift() << 8);
};
SB16.prototype.dma_transfer_start = function() {
  dbg_log("begin dma transfer", LOG_SB16);
  this.bytes_per_sample = 1;
  this.dsp_16bit && (this.bytes_per_sample *= 2);
  this.dma_bytes_count = this.dma_sample_count * this.bytes_per_sample;
  this.dma_bytes_block = SB_DMA_BLOCK_SAMPLES * this.bytes_per_sample;
  this.dma_bytes_block = Math.min(Math.max(this.dma_bytes_count >> 2 & -4, 32), this.dma_bytes_block);
  this.dma_waiting_transfer = !0;
  this.dma.channel_mask[this.dma_channel] || this.dma_on_unmask(this.dma_channel);
};
SB16.prototype.dma_on_unmask = function($channel$$) {
  $channel$$ === this.dma_channel && this.dma_waiting_transfer && (this.dma_waiting_transfer = !1, this.dma_bytes_left = this.dma_bytes_count, this.dma_paused = !1, this.bus.send("dac-enable"));
};
SB16.prototype.dma_transfer_next = function() {
  dbg_log("dma transfering next block", LOG_SB16);
  var $size$$ = Math.min(this.dma_bytes_left, this.dma_bytes_block), $samples$$ = Math.floor($size$$ / this.bytes_per_sample);
  this.dma.do_write(this.dma_syncbuffer, 0, $size$$, this.dma_channel, $error$$ => {
    dbg_log("dma block transfer " + ($error$$ ? "unsuccessful" : "successful"), LOG_SB16);
    $error$$ || (this.dma_to_dac($samples$$), this.dma_bytes_left -= $size$$, this.dma_bytes_left || (this.raise_irq(this.dma_irq), this.dma_autoinit && (this.dma_bytes_left = this.dma_bytes_count)));
  });
};
SB16.prototype.dma_to_dac = function($sample_count$$) {
  var $amplitude$$ = this.dsp_16bit ? 32767.5 : 127.5, $offset$$ = this.dsp_signed ? 0 : -1, $repeats$$ = this.dsp_stereo ? 1 : 2;
  var $buffer$$ = this.dsp_16bit ? this.dsp_signed ? this.dma_buffer_int16 : this.dma_buffer_uint16 : this.dsp_signed ? this.dma_buffer_int8 : this.dma_buffer_uint8;
  for (var $channel$$ = 0, $i$$ = 0; $i$$ < $sample_count$$; $i$$++) {
    for (var $sample$$ = audio_normalize($buffer$$[$i$$], $amplitude$$, $offset$$), $j$$ = 0; $j$$ < $repeats$$; $j$$++) {
      this.dac_buffers[$channel$$].push($sample$$), $channel$$ ^= 1;
    }
  }
  this.dac_send();
};
SB16.prototype.dac_handle_request = function() {
  !this.dma_bytes_left || this.dma_paused ? this.dac_send() : this.dma_transfer_next();
};
SB16.prototype.dac_send = function() {
  if (this.dac_buffers[0].length) {
    var $out0$$ = this.dac_buffers[0].shift_block(this.dac_buffers[0].length), $out1$$ = this.dac_buffers[1].shift_block(this.dac_buffers[1].length);
    this.bus.send("dac-send-data", [$out0$$, $out1$$], [$out0$$.buffer, $out1$$.buffer]);
  }
};
SB16.prototype.raise_irq = function($type$$) {
  dbg_log("raise irq", LOG_SB16);
  this.irq_triggered[$type$$] = 1;
  this.cpu.device_raise_irq(this.irq);
};
SB16.prototype.lower_irq = function($type$$) {
  dbg_log("lower irq", LOG_SB16);
  this.irq_triggered[$type$$] = 0;
  this.cpu.device_lower_irq(this.irq);
};
function audio_normalize($value$$, $amplitude$$, $offset$$) {
  return audio_clip($value$$ / $amplitude$$ + $offset$$, -1, 1);
}
function audio_clip($value$$, $low$$, $high$$) {
  return ($value$$ < $low$$) * $low$$ + ($value$$ > $high$$) * $high$$ + ($low$$ <= $value$$ && $value$$ <= $high$$) * $value$$;
}
;const VIRTIO_PCI_VENDOR_ID = 6900, VIRTIO_PCI_CAP_VENDOR = 9, VIRTIO_PCI_CAP_LENGTH = 16, VIRTIO_PCI_CAP_COMMON_CFG = 1, VIRTIO_PCI_CAP_NOTIFY_CFG = 2, VIRTIO_PCI_CAP_ISR_CFG = 3, VIRTIO_PCI_CAP_DEVICE_CFG = 4, VIRTIO_PCI_CAP_PCI_CFG = 5, VIRTIO_STATUS_ACKNOWLEDGE = 1, VIRTIO_STATUS_DRIVER = 2, VIRTIO_STATUS_DRIVER_OK = 4, VIRTIO_STATUS_FEATURES_OK = 8, VIRTIO_STATUS_DEVICE_NEEDS_RESET = 64, VIRTIO_STATUS_FAILED = 128, VIRTIO_ISR_QUEUE = 1, VIRTIO_ISR_DEVICE_CFG = 2, VIRTIO_F_RING_INDIRECT_DESC = 
28, VIRTIO_F_RING_EVENT_IDX = 29, VIRTIO_F_VERSION_1 = 32, VIRTQ_DESC_ENTRYSIZE = 16, VIRTQ_AVAIL_BASESIZE = 6, VIRTQ_AVAIL_ENTRYSIZE = 2, VIRTQ_USED_BASESIZE = 6, VIRTQ_USED_ENTRYSIZE = 8, VIRTQ_IDX_MASK = 65535, VIRTQ_DESC_F_NEXT = 1, VIRTQ_DESC_F_WRITE = 2, VIRTQ_DESC_F_INDIRECT = 4, VIRTQ_AVAIL_F_NO_INTERRUPT = 1, VIRTQ_USED_F_NO_NOTIFY = 1;
var VirtIO_CapabilityStruct, VirtIO_CapabilityInfo, VirtQueue_Options, VirtIO_CommonCapabilityOptions, VirtIO_NotificationCapabilityOptions, VirtIO_ISRCapabilityOptions, VirtIO_DeviceSpecificCapabilityOptions, VirtIO_Options;
function VirtIO($cpu$$, $options$$) {
  this.cpu = $cpu$$;
  this.pci = $cpu$$.devices.pci;
  this.device_id = $options$$.device_id;
  this.pci_space = [VIRTIO_PCI_VENDOR_ID & 255, VIRTIO_PCI_VENDOR_ID >> 8, $options$$.device_id & 255, $options$$.device_id >> 8, 7, 5, 16, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 168, 0, 0, 0, 16, 191, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, VIRTIO_PCI_VENDOR_ID & 255, VIRTIO_PCI_VENDOR_ID >> 8, $options$$.subsystem_device_id & 255, $options$$.subsystem_device_id >> 8, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, ];
  this.pci_space = this.pci_space.concat(v86util.zeros(256 - this.pci_space.length));
  this.pci_id = $options$$.pci_id;
  this.pci_bars = [];
  this.name = $options$$.name;
  this.driver_feature_select = this.device_feature_select = 0;
  this.device_feature = new Uint32Array(4);
  this.driver_feature = new Uint32Array(4);
  for (var $f$$ of $options$$.common.features) {
    dbg_assert(0 <= $f$$, "VirtIO device<" + this.name + "> feature bit numbers must be non-negative"), dbg_assert(128 > $f$$, "VirtIO device<" + this.name + "> feature bit numbers assumed less than 128 in implementation"), this.device_feature[$f$$ >>> 5] |= 1 << ($f$$ & 31), this.driver_feature[$f$$ >>> 5] |= 1 << ($f$$ & 31);
  }
  dbg_assert($options$$.common.features.includes(VIRTIO_F_VERSION_1), "VirtIO device<" + this.name + "> only non-transitional devices are supported");
  this.features_ok = !0;
  this.device_status = 0;
  this.config_has_changed = !1;
  this.config_generation = 0;
  this.queues = [];
  for (var $effective_offset_queue_options$$ of $options$$.common.queues) {
    this.queues.push(new VirtQueue($cpu$$, this, $effective_offset_queue_options$$));
  }
  this.queue_select = 0;
  this.queue_selected = this.queues[0];
  this.isr_status = 0;
  if (DEBUG) {
    $f$$ = new Set;
    for ($capabilities_offset$$ of this.queues.map($q$$ => $q$$.notify_offset)) {
      $effective_offset_queue_options$$ = $options$$.notification.single_handler ? 0 : $capabilities_offset$$, $f$$.add($effective_offset_queue_options$$), dbg_assert($options$$.notification.handlers[$effective_offset_queue_options$$], "VirtIO device<" + this.name + "> every queue's notifier must exist");
    }
    for (const [$index$$, $handler$$] of $options$$.notification.handlers.entries()) {
      dbg_assert(!$handler$$ || $f$$.has($index$$), "VirtIO device<" + this.name + "> no defined notify handler should be unused");
    }
  }
  var $capabilities_offset$$ = [];
  $capabilities_offset$$.push(this.create_common_capability($options$$.common));
  $capabilities_offset$$.push(this.create_notification_capability($options$$.notification));
  $capabilities_offset$$.push(this.create_isr_capability($options$$.isr_status));
  $options$$.device_specific && $capabilities_offset$$.push(this.create_device_specific_capability($options$$.device_specific));
  this.init_capabilities($capabilities_offset$$);
  $cpu$$.devices.pci.register_device(this);
  this.reset();
}
VirtIO.prototype.create_common_capability = function($options$$) {
  return {type:VIRTIO_PCI_CAP_COMMON_CFG, bar:0, port:$options$$.initial_port, use_mmio:!1, offset:0, extra:new Uint8Array(0), struct:[{bytes:4, name:"device_feature_select", read:() => this.device_feature_select, write:$data$$ => {
    this.device_feature_select = $data$$;
  }, }, {bytes:4, name:"device_feature", read:() => this.device_feature[this.device_feature_select] || 0, write:$data$$ => {
  }, }, {bytes:4, name:"driver_feature_select", read:() => this.driver_feature_select, write:$data$$ => {
    this.driver_feature_select = $data$$;
  }, }, {bytes:4, name:"driver_feature", read:() => this.driver_feature[this.driver_feature_select] || 0, write:$data$$ => {
    const $supported_feature$$ = this.device_feature[this.driver_feature_select];
    this.driver_feature_select < this.driver_feature.length && (this.driver_feature[this.driver_feature_select] = $data$$ & $supported_feature$$);
    this.features_ok = this.features_ok && !($data$$ & ~$supported_feature$$);
  }, }, {bytes:2, name:"msix_config", read:() => {
    dbg_log("No msi-x capability supported.", LOG_VIRTIO);
    return 65535;
  }, write:$data$$ => {
    dbg_log("No msi-x capability supported.", LOG_VIRTIO);
  }, }, {bytes:2, name:"num_queues", read:() => this.queues.length, write:$data$$ => {
  }, }, {bytes:1, name:"device_status", read:() => this.device_status, write:$data$$ => {
    0 === $data$$ ? (dbg_log("Reset device<" + this.name + ">", LOG_VIRTIO), this.reset()) : $data$$ & VIRTIO_STATUS_FAILED ? dbg_log("Warning: Device<" + this.name + "> status failed", LOG_VIRTIO) : dbg_log("Device<" + this.name + "> status: " + ($data$$ & VIRTIO_STATUS_ACKNOWLEDGE ? "ACKNOWLEDGE " : "") + ($data$$ & VIRTIO_STATUS_DRIVER ? "DRIVER " : "") + ($data$$ & VIRTIO_STATUS_DRIVER_OK ? "DRIVER_OK" : "") + ($data$$ & VIRTIO_STATUS_FEATURES_OK ? "FEATURES_OK " : "") + ($data$$ & VIRTIO_STATUS_DEVICE_NEEDS_RESET ? 
    "DEVICE_NEEDS_RESET" : ""), LOG_VIRTIO);
    $data$$ & ~this.device_status & VIRTIO_STATUS_DRIVER_OK && this.device_status & VIRTIO_STATUS_DEVICE_NEEDS_RESET && this.notify_config_changes();
    this.features_ok || (DEBUG && $data$$ & VIRTIO_STATUS_FEATURES_OK && dbg_log("Removing FEATURES_OK", LOG_VIRTIO), $data$$ &= ~VIRTIO_STATUS_FEATURES_OK);
    this.device_status = $data$$;
    if ($data$$ & ~this.device_status & VIRTIO_STATUS_DRIVER_OK) {
      $options$$.on_driver_ok();
    }
  }, }, {bytes:1, name:"config_generation", read:() => this.config_generation, write:$data$$ => {
  }, }, {bytes:2, name:"queue_select", read:() => this.queue_select, write:$data$$ => {
    this.queue_select = $data$$;
    this.queue_select < this.queues.length ? this.queues_selected = this.queues[this.queue_select] : this.queue_selected = null;
  }, }, {bytes:2, name:"queue_size", read:() => this.queue_selected ? this.queue_selected.size : 0, write:$data$$ => {
    this.queue_selected && ($data$$ & $data$$ - 1 && (dbg_log("Warning: dev<" + this.name + "> Given queue size was not a power of 2. Rounding up to next power of 2.", LOG_VIRTIO), $data$$ = 1 << v86util.int_log2($data$$ - 1) + 1), $data$$ > this.queue_selected.size_supported && (dbg_log("Warning: dev<" + this.name + "> Trying to set queue size greater than supported. Clamping to supported size.", LOG_VIRTIO), $data$$ = this.queue_selected.size_supported), this.queue_selected.set_size($data$$));
  }, }, {bytes:2, name:"queue_msix_vector", read:() => {
    dbg_log("No msi-x capability supported.", LOG_VIRTIO);
    return 65535;
  }, write:$data$$ => {
    dbg_log("No msi-x capability supported.", LOG_VIRTIO);
  }, }, {bytes:2, name:"queue_enable", read:() => this.queue_selected ? this.queue_selected.enabled | 0 : 0, write:$data$$ => {
    this.queue_selected && (1 === $data$$ ? this.queue_selected.is_configured() ? this.queue_selected.enable() : dbg_log("Driver bug: tried enabling unconfigured queue", LOG_VIRTIO) : 0 === $data$$ && dbg_log("Driver bug: tried writing 0 to queue_enable", LOG_VIRTIO));
  }, }, {bytes:2, name:"queue_notify_off", read:() => this.queue_selected ? this.queue_selected.notify_offset : 0, write:$data$$ => {
  }, }, {bytes:4, name:"queue_desc (low dword)", read:() => this.queue_selected ? this.queue_selected.desc_addr : 0, write:$data$$ => {
    this.queue_selected && (this.queue_selected.desc_addr = $data$$);
  }, }, {bytes:4, name:"queue_desc (high dword)", read:() => 0, write:$data$$ => {
    dbg_log("Warning: High dword of 64 bit queue_desc ignored", LOG_VIRTIO);
  }, }, {bytes:4, name:"queue_avail (low dword)", read:() => this.queue_selected ? this.queue_selected.avail_addr : 0, write:$data$$ => {
    this.queue_selected && (this.queue_selected.avail_addr = $data$$);
  }, }, {bytes:4, name:"queue_avail (high dword)", read:() => 0, write:$data$$ => {
    dbg_log("Warning: High dword of 64 bit queue_avail ignored", LOG_VIRTIO);
  }, }, {bytes:4, name:"queue_used (low dword)", read:() => this.queue_selected ? this.queue_selected.used_addr : 0, write:$data$$ => {
    this.queue_selected && (this.queue_selected.used_addr = $data$$);
  }, }, {bytes:4, name:"queue_used (high dword)", read:() => 0, write:$data$$ => {
    dbg_log("Warning: High dword of 64 bit queue_used ignored", LOG_VIRTIO);
  }, }, ], };
};
VirtIO.prototype.create_notification_capability = function($options$$) {
  const $notify_struct$$ = [];
  let $notify_off_multiplier$$;
  $options$$.single_handler ? (dbg_assert(1 === $options$$.handlers.length, "VirtIO device<" + this.name + "> too many notify handlers specified: expected single handler"), $notify_off_multiplier$$ = 0) : $notify_off_multiplier$$ = 2;
  for (const [$i$$, $handler$$] of $options$$.handlers.entries()) {
    $notify_struct$$.push({bytes:2, name:"notify" + $i$$, read:() => 65535, write:$handler$$ || ($data$$ => {
    }), });
  }
  return {type:VIRTIO_PCI_CAP_NOTIFY_CFG, bar:1, port:$options$$.initial_port, use_mmio:!1, offset:0, extra:new Uint8Array([$notify_off_multiplier$$ & 255, $notify_off_multiplier$$ >> 8 & 255, $notify_off_multiplier$$ >> 16 & 255, $notify_off_multiplier$$ >> 24, ]), struct:$notify_struct$$, };
};
VirtIO.prototype.create_isr_capability = function($options$$) {
  return {type:VIRTIO_PCI_CAP_ISR_CFG, bar:2, port:$options$$.initial_port, use_mmio:!1, offset:0, extra:new Uint8Array(0), struct:[{bytes:1, name:"isr_status", read:() => {
    const $isr_status$$ = this.isr_status;
    this.lower_irq();
    return $isr_status$$;
  }, write:$data$$ => {
  }, }, ], };
};
VirtIO.prototype.create_device_specific_capability = function($options$$) {
  dbg_assert(~$options$$.offset & 3, "VirtIO device<" + this.name + "> device specific cap offset must be 4-byte aligned");
  return {type:VIRTIO_PCI_CAP_DEVICE_CFG, bar:3, port:$options$$.initial_port, use_mmio:!1, offset:0, extra:new Uint8Array(0), struct:$options$$.struct, };
};
VirtIO.prototype.init_capabilities = function($cap_len$jscomp$1_capabilities$$) {
  let $cap_next$$ = this.pci_space[52] = 64;
  var $bar_offset_cap_len_cap_ptr_port$$ = $cap_next$$;
  for (const $cap$$ of $cap_len$jscomp$1_capabilities$$) {
    $cap_len$jscomp$1_capabilities$$ = VIRTIO_PCI_CAP_LENGTH + $cap$$.extra.length;
    $bar_offset_cap_len_cap_ptr_port$$ = $cap_next$$;
    $cap_next$$ = $bar_offset_cap_len_cap_ptr_port$$ + $cap_len$jscomp$1_capabilities$$;
    dbg_assert(256 >= $cap_next$$, "VirtIO device<" + this.name + "> can't fit all capabilities into 256byte configspace");
    dbg_assert(0 <= $cap$$.bar && 6 > $cap$$.bar, "VirtIO device<" + this.name + "> capability invalid bar number");
    var $bar_size_shim_read8_on_16$$ = $cap$$.struct.reduce(($bytes$$, $field$$) => $bytes$$ + $field$$.bytes, 0);
    $bar_size_shim_read8_on_16$$ += $cap$$.offset;
    $bar_size_shim_read8_on_16$$ = 16 > $bar_size_shim_read8_on_16$$ ? 16 : 1 << v86util.int_log2($bar_size_shim_read8_on_16$$ - 1) + 1;
    dbg_assert(0 === ($cap$$.port & $bar_size_shim_read8_on_16$$ - 1), "VirtIO device<" + this.name + "> capability port should be aligned to pci bar size");
    this.pci_bars[$cap$$.bar] = {size:$bar_size_shim_read8_on_16$$, };
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$] = VIRTIO_PCI_CAP_VENDOR;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 1] = $cap_next$$;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 2] = $cap_len$jscomp$1_capabilities$$;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 3] = $cap$$.type;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 4] = $cap$$.bar;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 5] = 0;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 6] = 0;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 7] = 0;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 8] = $cap$$.offset & 255;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 9] = $cap$$.offset >>> 8 & 255;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 10] = $cap$$.offset >>> 16 & 255;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 11] = $cap$$.offset >>> 24;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 12] = $bar_size_shim_read8_on_16$$ & 255;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 13] = $bar_size_shim_read8_on_16$$ >>> 8 & 255;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 14] = $bar_size_shim_read8_on_16$$ >>> 16 & 255;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 15] = $bar_size_shim_read8_on_16$$ >>> 24;
    for (const [$i$$, $extra_byte$$] of $cap$$.extra.entries()) {
      this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 16 + $i$$] = $extra_byte$$;
    }
    $bar_offset_cap_len_cap_ptr_port$$ = 16 + 4 * $cap$$.bar;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$] = $cap$$.port & 254 | !$cap$$.use_mmio;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 1] = $cap$$.port >>> 8 & 255;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 2] = $cap$$.port >>> 16 & 255;
    this.pci_space[$bar_offset_cap_len_cap_ptr_port$$ + 3] = $cap$$.port >>> 24 & 255;
    $bar_offset_cap_len_cap_ptr_port$$ = $cap$$.port + $cap$$.offset;
    for (const $field$$ of $cap$$.struct) {
      let $read$$ = $field$$.read;
      $cap_len$jscomp$1_capabilities$$ = $field$$.write;
      DEBUG && ($read$$ = () => {
        const $val$$ = $field$$.read();
        dbg_log("Device<" + this.name + "> cap[" + $cap$$.type + "] read[" + $field$$.name + "] => " + h($val$$, 8 * $field$$.bytes), LOG_VIRTIO);
        return $val$$;
      }, $cap_len$jscomp$1_capabilities$$ = $data$$ => {
        dbg_log("Device<" + this.name + "> cap[" + $cap$$.type + "] write[" + $field$$.name + "] <= " + h($data$$, 8 * $field$$.bytes), LOG_VIRTIO);
        $field$$.write($data$$);
      });
      if ($cap$$.use_mmio) {
        dbg_assert(!1, "VirtIO device <" + this.name + "> mmio capability not implemented.");
      } else {
        $bar_size_shim_read8_on_16$$ = function($addr$$) {
          dbg_log("Warning: 8-bit read from 16-bit virtio port", LOG_VIRTIO);
          return $read$$($addr$$ & -2) >> (($addr$$ & 1) << 3) & 255;
        };
        const $shim_read8_on_32$$ = function($addr$$) {
          dbg_log("Warning: 8-bit read from 32-bit virtio port", LOG_VIRTIO);
          return $read$$($addr$$ & -4) >> (($addr$$ & 3) << 3) & 255;
        };
        switch($field$$.bytes) {
          case 4:
            this.cpu.io.register_read($bar_offset_cap_len_cap_ptr_port$$, this, $shim_read8_on_32$$, void 0, $read$$);
            this.cpu.io.register_write($bar_offset_cap_len_cap_ptr_port$$, this, void 0, void 0, $cap_len$jscomp$1_capabilities$$);
            break;
          case 2:
            this.cpu.io.register_read($bar_offset_cap_len_cap_ptr_port$$, this, $bar_size_shim_read8_on_16$$, $read$$);
            this.cpu.io.register_write($bar_offset_cap_len_cap_ptr_port$$, this, void 0, $cap_len$jscomp$1_capabilities$$);
            break;
          case 1:
            this.cpu.io.register_read($bar_offset_cap_len_cap_ptr_port$$, this, $read$$);
            this.cpu.io.register_write($bar_offset_cap_len_cap_ptr_port$$, this, $cap_len$jscomp$1_capabilities$$);
            break;
          default:
            dbg_assert(!1, "VirtIO device <" + this.name + "> invalid capability field width of " + $field$$.bytes + " bytes");
        }
      }
      $bar_offset_cap_len_cap_ptr_port$$ += $field$$.bytes;
    }
  }
  $bar_offset_cap_len_cap_ptr_port$$ = VIRTIO_PCI_CAP_LENGTH + 4;
  dbg_assert(256 >= $cap_next$$ + $bar_offset_cap_len_cap_ptr_port$$, "VirtIO device<" + this.name + "> can't fit all capabilities into 256byte configspace");
  this.pci_space[$cap_next$$] = VIRTIO_PCI_CAP_VENDOR;
  this.pci_space[$cap_next$$ + 1] = 0;
  this.pci_space[$cap_next$$ + 2] = $bar_offset_cap_len_cap_ptr_port$$;
  this.pci_space[$cap_next$$ + 3] = VIRTIO_PCI_CAP_PCI_CFG;
  this.pci_space[$cap_next$$ + 4] = 0;
  this.pci_space[$cap_next$$ + 5] = 0;
  this.pci_space[$cap_next$$ + 6] = 0;
  this.pci_space[$cap_next$$ + 7] = 0;
  this.pci_space[$cap_next$$ + 8] = 0;
  this.pci_space[$cap_next$$ + 9] = 0;
  this.pci_space[$cap_next$$ + 10] = 0;
  this.pci_space[$cap_next$$ + 11] = 0;
  this.pci_space[$cap_next$$ + 12] = 0;
  this.pci_space[$cap_next$$ + 13] = 0;
  this.pci_space[$cap_next$$ + 14] = 0;
  this.pci_space[$cap_next$$ + 15] = 0;
  this.pci_space[$cap_next$$ + 16] = 0;
  this.pci_space[$cap_next$$ + 17] = 0;
  this.pci_space[$cap_next$$ + 18] = 0;
  this.pci_space[$cap_next$$ + 19] = 0;
};
VirtIO.prototype.get_state = function() {
  let $state$$ = [];
  $state$$[0] = this.device_feature_select;
  $state$$[1] = this.driver_feature_select;
  $state$$[2] = this.device_feature;
  $state$$[3] = this.driver_feature;
  $state$$[4] = this.features_ok;
  $state$$[5] = this.device_status;
  $state$$[6] = this.config_has_changed;
  $state$$[7] = this.config_generation;
  $state$$[8] = this.isr_status;
  $state$$[9] = this.queue_select;
  return $state$$ = $state$$.concat(this.queues);
};
VirtIO.prototype.set_state = function($state$$) {
  this.device_feature_select = $state$$[0];
  this.driver_feature_select = $state$$[1];
  this.device_feature = $state$$[2];
  this.driver_feature = $state$$[3];
  this.features_ok = $state$$[4];
  this.device_status = $state$$[5];
  this.config_has_changed = $state$$[6];
  this.config_generation = $state$$[7];
  this.isr_status = $state$$[8];
  this.queue_select = $state$$[9];
  let $i$$ = 0;
  for (let $queue$$ of $state$$.slice(10)) {
    this.queues[$i$$].set_state($queue$$), $i$$++;
  }
  this.queue_selected = this.queues[this.queue_select] || null;
};
VirtIO.prototype.reset = function() {
  this.driver_feature_select = this.device_feature_select = 0;
  this.driver_feature.set(this.device_feature);
  this.features_ok = !0;
  this.queue_select = this.device_status = 0;
  this.queue_selected = this.queues[0];
  for (const $queue$$ of this.queues) {
    $queue$$.reset();
  }
  this.config_has_changed = !1;
  this.config_generation = 0;
  this.lower_irq();
};
VirtIO.prototype.notify_config_changes = function() {
  this.config_has_changed = !0;
  this.device_status & VIRTIO_STATUS_DRIVER_OK ? this.raise_irq(VIRTIO_ISR_DEVICE_CFG) : dbg_assert(!1, "VirtIO device<" + this.name + "> attempted to notify driver before DRIVER_OK");
};
VirtIO.prototype.update_config_generation = function() {
  this.config_has_changed && (this.config_generation++, this.config_generation &= 255, this.config_has_changed = !1);
};
VirtIO.prototype.is_feature_negotiated = function($feature$$) {
  return 0 < (this.driver_feature[$feature$$ >>> 5] & 1 << ($feature$$ & 31));
};
VirtIO.prototype.needs_reset = function() {
  dbg_log("Device<" + this.name + "> experienced error - requires reset", LOG_VIRTIO);
  this.device_status |= VIRTIO_STATUS_DEVICE_NEEDS_RESET;
  this.device_status & VIRTIO_STATUS_DRIVER_OK && this.notify_config_changes();
};
VirtIO.prototype.raise_irq = function($type$$) {
  dbg_log("Raise irq " + h($type$$), LOG_VIRTIO);
  this.isr_status |= $type$$;
  this.pci.raise_irq(this.pci_id);
};
VirtIO.prototype.lower_irq = function() {
  dbg_log("Lower irq ", LOG_VIRTIO);
  this.isr_status = 0;
  this.pci.lower_irq(this.pci_id);
};
function VirtQueue($cpu$$, $virtio$$, $options$$) {
  this.cpu = $cpu$$;
  this.virtio = $virtio$$;
  this.size_supported = this.size = $options$$.size_supported;
  this.mask = this.size - 1;
  this.enabled = !1;
  this.notify_offset = $options$$.notify_offset;
  this.num_staged_replies = this.used_addr = this.avail_last_idx = this.avail_addr = this.desc_addr = 0;
  this.reset();
}
VirtQueue.prototype.get_state = function() {
  const $state$$ = [];
  $state$$[0] = this.size;
  $state$$[1] = this.size_supported;
  $state$$[2] = this.enabled;
  $state$$[3] = this.notify_offset;
  $state$$[4] = this.desc_addr;
  $state$$[5] = this.avail_addr;
  $state$$[6] = this.avail_last_idx;
  $state$$[7] = this.used_addr;
  $state$$[8] = this.num_staged_replies;
  return $state$$;
};
VirtQueue.prototype.set_state = function($state$$) {
  this.size = $state$$[0];
  this.size_supported = $state$$[1];
  this.enabled = $state$$[2];
  this.notify_offset = $state$$[3];
  this.desc_addr = $state$$[4];
  this.avail_addr = $state$$[5];
  this.avail_last_idx = $state$$[6];
  this.used_addr = $state$$[7];
  this.num_staged_replies = $state$$[8];
  this.mask = this.size - 1;
};
VirtQueue.prototype.reset = function() {
  this.enabled = !1;
  this.num_staged_replies = this.used_addr = this.avail_last_idx = this.avail_addr = this.desc_addr = 0;
  this.set_size(this.size_supported);
};
VirtQueue.prototype.is_configured = function() {
  return this.desc_addr && this.avail_addr && this.used_addr;
};
VirtQueue.prototype.enable = function() {
  dbg_assert(this.is_configured(), "VirtQueue must be configured before enabled");
  this.enabled = !0;
};
VirtQueue.prototype.set_size = function($size$$) {
  dbg_assert(0 === ($size$$ & $size$$ - 1), "VirtQueue size must be power of 2 or zero");
  dbg_assert($size$$ <= this.size_supported, "VirtQueue size must be within supported size");
  this.size = $size$$;
  this.mask = $size$$ - 1;
};
VirtQueue.prototype.count_requests = function() {
  dbg_assert(this.avail_addr, "VirtQueue addresses must be configured before use");
  return this.avail_get_idx() - this.avail_last_idx & this.mask;
};
VirtQueue.prototype.has_request = function() {
  dbg_assert(this.avail_addr, "VirtQueue addresses must be configured before use");
  return (this.avail_get_idx() & this.mask) !== this.avail_last_idx;
};
VirtQueue.prototype.pop_request = function() {
  dbg_assert(this.avail_addr, "VirtQueue addresses must be configured before use");
  dbg_assert(this.has_request(), "VirtQueue must not pop nonexistent request");
  var $bufchain$$ = this.avail_get_entry(this.avail_last_idx);
  dbg_log("Pop request: avail_last_idx=" + this.avail_last_idx + " desc_idx=" + $bufchain$$, LOG_VIRTIO);
  $bufchain$$ = new VirtQueueBufferChain(this, $bufchain$$);
  this.avail_last_idx = this.avail_last_idx + 1 & this.mask;
  return $bufchain$$;
};
VirtQueue.prototype.push_reply = function($bufchain$$) {
  dbg_assert(this.used_addr, "VirtQueue addresses must be configured before use");
  dbg_assert(this.num_staged_replies < this.size, "VirtQueue replies must not exceed queue size");
  const $used_idx$$ = this.used_get_idx() + this.num_staged_replies & this.mask;
  dbg_log("Push reply: used_idx=" + $used_idx$$ + " desc_idx=" + $bufchain$$.head_idx, LOG_VIRTIO);
  this.used_set_entry($used_idx$$, $bufchain$$.head_idx, $bufchain$$.length_written);
  this.num_staged_replies++;
};
VirtQueue.prototype.flush_replies = function() {
  dbg_assert(this.used_addr, "VirtQueue addresses must be configured before use");
  if (0 === this.num_staged_replies) {
    dbg_log("flush_replies: Nothing to flush", LOG_VIRTIO);
  } else {
    dbg_log("Flushing " + this.num_staged_replies + " replies", LOG_VIRTIO);
    var $new_idx$$ = this.used_get_idx() + this.num_staged_replies & VIRTQ_IDX_MASK;
    this.used_set_idx($new_idx$$);
    this.num_staged_replies = 0;
    this.virtio.is_feature_negotiated(VIRTIO_F_RING_EVENT_IDX) ? (this.avail_get_used_event(), this.virtio.raise_irq(VIRTIO_ISR_QUEUE)) : ~this.avail_get_flags() & VIRTQ_AVAIL_F_NO_INTERRUPT && this.virtio.raise_irq(VIRTIO_ISR_QUEUE);
  }
};
VirtQueue.prototype.notify_me_after = function($avail_event_num_skipped_requests$$) {
  dbg_assert(0 <= $avail_event_num_skipped_requests$$, "Must skip a non-negative number of requests");
  $avail_event_num_skipped_requests$$ = this.avail_get_idx() + $avail_event_num_skipped_requests$$ & 65535;
  this.used_set_avail_event($avail_event_num_skipped_requests$$);
};
VirtQueue.prototype.get_descriptor = function($table_address$$, $i$$) {
  return {addr_low:this.cpu.read32s($table_address$$ + $i$$ * VIRTQ_DESC_ENTRYSIZE), addr_high:this.cpu.read32s($table_address$$ + $i$$ * VIRTQ_DESC_ENTRYSIZE + 4), len:this.cpu.read32s($table_address$$ + $i$$ * VIRTQ_DESC_ENTRYSIZE + 8), flags:this.cpu.read16($table_address$$ + $i$$ * VIRTQ_DESC_ENTRYSIZE + 12), next:this.cpu.read16($table_address$$ + $i$$ * VIRTQ_DESC_ENTRYSIZE + 14), };
};
VirtQueue.prototype.avail_get_flags = function() {
  return this.cpu.read16(this.avail_addr);
};
VirtQueue.prototype.avail_get_idx = function() {
  return this.cpu.read16(this.avail_addr + 2);
};
VirtQueue.prototype.avail_get_entry = function($i$$) {
  return this.cpu.read16(this.avail_addr + 4 + VIRTQ_AVAIL_ENTRYSIZE * $i$$);
};
VirtQueue.prototype.avail_get_used_event = function() {
  return this.cpu.read16(this.avail_addr + 4 + VIRTQ_AVAIL_ENTRYSIZE * this.size);
};
VirtQueue.prototype.used_get_flags = function() {
  return this.cpu.read16(this.used_addr);
};
VirtQueue.prototype.used_set_flags = function($value$$) {
  this.cpu.write16(this.used_addr, $value$$);
};
VirtQueue.prototype.used_get_idx = function() {
  return this.cpu.read16(this.used_addr + 2);
};
VirtQueue.prototype.used_set_idx = function($value$$) {
  this.cpu.write16(this.used_addr + 2, $value$$);
};
VirtQueue.prototype.used_set_entry = function($i$$, $desc_idx$$, $length_written$$) {
  this.cpu.write32(this.used_addr + 4 + VIRTQ_USED_ENTRYSIZE * $i$$, $desc_idx$$);
  this.cpu.write32(this.used_addr + 8 + VIRTQ_USED_ENTRYSIZE * $i$$, $length_written$$);
};
VirtQueue.prototype.used_set_avail_event = function($value$$) {
  this.cpu.write16(this.used_addr + 4 + VIRTQ_USED_ENTRYSIZE * this.size, $value$$);
};
function VirtQueueBufferChain($virtqueue$$, $desc_idx$$) {
  this.cpu = $virtqueue$$.cpu;
  this.virtio = $virtqueue$$.virtio;
  this.head_idx = $desc_idx$$;
  this.read_buffers = [];
  this.length_readable = this.read_buffer_offset = this.read_buffer_idx = 0;
  this.write_buffers = [];
  this.length_writable = this.length_written = this.write_buffer_offset = this.write_buffer_idx = 0;
  let $table_address$$ = $virtqueue$$.desc_addr, $chain_length$$ = 0, $chain_max$$ = $virtqueue$$.size, $writable_region$$ = !1;
  const $has_indirect_feature$$ = this.virtio.is_feature_negotiated(VIRTIO_F_RING_INDIRECT_DESC);
  dbg_log("<<< Descriptor chain start", LOG_VIRTIO);
  do {
    const $desc$$ = $virtqueue$$.get_descriptor($table_address$$, $desc_idx$$);
    dbg_log("descriptor: idx=" + $desc_idx$$ + " addr=" + h($desc$$.addr_high, 8) + ":" + h($desc$$.addr_low, 8) + " len=" + h($desc$$.len, 8) + " flags=" + h($desc$$.flags, 4) + " next=" + h($desc$$.next, 4), LOG_VIRTIO);
    if ($has_indirect_feature$$ && $desc$$.flags & VIRTQ_DESC_F_INDIRECT) {
      DEBUG && $desc$$.flags & VIRTQ_DESC_F_NEXT && dbg_log("Driver bug: has set VIRTQ_DESC_F_NEXT flag in an indirect table descriptor", LOG_VIRTIO), $table_address$$ = $desc$$.addr_low, $chain_length$$ = $desc_idx$$ = 0, $chain_max$$ = $desc$$.len / VIRTQ_DESC_ENTRYSIZE, dbg_log("start indirect", LOG_VIRTIO);
    } else {
      if ($desc$$.flags & VIRTQ_DESC_F_WRITE) {
        $writable_region$$ = !0, this.write_buffers.push($desc$$), this.length_writable += $desc$$.len;
      } else {
        if ($writable_region$$) {
          dbg_log("Driver bug: readonly buffer after writeonly buffer within chain", LOG_VIRTIO);
          break;
        }
        this.read_buffers.push($desc$$);
        this.length_readable += $desc$$.len;
      }
      $chain_length$$++;
      if ($chain_length$$ > $chain_max$$) {
        dbg_log("Driver bug: descriptor chain cycle detected", LOG_VIRTIO);
        break;
      }
      if ($desc$$.flags & VIRTQ_DESC_F_NEXT) {
        $desc_idx$$ = $desc$$.next;
      } else {
        break;
      }
    }
  } while (1);
  dbg_log("Descriptor chain end >>>", LOG_VIRTIO);
}
VirtQueueBufferChain.prototype.get_next_blob = function($dest_buffer$$) {
  let $dest_offset$$ = 0, $remaining$$ = $dest_buffer$$.length;
  for (; $remaining$$;) {
    if (this.read_buffer_idx === this.read_buffers.length) {
      dbg_log("Device<" + this.virtio.name + "> Read more than device-readable buffers has", LOG_VIRTIO);
      break;
    }
    var $buf$$ = this.read_buffers[this.read_buffer_idx];
    const $read_address$$ = $buf$$.addr_low + this.read_buffer_offset;
    $buf$$ = $buf$$.len - this.read_buffer_offset;
    $buf$$ > $remaining$$ ? ($buf$$ = $remaining$$, this.read_buffer_offset += $remaining$$) : (this.read_buffer_idx++, this.read_buffer_offset = 0);
    $dest_buffer$$.set(this.cpu.read_blob($read_address$$, $buf$$), $dest_offset$$);
    $dest_offset$$ += $buf$$;
    $remaining$$ -= $buf$$;
  }
  return $dest_offset$$;
};
VirtQueueBufferChain.prototype.set_next_blob = function($src_buffer$$) {
  let $src_offset$$ = 0, $remaining$$ = $src_buffer$$.length;
  for (; $remaining$$;) {
    if (this.write_buffer_idx === this.write_buffers.length) {
      dbg_log("Device<" + this.virtio.name + "> Write more than device-writable capacity", LOG_VIRTIO);
      break;
    }
    var $buf$$ = this.write_buffers[this.write_buffer_idx];
    const $write_address$$ = $buf$$.addr_low + this.write_buffer_offset;
    $buf$$ = $buf$$.len - this.write_buffer_offset;
    $buf$$ > $remaining$$ ? ($buf$$ = $remaining$$, this.write_buffer_offset += $remaining$$) : (this.write_buffer_idx++, this.write_buffer_offset = 0);
    this.cpu.write_blob($src_buffer$$.subarray($src_offset$$, $src_offset$$ + $buf$$), $write_address$$);
    $src_offset$$ += $buf$$;
    $remaining$$ -= $buf$$;
  }
  this.length_written += $src_offset$$;
  return $src_offset$$;
};
var Bus = {};
function BusConnector() {
  this.listeners = {};
  this.pair = void 0;
}
BusConnector.prototype.register = function($name$$, $fn$$, $this_value$$) {
  var $listeners$$ = this.listeners[$name$$];
  void 0 === $listeners$$ && ($listeners$$ = this.listeners[$name$$] = []);
  $listeners$$.push({fn:$fn$$, this_value:$this_value$$, });
};
BusConnector.prototype.unregister = function($name$$, $fn$$) {
  var $listeners$$ = this.listeners[$name$$];
  void 0 !== $listeners$$ && (this.listeners[$name$$] = $listeners$$.filter(function($l$$) {
    return $l$$.fn !== $fn$$;
  }));
};
BusConnector.prototype.send = function($listeners$jscomp$2_name$$, $value$$, $i$$) {
  if (this.pair && ($listeners$jscomp$2_name$$ = this.pair.listeners[$listeners$jscomp$2_name$$], void 0 !== $listeners$jscomp$2_name$$)) {
    for ($i$$ = 0; $i$$ < $listeners$jscomp$2_name$$.length; $i$$++) {
      var $listener$$ = $listeners$jscomp$2_name$$[$i$$];
      $listener$$.fn.call($listener$$.this_value, $value$$);
    }
  }
};
BusConnector.prototype.send_async = function($name$$, $value$$) {
  dbg_assert(1 === arguments.length || 2 === arguments.length);
  setTimeout(this.send.bind(this, $name$$, $value$$), 0);
};
Bus.create = function() {
  var $c0$$ = new BusConnector, $c1$$ = new BusConnector;
  $c0$$.pair = $c1$$;
  $c1$$.pair = $c0$$;
  return [$c0$$, $c1$$];
};
var log_data = [];
function do_the_log($message$$) {
  LOG_TO_FILE ? log_data.push($message$$, "\n") : console.log($message$$);
}
var dbg_log = function() {
  if (!DEBUG) {
    return function() {
    };
  }
  var $dbg_names$$ = LOG_NAMES.reduce(function($a$$, $x$$) {
    $a$$[$x$$[0]] = $x$$[1];
    return $a$$;
  }, {}), $log_last_message$$ = "", $log_message_repetitions$$ = 0;
  return function($message$$, $level$jscomp$19_now$$) {
    if (DEBUG && ($level$jscomp$19_now$$ = $level$jscomp$19_now$$ || 1, $level$jscomp$19_now$$ & LOG_LEVEL)) {
      $message$$ = "[" + v86util.pads($dbg_names$$[$level$jscomp$19_now$$] || "", 4) + "] " + $message$$;
      if ($message$$ === $log_last_message$$ && ($log_message_repetitions$$++, 2048 > $log_message_repetitions$$)) {
        return;
      }
      $level$jscomp$19_now$$ = new Date;
      $level$jscomp$19_now$$ = v86util.pad0($level$jscomp$19_now$$.getHours(), 2) + ":" + v86util.pad0($level$jscomp$19_now$$.getMinutes(), 2) + ":" + v86util.pad0($level$jscomp$19_now$$.getSeconds(), 2) + "+" + v86util.pad0($level$jscomp$19_now$$.getMilliseconds(), 3) + " ";
      $log_message_repetitions$$ && (1 === $log_message_repetitions$$ ? do_the_log($level$jscomp$19_now$$ + $log_last_message$$) : do_the_log("Previous message repeated " + $log_message_repetitions$$ + " times"), $log_message_repetitions$$ = 0);
      do_the_log($level$jscomp$19_now$$ + $message$$);
      $log_last_message$$ = $message$$;
    }
  };
}();
function dbg_trace($level$$) {
  DEBUG && dbg_log(Error().stack, $level$$);
}
function dbg_assert($cond$$, $msg$$, $level$$) {
  DEBUG && ($cond$$ || dbg_assert_failed($msg$$));
}
function dbg_assert_failed($msg$$) {
  debugger;
  console.trace();
  if ($msg$$) {
    throw "Assert failed: " + $msg$$;
  }
  throw "Assert failed";
}
;var CPU_LOG_VERBOSE = !1;
function CPU($bus$$, $memory$$, $next_tick_immediately$$) {
  this.next_tick_immediately = $next_tick_immediately$$;
  this.wm = $memory$$;
  this.wasm_patch();
  this.create_jit_imports();
  this.wasm_memory = $memory$$ = this.wm.exports.memory;
  this.memory_size = v86util.view(Uint32Array, $memory$$, 812, 1);
  this.mem8 = new Uint8Array(0);
  this.mem32s = new Int32Array(this.mem8.buffer);
  this.segment_is_null = v86util.view(Uint8Array, $memory$$, 724, 8);
  this.segment_offsets = v86util.view(Int32Array, $memory$$, 736, 8);
  this.segment_limits = v86util.view(Uint32Array, $memory$$, 768, 8);
  this.protected_mode = v86util.view(Int32Array, $memory$$, 800, 1);
  this.idtr_size = v86util.view(Int32Array, $memory$$, 564, 1);
  this.idtr_offset = v86util.view(Int32Array, $memory$$, 568, 1);
  this.gdtr_size = v86util.view(Int32Array, $memory$$, 572, 1);
  this.gdtr_offset = v86util.view(Int32Array, $memory$$, 576, 1);
  this.tss_size_32 = v86util.view(Int32Array, $memory$$, 1128, 1);
  this.page_fault = v86util.view(Uint32Array, $memory$$, 540, 8);
  this.cr = v86util.view(Int32Array, $memory$$, 580, 8);
  this.cpl = v86util.view(Uint8Array, $memory$$, 612, 1);
  this.is_32 = v86util.view(Int32Array, $memory$$, 804, 1);
  this.stack_size_32 = v86util.view(Int32Array, $memory$$, 808, 1);
  this.in_hlt = v86util.view(Uint8Array, $memory$$, 616, 1);
  this.last_virt_eip = v86util.view(Int32Array, $memory$$, 620, 1);
  this.eip_phys = v86util.view(Int32Array, $memory$$, 624, 1);
  this.sysenter_cs = v86util.view(Int32Array, $memory$$, 636, 1);
  this.sysenter_esp = v86util.view(Int32Array, $memory$$, 640, 1);
  this.sysenter_eip = v86util.view(Int32Array, $memory$$, 644, 1);
  this.prefixes = v86util.view(Int32Array, $memory$$, 648, 1);
  this.flags = v86util.view(Int32Array, $memory$$, 120, 1);
  this.flags_changed = v86util.view(Int32Array, $memory$$, 100, 1);
  this.last_op_size = v86util.view(Int32Array, $memory$$, 96, 1);
  this.last_op1 = v86util.view(Int32Array, $memory$$, 104, 1);
  this.last_result = v86util.view(Int32Array, $memory$$, 112, 1);
  this.current_tsc = v86util.view(Uint32Array, $memory$$, 960, 2);
  this.devices = {};
  this.instruction_pointer = v86util.view(Int32Array, $memory$$, 556, 1);
  this.previous_ip = v86util.view(Int32Array, $memory$$, 560, 1);
  this.apic_enabled = v86util.view(Uint8Array, $memory$$, 548, 1);
  this.acpi_enabled = v86util.view(Uint8Array, $memory$$, 552, 1);
  this.memory_map_read8 = [];
  this.memory_map_write8 = [];
  this.memory_map_read32 = [];
  this.memory_map_write32 = [];
  this.bios = {main:null, vga:null, };
  this.instruction_counter = v86util.view(Uint32Array, $memory$$, 664, 1);
  this.reg32 = v86util.view(Int32Array, $memory$$, 64, 8);
  this.fpu_st = v86util.view(Int32Array, $memory$$, 1152, 32);
  this.fpu_stack_empty = v86util.view(Uint8Array, $memory$$, 816, 1);
  this.fpu_stack_empty[0] = 255;
  this.fpu_stack_ptr = v86util.view(Uint8Array, $memory$$, 1032, 1);
  this.fpu_stack_ptr[0] = 0;
  this.fpu_control_word = v86util.view(Uint16Array, $memory$$, 1036, 1);
  this.fpu_control_word[0] = 895;
  this.fpu_status_word = v86util.view(Uint16Array, $memory$$, 1040, 1);
  this.fpu_status_word[0] = 0;
  this.fpu_ip = v86util.view(Int32Array, $memory$$, 1048, 1);
  this.fpu_ip[0] = 0;
  this.fpu_ip_selector = v86util.view(Int32Array, $memory$$, 1052, 1);
  this.fpu_ip_selector[0] = 0;
  this.fpu_opcode = v86util.view(Int32Array, $memory$$, 1044, 1);
  this.fpu_opcode[0] = 0;
  this.fpu_dp = v86util.view(Int32Array, $memory$$, 1056, 1);
  this.fpu_dp[0] = 0;
  this.fpu_dp_selector = v86util.view(Int32Array, $memory$$, 1060, 1);
  this.fpu_dp_selector[0] = 0;
  this.reg_xmm32s = v86util.view(Int32Array, $memory$$, 832, 32);
  this.mxcsr = v86util.view(Int32Array, $memory$$, 824, 1);
  this.sreg = v86util.view(Uint16Array, $memory$$, 668, 8);
  this.dreg = v86util.view(Int32Array, $memory$$, 684, 8);
  this.reg_pdpte = v86util.view(Int32Array, $memory$$, 968, 8);
  this.svga_dirty_bitmap_min_offset = v86util.view(Uint32Array, $memory$$, 716, 1);
  this.svga_dirty_bitmap_max_offset = v86util.view(Uint32Array, $memory$$, 720, 1);
  this.fw_value = [];
  this.fw_pointer = 0;
  this.option_roms = [];
  this.io = void 0;
  this.bus = $bus$$;
  this.set_tsc(0, 0);
  this.debug_init();
  DEBUG && (this.do_many_cycles_total = this.do_many_cycles_count = 0, this.seen_code = {}, this.seen_code_uncompiled = {});
}
CPU.prototype.clear_opstats = function() {
  (new Uint8Array(this.wasm_memory.buffer, 32768, 131072)).fill(0);
  this.wm.exports.profiler_init();
};
CPU.prototype.create_jit_imports = function() {
  const $jit_imports$$ = Object.create(null);
  $jit_imports$$.m = this.wm.exports.memory;
  for (let $name$$ of Object.keys(this.wm.exports)) {
    $name$$.startsWith("_") || $name$$.startsWith("zstd") || $name$$.endsWith("_js") || ($jit_imports$$[$name$$] = this.wm.exports[$name$$]);
  }
  this.jit_imports = $jit_imports$$;
};
CPU.prototype.wasm_patch = function() {
  const $get_optional_import$$ = $name$$ => this.wm.exports[$name$$], $get_import$$ = $name$$ => {
    const $f$$ = $get_optional_import$$($name$$);
    console.assert($f$$, "Missing import: " + $name$$);
    return $f$$;
  };
  this.reset_cpu = $get_import$$("reset_cpu");
  this.getiopl = $get_import$$("getiopl");
  this.get_eflags = $get_import$$("get_eflags");
  this.get_eflags_no_arith = $get_import$$("get_eflags_no_arith");
  this.pic_call_irq = $get_import$$("pic_call_irq");
  this.do_many_cycles_native = $get_import$$("do_many_cycles_native");
  this.cycle_internal = $get_import$$("cycle_internal");
  this.read8 = $get_import$$("read8");
  this.read16 = $get_import$$("read16");
  this.read32s = $get_import$$("read32s");
  this.write8 = $get_import$$("write8");
  this.write16 = $get_import$$("write16");
  this.write32 = $get_import$$("write32");
  this.in_mapped_range = $get_import$$("in_mapped_range");
  this.fpu_load_tag_word = $get_import$$("fpu_load_tag_word");
  this.fpu_load_status_word = $get_import$$("fpu_load_status_word");
  this.fpu_get_sti_f64 = $get_import$$("fpu_get_sti_f64");
  this.translate_address_system_read = $get_import$$("translate_address_system_read_js");
  this.get_seg_cs = $get_import$$("get_seg_cs");
  this.get_real_eip = $get_import$$("get_real_eip");
  this.clear_tlb = $get_import$$("clear_tlb");
  this.full_clear_tlb = $get_import$$("full_clear_tlb");
  this.update_state_flags = $get_import$$("update_state_flags");
  this.set_tsc = $get_import$$("set_tsc");
  this.store_current_tsc = $get_import$$("store_current_tsc");
  this.set_cpuid_level = $get_import$$("set_cpuid_level");
  DEBUG && (this.jit_force_generate_unsafe = $get_optional_import$$("jit_force_generate_unsafe"));
  this.jit_clear_cache = $get_import$$("jit_clear_cache_js");
  this.jit_dirty_cache = $get_import$$("jit_dirty_cache");
  this.codegen_finalize_finished = $get_import$$("codegen_finalize_finished");
  this.allocate_memory = $get_import$$("allocate_memory");
  this.zero_memory = $get_import$$("zero_memory");
  this.svga_allocate_memory = $get_import$$("svga_allocate_memory");
  this.svga_allocate_dest_buffer = $get_import$$("svga_allocate_dest_buffer");
  this.svga_fill_pixel_buffer = $get_import$$("svga_fill_pixel_buffer");
  this.svga_mark_dirty = $get_import$$("svga_mark_dirty");
  this.zstd_create_ctx = $get_import$$("zstd_create_ctx");
  this.zstd_get_src_ptr = $get_import$$("zstd_get_src_ptr");
  this.zstd_free_ctx = $get_import$$("zstd_free_ctx");
  this.zstd_read = $get_import$$("zstd_read");
  this.zstd_read_free = $get_import$$("zstd_read_free");
};
CPU.prototype.jit_force_generate = function($addr$$) {
  this.jit_force_generate_unsafe ? this.jit_force_generate_unsafe($addr$$) : dbg_assert(!1, "Not supported in this wasm build: jit_force_generate_unsafe");
};
CPU.prototype.jit_clear_func = function($index$$) {
  dbg_assert(0 <= $index$$ && $index$$ < WASM_TABLE_SIZE);
  this.wm.wasm_table.set($index$$ + WASM_TABLE_OFFSET, null);
};
CPU.prototype.jit_clear_all_funcs = function() {
  const $table$$ = this.wm.wasm_table;
  for (let $i$$ = 0; $i$$ < WASM_TABLE_SIZE; $i$$++) {
    $table$$.set(WASM_TABLE_OFFSET + $i$$, null);
  }
};
CPU.prototype.get_state = function() {
  var $state$$ = [];
  $state$$[0] = this.memory_size[0];
  $state$$[1] = this.segment_is_null;
  $state$$[2] = this.segment_offsets;
  $state$$[3] = this.segment_limits;
  $state$$[4] = this.protected_mode[0];
  $state$$[5] = this.idtr_offset[0];
  $state$$[6] = this.idtr_size[0];
  $state$$[7] = this.gdtr_offset[0];
  $state$$[8] = this.gdtr_size[0];
  $state$$[9] = this.page_fault[0];
  $state$$[10] = this.cr;
  $state$$[11] = this.cpl[0];
  $state$$[13] = this.is_32[0];
  $state$$[16] = this.stack_size_32[0];
  $state$$[17] = this.in_hlt[0];
  $state$$[18] = this.last_virt_eip[0];
  $state$$[19] = this.eip_phys[0];
  $state$$[22] = this.sysenter_cs[0];
  $state$$[23] = this.sysenter_eip[0];
  $state$$[24] = this.sysenter_esp[0];
  $state$$[25] = this.prefixes[0];
  $state$$[26] = this.flags[0];
  $state$$[27] = this.flags_changed[0];
  $state$$[28] = this.last_op1[0];
  $state$$[30] = this.last_op_size[0];
  $state$$[37] = this.instruction_pointer[0];
  $state$$[38] = this.previous_ip[0];
  $state$$[39] = this.reg32;
  $state$$[40] = this.sreg;
  $state$$[41] = this.dreg;
  $state$$[42] = this.reg_pdpte;
  this.store_current_tsc();
  $state$$[43] = this.current_tsc;
  $state$$[45] = this.devices.virtio_9p;
  $state$$[46] = this.devices.apic;
  $state$$[47] = this.devices.rtc;
  $state$$[48] = this.devices.pci;
  $state$$[49] = this.devices.dma;
  $state$$[50] = this.devices.acpi;
  $state$$[51] = this.devices.hpet;
  $state$$[52] = this.devices.vga;
  $state$$[53] = this.devices.ps2;
  $state$$[54] = this.devices.uart0;
  $state$$[55] = this.devices.fdc;
  $state$$[56] = this.devices.cdrom;
  $state$$[57] = this.devices.hda;
  $state$$[58] = this.devices.pit;
  $state$$[59] = this.devices.net;
  $state$$[60] = this.devices.pic;
  $state$$[61] = this.devices.sb16;
  $state$$[62] = this.fw_value;
  $state$$[63] = this.devices.ioapic;
  $state$$[64] = this.tss_size_32[0];
  $state$$[66] = this.reg_xmm32s;
  $state$$[67] = this.fpu_st;
  $state$$[68] = this.fpu_stack_empty[0];
  $state$$[69] = this.fpu_stack_ptr[0];
  $state$$[70] = this.fpu_control_word[0];
  $state$$[71] = this.fpu_ip[0];
  $state$$[72] = this.fpu_ip_selector[0];
  $state$$[73] = this.fpu_dp[0];
  $state$$[74] = this.fpu_dp_selector[0];
  $state$$[75] = this.fpu_opcode[0];
  const {packed_memory:$packed_memory$$, bitmap:$bitmap$$} = this.pack_memory();
  $state$$[77] = $packed_memory$$;
  $state$$[78] = new Uint8Array($bitmap$$.get_buffer());
  $state$$[79] = this.devices.uart1;
  $state$$[80] = this.devices.uart2;
  $state$$[81] = this.devices.uart3;
  return $state$$;
};
CPU.prototype.set_state = function($state$$) {
  this.memory_size[0] = $state$$[0];
  this.mem8.length !== this.memory_size[0] && console.warn("Note: Memory size mismatch. we=" + this.mem8.length + " state=" + this.memory_size[0]);
  this.segment_is_null.set($state$$[1]);
  this.segment_offsets.set($state$$[2]);
  this.segment_limits.set($state$$[3]);
  this.protected_mode[0] = $state$$[4];
  this.idtr_offset[0] = $state$$[5];
  this.idtr_size[0] = $state$$[6];
  this.gdtr_offset[0] = $state$$[7];
  this.gdtr_size[0] = $state$$[8];
  this.page_fault[0] = $state$$[9];
  this.cr.set($state$$[10]);
  this.cpl[0] = $state$$[11];
  this.is_32[0] = $state$$[13];
  this.stack_size_32[0] = $state$$[16];
  this.in_hlt[0] = $state$$[17];
  this.last_virt_eip[0] = $state$$[18];
  this.eip_phys[0] = $state$$[19];
  this.sysenter_cs[0] = $state$$[22];
  this.sysenter_eip[0] = $state$$[23];
  this.sysenter_esp[0] = $state$$[24];
  this.prefixes[0] = $state$$[25];
  this.flags[0] = $state$$[26];
  this.flags_changed[0] = $state$$[27];
  this.last_op1[0] = $state$$[28];
  this.last_op_size[0] = $state$$[30];
  this.instruction_pointer[0] = $state$$[37];
  this.previous_ip[0] = $state$$[38];
  this.reg32.set($state$$[39]);
  this.sreg.set($state$$[40]);
  this.dreg.set($state$$[41]);
  $state$$[42] && this.reg_pdpte.set($state$$[42]);
  this.set_tsc($state$$[43][0], $state$$[43][1]);
  this.devices.virtio_9p && this.devices.virtio_9p.set_state($state$$[45]);
  this.devices.apic && this.devices.apic.set_state($state$$[46]);
  this.devices.rtc && this.devices.rtc.set_state($state$$[47]);
  this.devices.pci && this.devices.pci.set_state($state$$[48]);
  this.devices.dma && this.devices.dma.set_state($state$$[49]);
  this.devices.acpi && this.devices.acpi.set_state($state$$[50]);
  this.devices.hpet && this.devices.hpet.set_state($state$$[51]);
  this.devices.vga && this.devices.vga.set_state($state$$[52]);
  this.devices.ps2 && this.devices.ps2.set_state($state$$[53]);
  this.devices.uart0 && this.devices.uart0.set_state($state$$[54]);
  this.devices.fdc && this.devices.fdc.set_state($state$$[55]);
  this.devices.cdrom && this.devices.cdrom.set_state($state$$[56]);
  this.devices.hda && this.devices.hda.set_state($state$$[57]);
  this.devices.pit && this.devices.pit.set_state($state$$[58]);
  this.devices.net && this.devices.net.set_state($state$$[59]);
  this.devices.pic && this.devices.pic.set_state($state$$[60]);
  this.devices.sb16 && this.devices.sb16.set_state($state$$[61]);
  this.devices.uart1 && this.devices.uart1.set_state($state$$[79]);
  this.devices.uart2 && this.devices.uart2.set_state($state$$[80]);
  this.devices.uart3 && this.devices.uart3.set_state($state$$[81]);
  this.fw_value = $state$$[62];
  this.devices.ioapic && this.devices.ioapic.set_state($state$$[63]);
  this.tss_size_32[0] = $state$$[64];
  this.reg_xmm32s.set($state$$[66]);
  this.fpu_st.set($state$$[67]);
  this.fpu_stack_empty[0] = $state$$[68];
  this.fpu_stack_ptr[0] = $state$$[69];
  this.fpu_control_word[0] = $state$$[70];
  this.fpu_ip[0] = $state$$[71];
  this.fpu_ip_selector[0] = $state$$[72];
  this.fpu_dp[0] = $state$$[73];
  this.fpu_dp_selector[0] = $state$$[74];
  this.fpu_opcode[0] = $state$$[75];
  const $bitmap$$ = new v86util.Bitmap($state$$[78].buffer);
  this.unpack_memory($bitmap$$, $state$$[77]);
  this.update_state_flags();
  this.full_clear_tlb();
  this.jit_clear_cache();
};
CPU.prototype.pack_memory = function() {
  dbg_assert(0 === (this.mem8.length & 4095));
  var $bitmap$$ = this.mem8.length >> 12, $nonzero_pages_offset$$ = [];
  for ($packed_memory$$ = 0; $packed_memory$$ < $bitmap$$; $packed_memory$$++) {
    var $offset$jscomp$54_view$$ = $packed_memory$$ << 12;
    $offset$jscomp$54_view$$ = this.mem32s.subarray($offset$jscomp$54_view$$ >> 2, $offset$jscomp$54_view$$ + 4096 >> 2);
    let $is_zero$$ = !0;
    for (let $i$$ = 0; $i$$ < $offset$jscomp$54_view$$.length; $i$$++) {
      if (0 !== $offset$jscomp$54_view$$[$i$$]) {
        $is_zero$$ = !1;
        break;
      }
    }
    $is_zero$$ || $nonzero_pages_offset$$.push($packed_memory$$);
  }
  $bitmap$$ = new v86util.Bitmap($bitmap$$);
  var $packed_memory$$ = new Uint8Array($nonzero_pages_offset$$.length << 12);
  for (let [$i$$, $page$$] of $nonzero_pages_offset$$.entries()) {
    $bitmap$$.set($page$$, 1), $nonzero_pages_offset$$ = $page$$ << 12, $nonzero_pages_offset$$ = this.mem8.subarray($nonzero_pages_offset$$, $nonzero_pages_offset$$ + 4096), $packed_memory$$.set($nonzero_pages_offset$$, $i$$ << 12);
  }
  return {bitmap:$bitmap$$, packed_memory:$packed_memory$$};
};
CPU.prototype.unpack_memory = function($bitmap$$, $packed_memory$$) {
  this.zero_memory(this.memory_size[0]);
  const $page_count$$ = this.memory_size[0] >> 12;
  let $packed_page$$ = 0;
  for (let $page$$ = 0; $page$$ < $page_count$$; $page$$++) {
    if ($bitmap$$.get($page$$)) {
      var $offset$jscomp$56_view$$ = $packed_page$$ << 12;
      $offset$jscomp$56_view$$ = $packed_memory$$.subarray($offset$jscomp$56_view$$, $offset$jscomp$56_view$$ + 4096);
      this.mem8.set($offset$jscomp$56_view$$, $page$$ << 12);
      $packed_page$$++;
    }
  }
};
CPU.prototype.main_run = function() {
  if (this.in_hlt[0]) {
    var $start$jscomp$36_t$$ = this.hlt_loop();
    if (this.in_hlt[0]) {
      return $start$jscomp$36_t$$;
    }
  }
  let $now$$ = $start$jscomp$36_t$$ = v86.microtick();
  for (; $now$$ - $start$jscomp$36_t$$ < TIME_PER_FRAME;) {
    this.do_many_cycles();
    $now$$ = v86.microtick();
    const $t$$ = this.run_hardware_timers($now$$);
    this.handle_irqs();
    if (this.in_hlt[0]) {
      return $t$$;
    }
  }
  return 0;
};
CPU.prototype.reboot_internal = function() {
  this.reset_cpu();
  this.fw_value = [];
  this.devices.virtio && this.devices.virtio.reset();
  this.load_bios();
};
CPU.prototype.reset_memory = function() {
  this.mem8.fill(0);
};
CPU.prototype.create_memory = function($size$$) {
  1048576 > $size$$ ? $size$$ = 1048576 : 0 > ($size$$ | 0) && ($size$$ = Math.pow(2, 31) - MMAP_BLOCK_SIZE);
  $size$$ = ($size$$ - 1 | MMAP_BLOCK_SIZE - 1) + 1 | 0;
  dbg_assert(0 < ($size$$ | 0));
  dbg_assert(0 === ($size$$ & MMAP_BLOCK_SIZE - 1));
  console.assert(0 === this.memory_size[0], "Expected uninitialised memory");
  this.memory_size[0] = $size$$;
  const $memory_offset$$ = this.allocate_memory($size$$);
  this.mem8 = v86util.view(Uint8Array, this.wasm_memory, $memory_offset$$, $size$$);
  this.mem32s = v86util.view(Uint32Array, this.wasm_memory, $memory_offset$$, $size$$ >> 2);
};
goog.exportProperty(CPU.prototype, "create_memory", CPU.prototype.create_memory);
CPU.prototype.init = function($settings$$, $device_bus$$) {
  "number" === typeof $settings$$.log_level && (LOG_LEVEL = $settings$$.log_level);
  this.create_memory("number" === typeof $settings$$.memory_size ? $settings$$.memory_size : 67108864);
  $settings$$.cpuid_level && this.set_cpuid_level($settings$$.cpuid_level);
  this.acpi_enabled[0] = +$settings$$.acpi;
  this.reset_cpu();
  var $ide_device_count_io$$ = new IO(this);
  this.io = $ide_device_count_io$$;
  this.bios.main = $settings$$.bios;
  this.bios.vga = $settings$$.vga_bios;
  this.load_bios();
  if ($settings$$.bzimage) {
    const {option_rom:$option_rom$$} = load_kernel(this.mem8, $settings$$.bzimage, $settings$$.initrd, $settings$$.cmdline || "");
    $option_rom$$ && this.option_roms.push($option_rom$$);
  }
  $ide_device_count_io$$.register_read(179, this, function() {
    dbg_log("port 0xB3 read");
    return 0;
  });
  var $a20_byte$$ = 0;
  $ide_device_count_io$$.register_read(146, this, function() {
    return $a20_byte$$;
  });
  $ide_device_count_io$$.register_write(146, this, function($out_byte$$) {
    $a20_byte$$ = $out_byte$$;
  });
  $ide_device_count_io$$.register_read(1297, this, function() {
    if (this.fw_pointer < this.fw_value.length) {
      return this.fw_value[this.fw_pointer++];
    }
    dbg_assert(!1, "config port: Read past value");
    return 0;
  });
  $ide_device_count_io$$.register_write(1296, this, void 0, function($buffer32_value$$) {
    function $i32$$($x$$) {
      return new Uint8Array((new Int32Array([$x$$])).buffer);
    }
    function $to_be16$$($x$$) {
      return $x$$ >> 8 | $x$$ << 8 & 65280;
    }
    function $to_be32$$($x$$) {
      return $x$$ << 24 | $x$$ << 8 & 16711680 | $x$$ >> 8 & 65280 | $x$$ >>> 24;
    }
    dbg_log("bios config port, index=" + h($buffer32_value$$));
    this.fw_pointer = 0;
    if ($buffer32_value$$ === FW_CFG_SIGNATURE) {
      this.fw_value = $i32$$(FW_CFG_SIGNATURE_QEMU);
    } else {
      if ($buffer32_value$$ === FW_CFG_ID) {
        this.fw_value = $i32$$(0);
      } else {
        if ($buffer32_value$$ === FW_CFG_RAM_SIZE) {
          this.fw_value = $i32$$(this.memory_size[0]);
        } else {
          if ($buffer32_value$$ === FW_CFG_NB_CPUS) {
            this.fw_value = $i32$$(1);
          } else {
            if ($buffer32_value$$ === FW_CFG_MAX_CPUS) {
              this.fw_value = $i32$$(1);
            } else {
              if ($buffer32_value$$ === FW_CFG_NUMA) {
                this.fw_value = new Uint8Array(16);
              } else {
                if ($buffer32_value$$ === FW_CFG_FILE_DIR) {
                  $buffer32_value$$ = new Int32Array(4 + 64 * this.option_roms.length);
                  const $buffer8$$ = new Uint8Array($buffer32_value$$.buffer);
                  $buffer32_value$$[0] = $to_be32$$(this.option_roms.length);
                  for (let $i$$ = 0; $i$$ < this.option_roms.length; $i$$++) {
                    const {name:$name$$, data:$data$$} = this.option_roms[$i$$], $file_struct_ptr$$ = 4 + 64 * $i$$;
                    dbg_assert(65536 > FW_CFG_FILE_START + $i$$);
                    $buffer32_value$$[$file_struct_ptr$$ + 0 >> 2] = $to_be32$$($data$$.length);
                    $buffer32_value$$[$file_struct_ptr$$ + 4 >> 2] = $to_be16$$(FW_CFG_FILE_START + $i$$);
                    dbg_assert(56 > $name$$.length);
                    for (let $j$$ = 0; $j$$ < $name$$.length; $j$$++) {
                      $buffer8$$[$file_struct_ptr$$ + 8 + $j$$] = $name$$.charCodeAt($j$$);
                    }
                  }
                  this.fw_value = $buffer8$$;
                } else {
                  $buffer32_value$$ >= FW_CFG_CUSTOM_START && $buffer32_value$$ < FW_CFG_FILE_START ? this.fw_value = $i32$$(0) : $buffer32_value$$ >= FW_CFG_FILE_START && $buffer32_value$$ - FW_CFG_FILE_START < this.option_roms.length ? this.fw_value = this.option_roms[$buffer32_value$$ - FW_CFG_FILE_START].data : (dbg_log("Warning: Unimplemented fw index: " + h($buffer32_value$$)), this.fw_value = $i32$$(0));
                }
              }
            }
          }
        }
      }
    }
  });
  DEBUG && ($ide_device_count_io$$.register_write(128, this, function($out_byte$$) {
  }), $ide_device_count_io$$.register_read(128, this, function() {
    return 255;
  }), $ide_device_count_io$$.register_write(233, this, function($out_byte$$) {
  }));
  this.devices = {};
  $settings$$.load_devices && (this.devices.pic = new PIC(this), this.devices.pci = new PCI(this), this.acpi_enabled[0] && (this.devices.ioapic = new IOAPIC(this), this.devices.apic = new APIC(this), this.devices.acpi = new ACPI(this)), this.devices.rtc = new RTC(this), this.fill_cmos(this.devices.rtc, $settings$$), this.devices.dma = new DMA(this), ENABLE_HPET && (this.devices.hpet = new HPET(this)), this.devices.vga = new VGAScreen(this, $device_bus$$, $settings$$.vga_memory_size || 8388608), this.devices.ps2 = 
  new PS2(this, $device_bus$$), this.devices.uart0 = new UART(this, 1016, $device_bus$$), $settings$$.uart1 && (this.devices.uart1 = new UART(this, 760, $device_bus$$)), $settings$$.uart2 && (this.devices.uart2 = new UART(this, 1E3, $device_bus$$)), $settings$$.uart3 && (this.devices.uart3 = new UART(this, 744, $device_bus$$)), this.devices.fdc = new FloppyController(this, $settings$$.fda, $settings$$.fdb), $ide_device_count_io$$ = 0, $settings$$.hda && (this.devices.hda = new IDEDevice(this, $settings$$.hda, 
  $settings$$.hdb, !1, $ide_device_count_io$$++, $device_bus$$)), $settings$$.cdrom && (this.devices.cdrom = new IDEDevice(this, $settings$$.cdrom, void 0, !0, $ide_device_count_io$$++, $device_bus$$)), this.devices.pit = new PIT(this, $device_bus$$), $settings$$.enable_ne2k && (this.devices.net = new Ne2k(this, $device_bus$$, $settings$$.preserve_mac_from_state_image, $settings$$.mac_address_translation)), $settings$$.fs9p && (this.devices.virtio_9p = new Virtio9p($settings$$.fs9p, this, $device_bus$$)), 
  this.devices.sb16 = new SB16(this, $device_bus$$));
  $settings$$.multiboot && this.load_multiboot($settings$$.multiboot);
  DEBUG && this.debug.init();
};
CPU.prototype.load_multiboot = function($blob$jscomp$14_buffer$$) {
  dbg_log("Trying multiboot from buffer of size " + $blob$jscomp$14_buffer$$.byteLength, LOG_CPU);
  if (8192 > $blob$jscomp$14_buffer$$.byteLength) {
    var $buf32_entry_addr$$ = new Int32Array(2048);
    (new Uint8Array($buf32_entry_addr$$.buffer)).set(new Uint8Array($blob$jscomp$14_buffer$$));
  } else {
    $buf32_entry_addr$$ = new Int32Array($blob$jscomp$14_buffer$$, 0, 2048);
  }
  for (var $blob$jscomp$15_elf_file_start_offset$$ = 0; 8192 > $blob$jscomp$15_elf_file_start_offset$$; $blob$jscomp$15_elf_file_start_offset$$ += 4) {
    if (464367618 === $buf32_entry_addr$$[$blob$jscomp$15_elf_file_start_offset$$ >> 2]) {
      var $flags$jscomp$8_length$$ = $buf32_entry_addr$$[$blob$jscomp$15_elf_file_start_offset$$ + 4 >> 2];
      if (464367618 + $flags$jscomp$8_length$$ + $buf32_entry_addr$$[$blob$jscomp$15_elf_file_start_offset$$ + 8 >> 2] | 0) {
        dbg_log("Multiboot checksum check failed", LOG_CPU);
      } else {
        dbg_log("Multiboot magic found, flags: " + h($flags$jscomp$8_length$$ >>> 0, 8), LOG_CPU);
        dbg_assert(0 === ($flags$jscomp$8_length$$ & -65537), "TODO");
        this.reg32[REG_EAX] = 732803074;
        this.reg32[REG_EBX] = 31744;
        this.write32(31744, 0);
        this.cr[0] = 1;
        this.protected_mode[0] = 1;
        this.flags[0] = FLAGS_DEFAULT;
        this.is_32[0] = 1;
        this.stack_size_32[0] = 1;
        for (var $header_addr_i$$ = 0; 6 > $header_addr_i$$; $header_addr_i$$++) {
          this.segment_is_null[$header_addr_i$$] = 0, this.segment_offsets[$header_addr_i$$] = 0, this.segment_limits[$header_addr_i$$] = 4294967295, this.sreg[$header_addr_i$$] = 45058;
        }
        if ($flags$jscomp$8_length$$ & 65536) {
          dbg_log("Multiboot specifies its own address table", LOG_CPU);
          $header_addr_i$$ = $buf32_entry_addr$$[$blob$jscomp$15_elf_file_start_offset$$ + 12 >> 2];
          var $load_addr_program$$ = $buf32_entry_addr$$[$blob$jscomp$15_elf_file_start_offset$$ + 16 >> 2];
          $flags$jscomp$8_length$$ = $buf32_entry_addr$$[$blob$jscomp$15_elf_file_start_offset$$ + 20 >> 2];
          var $bss_end_addr$$ = $buf32_entry_addr$$[$blob$jscomp$15_elf_file_start_offset$$ + 24 >> 2];
          $buf32_entry_addr$$ = $buf32_entry_addr$$[$blob$jscomp$15_elf_file_start_offset$$ + 28 >> 2];
          dbg_log("header=" + h($header_addr_i$$, 8) + " load=" + h($load_addr_program$$, 8) + " load_end=" + h($flags$jscomp$8_length$$, 8) + " bss_end=" + h($bss_end_addr$$, 8) + " entry=" + h($buf32_entry_addr$$, 8));
          dbg_assert($load_addr_program$$ <= $header_addr_i$$);
          $blob$jscomp$15_elf_file_start_offset$$ -= $header_addr_i$$ - $load_addr_program$$;
          0 === $flags$jscomp$8_length$$ ? $flags$jscomp$8_length$$ = void 0 : (dbg_assert($flags$jscomp$8_length$$ >= $load_addr_program$$), $flags$jscomp$8_length$$ -= $load_addr_program$$);
          $blob$jscomp$14_buffer$$ = new Uint8Array($blob$jscomp$14_buffer$$, $blob$jscomp$15_elf_file_start_offset$$, $flags$jscomp$8_length$$);
          this.write_blob($blob$jscomp$14_buffer$$, $load_addr_program$$);
          this.instruction_pointer[0] = this.get_seg_cs() + $buf32_entry_addr$$ | 0;
        } else {
          if (1179403647 === $buf32_entry_addr$$[0]) {
            dbg_log("Multiboot image is in elf format", LOG_CPU);
            $blob$jscomp$15_elf_file_start_offset$$ = read_elf($blob$jscomp$14_buffer$$);
            this.instruction_pointer[0] = this.get_seg_cs() + $blob$jscomp$15_elf_file_start_offset$$.header.entry | 0;
            for ($load_addr_program$$ of $blob$jscomp$15_elf_file_start_offset$$.program_headers) {
              0 !== $load_addr_program$$.type && (1 === $load_addr_program$$.type ? (dbg_assert($load_addr_program$$.paddr === $load_addr_program$$.vaddr), dbg_assert($load_addr_program$$.filesz <= $load_addr_program$$.memsz), $load_addr_program$$.paddr + $load_addr_program$$.memsz < this.memory_size[0] ? $load_addr_program$$.filesz && ($blob$jscomp$15_elf_file_start_offset$$ = new Uint8Array($blob$jscomp$14_buffer$$, $load_addr_program$$.offset, $load_addr_program$$.filesz), this.write_blob($blob$jscomp$15_elf_file_start_offset$$, 
              $load_addr_program$$.paddr)) : dbg_log("Warning: Skipped loading section, paddr=" + h($load_addr_program$$.paddr) + " memsz=" + $load_addr_program$$.memsz, LOG_CPU)) : 2 !== $load_addr_program$$.type && 3 !== $load_addr_program$$.type && 4 !== $load_addr_program$$.type && 6 !== $load_addr_program$$.type && 1685382480 !== $load_addr_program$$.type && 1685382481 !== $load_addr_program$$.type && 1685382483 !== $load_addr_program$$.type && dbg_assert(!1, "unimplemented elf section type: " + 
              h($load_addr_program$$.type)));
            }
          } else {
            dbg_assert(!1, "Not a bootable multiboot format");
          }
        }
        this.io.register_write_consecutive(244, this, function($value$$) {
          console.log("Test exited with code " + h($value$$, 2));
          throw "HALT";
        }, function() {
        }, function() {
        }, function() {
        });
        for (let $i$$ = 0; 15 >= $i$$; $i$$++) {
          function $handle_write$$($value$$) {
            dbg_log("kvm-unit-test: Set irq " + h($i$$) + " to " + h($value$$, 2));
            $value$$ ? this.device_raise_irq($i$$) : this.device_lower_irq($i$$);
          }
          this.io.register_write(8192 + $i$$, this, $handle_write$$, $handle_write$$, $handle_write$$);
        }
        this.update_state_flags();
        dbg_log("Starting multiboot kernel at:", LOG_CPU);
        this.debug.dump_state();
        this.debug.dump_regs();
        break;
      }
    }
  }
};
CPU.prototype.fill_cmos = function($rtc$$, $settings$$) {
  var $boot_order_memory_above_16m_memory_above_1m$$ = $settings$$.boot_order || 531;
  $rtc$$.cmos_write(CMOS_BIOS_BOOTFLAG1, 1 | $boot_order_memory_above_16m_memory_above_1m$$ >> 4 & 240);
  $rtc$$.cmos_write(CMOS_BIOS_BOOTFLAG2, $boot_order_memory_above_16m_memory_above_1m$$ & 255);
  $rtc$$.cmos_write(CMOS_MEM_BASE_LOW, 128);
  $rtc$$.cmos_write(CMOS_MEM_BASE_HIGH, 2);
  $boot_order_memory_above_16m_memory_above_1m$$ = 0;
  1048576 <= this.memory_size[0] && ($boot_order_memory_above_16m_memory_above_1m$$ = this.memory_size[0] - 1048576 >> 10, $boot_order_memory_above_16m_memory_above_1m$$ = Math.min($boot_order_memory_above_16m_memory_above_1m$$, 65535));
  $rtc$$.cmos_write(CMOS_MEM_OLD_EXT_LOW, $boot_order_memory_above_16m_memory_above_1m$$ & 255);
  $rtc$$.cmos_write(CMOS_MEM_OLD_EXT_HIGH, $boot_order_memory_above_16m_memory_above_1m$$ >> 8 & 255);
  $rtc$$.cmos_write(CMOS_MEM_EXTMEM_LOW, $boot_order_memory_above_16m_memory_above_1m$$ & 255);
  $rtc$$.cmos_write(CMOS_MEM_EXTMEM_HIGH, $boot_order_memory_above_16m_memory_above_1m$$ >> 8 & 255);
  $boot_order_memory_above_16m_memory_above_1m$$ = 0;
  16777216 <= this.memory_size[0] && ($boot_order_memory_above_16m_memory_above_1m$$ = this.memory_size[0] - 16777216 >> 16, $boot_order_memory_above_16m_memory_above_1m$$ = Math.min($boot_order_memory_above_16m_memory_above_1m$$, 65535));
  $rtc$$.cmos_write(CMOS_MEM_EXTMEM2_LOW, $boot_order_memory_above_16m_memory_above_1m$$ & 255);
  $rtc$$.cmos_write(CMOS_MEM_EXTMEM2_HIGH, $boot_order_memory_above_16m_memory_above_1m$$ >> 8 & 255);
  $rtc$$.cmos_write(CMOS_MEM_HIGHMEM_LOW, 0);
  $rtc$$.cmos_write(CMOS_MEM_HIGHMEM_MID, 0);
  $rtc$$.cmos_write(CMOS_MEM_HIGHMEM_HIGH, 0);
  $rtc$$.cmos_write(CMOS_EQUIPMENT_INFO, 47);
  $rtc$$.cmos_write(CMOS_BIOS_SMP_COUNT, 0);
  $settings$$.fastboot && $rtc$$.cmos_write(63, 1);
};
CPU.prototype.load_bios = function() {
  var $bios$$ = this.bios.main, $vga_bios$$ = this.bios.vga;
  if ($bios$$) {
    var $data$$ = new Uint8Array($bios$$);
    this.write_blob($data$$, 1048576 - $bios$$.byteLength);
    if ($vga_bios$$) {
      var $vga_bios8$$ = new Uint8Array($vga_bios$$);
      this.write_blob($vga_bios8$$, 786432);
      this.io.mmap_register(4272947200, 1048576, function($addr$$) {
        $addr$$ = $addr$$ - 4272947200 | 0;
        return $addr$$ < $vga_bios8$$.length ? $vga_bios8$$[$addr$$] : 0;
      }, function($addr$$, $value$$) {
        dbg_assert(!1, "Unexpected write to VGA rom");
      });
    } else {
      dbg_log("Warning: No VGA BIOS");
    }
    this.io.mmap_register(4293918720, 1048576, function($addr$$) {
      return this.mem8[$addr$$ & 1048575];
    }.bind(this), function($addr$$, $value$$) {
      this.mem8[$addr$$ & 1048575] = $value$$;
    }.bind(this));
  } else {
    dbg_log("Warning: No BIOS");
  }
};
CPU.prototype.do_many_cycles = function() {
  if (DEBUG) {
    var $start_time$$ = v86.microtick();
  }
  this.do_many_cycles_native();
  DEBUG && (this.do_many_cycles_total += v86.microtick() - $start_time$$, this.do_many_cycles_count++);
};
CPU.prototype.cycle = function() {
  this.cycle_internal();
};
goog.exportProperty(CPU.prototype, "cycle", CPU.prototype.cycle);
CPU.prototype.codegen_finalize = function($wasm_table_index$$, $start$$, $state_flags$$, $ptr$jscomp$4_result$$, $len$$) {
  $ptr$jscomp$4_result$$ >>>= 0;
  $len$$ >>>= 0;
  dbg_assert(0 <= $wasm_table_index$$ && $wasm_table_index$$ < WASM_TABLE_SIZE);
  const $code$$ = new Uint8Array(this.wasm_memory.buffer, $ptr$jscomp$4_result$$, $len$$);
  DEBUG && (DUMP_GENERATED_WASM && !this.seen_code[$start$$] && this.debug.dump_wasm($code$$), this.seen_code[$start$$] = (this.seen_code[$start$$] || 0) + 1, this.test_hook_did_generate_wasm && this.test_hook_did_generate_wasm($code$$));
  $ptr$jscomp$4_result$$ = WebAssembly.instantiate($code$$, {e:this.jit_imports}).then($result$$ => {
    this.wm.wasm_table.set($wasm_table_index$$ + WASM_TABLE_OFFSET, $result$$.instance.exports.f);
    this.codegen_finalize_finished($wasm_table_index$$, $start$$, $state_flags$$);
    this.test_hook_did_finalize_wasm && this.test_hook_did_finalize_wasm($code$$);
  });
  DEBUG && $ptr$jscomp$4_result$$.catch($e$$ => {
    console.log($e$$);
    debugger;
    throw $e$$;
  });
};
CPU.prototype.log_uncompiled_code = function($start$$, $end$$) {
  if (DEBUG && DUMP_UNCOMPILED_ASSEMBLY && 100 > (this.seen_code_uncompiled[$start$$] || 0)) {
    this.seen_code_uncompiled[$start$$] = (this.seen_code_uncompiled[$start$$] || 0) + 1;
    $end$$ += 8;
    ($start$$ ^ $end$$) & -4096 && (dbg_log("truncated disassembly start=" + h($start$$ >>> 0) + " end=" + h($end$$ >>> 0)), $end$$ = ($start$$ | 4095) + 1);
    $end$$ < $start$$ && ($end$$ = $start$$);
    dbg_assert($end$$ >= $start$$);
    const $buffer$$ = new Uint8Array($end$$ - $start$$);
    for (let $i$$ = $start$$; $i$$ < $end$$; $i$$++) {
      $buffer$$[$i$$ - $start$$] = this.read8($i$$);
    }
    dbg_log("Uncompiled code:");
    this.debug.dump_code(this.is_32[0] ? 1 : 0, $buffer$$, $start$$);
  }
};
CPU.prototype.dump_function_code = function($block_ptr$$, $count$$) {
  if (DEBUG && DUMP_GENERATED_WASM) {
    var $mem32$$ = new Int32Array(this.wasm_memory.buffer);
    dbg_assert(0 === ($block_ptr$$ & 3));
    var $is_32$$ = this.is_32[0];
    for (let $i$jscomp$0$$ = 0; $i$jscomp$0$$ < $count$$; $i$jscomp$0$$++) {
      var $is_entry_block_struct_start$$ = ($block_ptr$$ >> 2) + 7 * $i$jscomp$0$$;
      const $start$$ = $mem32$$[$is_entry_block_struct_start$$ + 0], $end$$ = $mem32$$[$is_entry_block_struct_start$$ + 1];
      $is_entry_block_struct_start$$ = $mem32$$[$is_entry_block_struct_start$$ + 6] & 65280;
      const $buffer$$ = new Uint8Array($end$$ - $start$$);
      for (let $i$$ = $start$$; $i$$ < $end$$; $i$$++) {
        $buffer$$[$i$$ - $start$$] = this.read8(this.translate_address_system_read($i$$));
      }
      dbg_log("---" + ($is_entry_block_struct_start$$ ? " entry" : ""));
      this.debug.dump_code($is_32$$ ? 1 : 0, $buffer$$, $start$$);
    }
  }
};
CPU.prototype.hlt_loop = function() {
  if (this.get_eflags_no_arith() & FLAG_INTERRUPT) {
    const $t$$ = this.run_hardware_timers(v86.microtick());
    this.handle_irqs();
    return $t$$;
  }
  return 100;
};
CPU.prototype.run_hardware_timers = function($now$$) {
  if (ENABLE_HPET) {
    var $pit_time$$ = this.devices.pit.timer($now$$, this.devices.hpet.legacy_mode), $rtc_time$$ = this.devices.rtc.timer($now$$, this.devices.hpet.legacy_mode), $hpet_time$$ = this.devices.hpet.timer($now$$);
  } else {
    $pit_time$$ = this.devices.pit.timer($now$$, !1), $rtc_time$$ = this.devices.rtc.timer($now$$, !1), $hpet_time$$ = 100;
  }
  let $acpi_time$$ = 100, $apic_time$$ = 100;
  this.acpi_enabled[0] && ($acpi_time$$ = this.devices.acpi.timer($now$$), $apic_time$$ = this.devices.apic.timer($now$$));
  return Math.min($pit_time$$, $rtc_time$$, $hpet_time$$, $acpi_time$$, $apic_time$$);
};
CPU.prototype.hlt_op = function() {
  0 === (this.get_eflags_no_arith() & FLAG_INTERRUPT) && this.bus.send("cpu-event-halt");
  this.in_hlt[0] = 1;
  this.hlt_loop();
};
CPU.prototype.handle_irqs = function() {
  this.get_eflags_no_arith() & FLAG_INTERRUPT && (this.pic_acknowledge(), this.next_tick_immediately());
};
CPU.prototype.pic_acknowledge = function() {
  dbg_assert(this.get_eflags_no_arith() & FLAG_INTERRUPT);
  this.devices.pic && this.devices.pic.acknowledge_irq();
  this.devices.apic && this.devices.apic.acknowledge_irq();
};
CPU.prototype.device_raise_irq = function($i$$) {
  dbg_assert(1 === arguments.length);
  this.devices.pic && this.devices.pic.set_irq($i$$);
  this.devices.ioapic && this.devices.ioapic.set_irq($i$$);
};
CPU.prototype.device_lower_irq = function($i$$) {
  this.devices.pic && this.devices.pic.clear_irq($i$$);
  this.devices.ioapic && this.devices.ioapic.clear_irq($i$$);
};
"undefined" !== typeof window ? window.CPU = CPU : "undefined" !== typeof module && "undefined" !== typeof module.exports ? module.exports.CPU = CPU : "function" === typeof importScripts && (self.CPU = CPU);
CPU.prototype.debug_init = function() {
  function $get_state$$($where$$) {
    if (DEBUG) {
      for (var $mode$$ = $cpu$$.protected_mode[0] ? "prot" : "real", $flags$$ = $cpu$$.get_eflags(), $iopl$$ = $cpu$$.getiopl(), $cpl$$ = $cpu$$.cpl[0], $cs_eip$$ = h($cpu$$.sreg[REG_CS], 4) + ":" + h($cpu$$.get_real_eip() >>> 0, 8), $ss_esp$$ = h($cpu$$.sreg[REG_SS], 4) + ":" + h($cpu$$.reg32[REG_ES] >>> 0, 8), $op_size$$ = $cpu$$.is_32[0] ? "32" : "16", $if_$$ = $cpu$$.flags[0] & FLAG_INTERRUPT ? 1 : 0, $flag_names$$ = {[FLAG_CARRY]:"c", [FLAG_PARITY]:"p", [FLAG_ADJUST]:"a", [FLAG_ZERO]:"z", [FLAG_SIGN]:"s", 
      [FLAG_TRAP]:"t", [FLAG_INTERRUPT]:"i", [FLAG_DIRECTION]:"d", [FLAG_OVERFLOW]:"o", }, $flag_string$$ = "", $i$$ = 0; 16 > $i$$; $i$$++) {
        $flag_names$$[1 << $i$$] && ($flag_string$$ = $flags$$ & 1 << $i$$ ? $flag_string$$ + $flag_names$$[1 << $i$$] : $flag_string$$ + " ");
      }
      return "mode=" + $mode$$ + "/" + $op_size$$ + " paging=" + +(0 !== ($cpu$$.cr[0] & CR0_PG)) + " pae=" + +(0 !== ($cpu$$.cr[4] & CR4_PAE)) + " iopl=" + $iopl$$ + " cpl=" + $cpl$$ + " if=" + $if_$$ + " cs:eip=" + $cs_eip$$ + " cs_off=" + h($cpu$$.get_seg_cs() >>> 0, 8) + " flgs=" + h($cpu$$.get_eflags() >>> 0, 6) + " (" + $flag_string$$ + ") ss:esp=" + $ss_esp$$ + " ssize=" + +$cpu$$.stack_size_32[0] + ($where$$ ? " in " + $where$$ : "");
    }
  }
  function $get_regs_short$$() {
    if (DEBUG) {
      for (var $r32$$ = {eax:REG_EAX, ecx:REG_ECX, edx:REG_EDX, ebx:REG_EBX, esp:REG_ESP, ebp:REG_EBP, esi:REG_ESI, edi:REG_EDI}, $r32_names$$ = "eax ecx edx ebx esp ebp esi edi".split(" "), $line1$$ = "", $line2$$ = "", $i$$ = 0; 4 > $i$$; $i$$++) {
        $line1$$ += $r32_names$$[$i$$] + "=" + h($cpu$$.reg32[$r32$$[$r32_names$$[$i$$]]] >>> 0, 8) + " ", $line2$$ += $r32_names$$[$i$$ + 4] + "=" + h($cpu$$.reg32[$r32$$[$r32_names$$[$i$$ + 4]]] >>> 0, 8) + " ";
      }
      $line1$$ += "  ds=" + h($cpu$$.sreg[REG_DS], 4) + " es=" + h($cpu$$.sreg[REG_ES], 4) + " fs=" + h($cpu$$.sreg[REG_FS], 4);
      $line2$$ += "  gs=" + h($cpu$$.sreg[REG_GS], 4) + " cs=" + h($cpu$$.sreg[REG_CS], 4) + " ss=" + h($cpu$$.sreg[REG_SS], 4);
      return [$line1$$, $line2$$];
    }
  }
  function $load_page_entry$$($dword_entry$$, $pae$$, $is_directory$$) {
    if (DEBUG) {
      if (!($dword_entry$$ & 1)) {
        return !1;
      }
      var $size$$ = 128 === ($dword_entry$$ & 128);
      return {size:$size$$, global:256 === ($dword_entry$$ & 256), accessed:32 === ($dword_entry$$ & 32), dirty:64 === ($dword_entry$$ & 64), cache_disable:16 === ($dword_entry$$ & 16), user:4 === ($dword_entry$$ & 4), read_write:2 === ($dword_entry$$ & 2), address:($size$$ && !$is_directory$$ ? $dword_entry$$ & ($pae$$ ? 4292870144 : 4290772992) : $dword_entry$$ & 4294963200) >>> 0};
    }
  }
  function $dump_page_directory$$($pd_addr$$, $pae$$, $start$$) {
    if (DEBUG) {
      for (var $n$$ = $pae$$ ? 512 : 1024, $entry_size$$ = $pae$$ ? 8 : 4, $pd_shift$$ = $pae$$ ? 21 : 22, $i$$ = 0; $i$$ < $n$$; $i$$++) {
        var $dword$jscomp$4_flags$$ = $cpu$$.read32s($pd_addr$$ + $i$$ * $entry_size$$), $entry$$ = $load_page_entry$$($dword$jscomp$4_flags$$, $pae$$, !0);
        if ($entry$$) {
          if ($dword$jscomp$4_flags$$ = "", $dword$jscomp$4_flags$$ += $entry$$.size ? "S " : "  ", $dword$jscomp$4_flags$$ += $entry$$.accessed ? "A " : "  ", $dword$jscomp$4_flags$$ += $entry$$.cache_disable ? "Cd " : "  ", $dword$jscomp$4_flags$$ += $entry$$.user ? "U " : "  ", $dword$jscomp$4_flags$$ += $entry$$.read_write ? "Rw " : "   ", $entry$$.size) {
            dbg_log("=== " + h($start$$ + ($i$$ << $pd_shift$$) >>> 0, 8) + " -> " + h($entry$$.address >>> 0, 8) + " | " + $dword$jscomp$4_flags$$);
          } else {
            dbg_log("=== " + h($start$$ + ($i$$ << $pd_shift$$) >>> 0, 8) + " | " + $dword$jscomp$4_flags$$);
            for (var $j$$ = 0; $j$$ < $n$$; $j$$++) {
              var $sub_addr$$ = $entry$$.address + $j$$ * $entry_size$$;
              $dword$jscomp$4_flags$$ = $cpu$$.read32s($sub_addr$$);
              var $subentry$$ = $load_page_entry$$($dword$jscomp$4_flags$$, $pae$$, !1);
              $subentry$$ && ($dword$jscomp$4_flags$$ = "", $dword$jscomp$4_flags$$ += $subentry$$.cache_disable ? "Cd " : "   ", $dword$jscomp$4_flags$$ += $subentry$$.user ? "U " : "  ", $dword$jscomp$4_flags$$ += $subentry$$.read_write ? "Rw " : "   ", $dword$jscomp$4_flags$$ += $subentry$$.global ? "G " : "  ", $dword$jscomp$4_flags$$ += $subentry$$.accessed ? "A " : "  ", $dword$jscomp$4_flags$$ += $subentry$$.dirty ? "Di " : "   ", dbg_log("# " + h($start$$ + ($i$$ << $pd_shift$$ | $j$$ << 
              12) >>> 0, 8) + " -> " + h($subentry$$.address, 8) + " | " + $dword$jscomp$4_flags$$ + "        (at " + h($sub_addr$$, 8) + ")"));
            }
          }
        }
      }
    }
  }
  var $cpu$$ = this, $debug$$ = {};
  this.debug = $debug$$;
  $debug$$.init = function() {
    function $handle$$($out_byte$$) {
      10 === $out_byte$$ ? (dbg_log($seabios_debug$$, LOG_BIOS), $seabios_debug$$ = "") : $seabios_debug$$ += String.fromCharCode($out_byte$$);
    }
    if (DEBUG && $cpu$$.io) {
      var $seabios_debug$$ = "";
      $cpu$$.io.register_write(1026, this, $handle$$);
      $cpu$$.io.register_write(1280, this, $handle$$);
    }
  };
  $debug$$.get_regs_short = $get_regs_short$$;
  $debug$$.dump_regs = function() {
    if (DEBUG) {
      var $lines$$ = $get_regs_short$$();
      dbg_log($lines$$[0], LOG_CPU);
      dbg_log($lines$$[1], LOG_CPU);
    }
  };
  $debug$$.get_state = $get_state$$;
  $debug$$.dump_state = function($where$$) {
    DEBUG && dbg_log($get_state$$($where$$), LOG_CPU);
  };
  $debug$$.dump_stack = function($i$jscomp$75_start$$, $end$$) {
    if (DEBUG) {
      var $esp$$ = $cpu$$.reg32[REG_ESP];
      dbg_log("========= STACK ==========");
      if ($end$$ >= $i$jscomp$75_start$$ || void 0 === $end$$) {
        $i$jscomp$75_start$$ = 5, $end$$ = -5;
      }
      for (; $i$jscomp$75_start$$ > $end$$; $i$jscomp$75_start$$--) {
        var $line$$ = "    ";
        $i$jscomp$75_start$$ || ($line$$ = "=>  ");
        $line$$ += h($i$jscomp$75_start$$, 2) + " | ";
        dbg_log($line$$ + h($esp$$ + 4 * $i$jscomp$75_start$$, 8) + " | " + h($cpu$$.read32s($esp$$ + 4 * $i$jscomp$75_start$$) >>> 0));
      }
    }
  };
  $debug$$.dump_page_structures = function() {
    if ($cpu$$.cr[4] & CR4_PAE) {
      dbg_log("PAE enabled");
      for (var $i$$ = 0; 4 > $i$$; $i$$++) {
        var $dword$$ = $cpu$$.read32s($cpu$$.cr[3] + 8 * $i$$);
        $dword$$ & 1 && $dump_page_directory$$($dword$$ & 4294963200, !0, $i$$ << 30);
      }
    } else {
      dbg_log("PAE disabled"), $dump_page_directory$$($cpu$$.cr[3], !1, 0);
    }
  };
  $debug$$.dump_gdt_ldt = function() {
    function $dump_table$$($addr$$, $size$$) {
      for (var $i$$ = 0; $i$$ < $size$$; $i$$ += 8, $addr$$ += 8) {
        var $base$$ = $cpu$$.read16($addr$$ + 2) | $cpu$$.read8($addr$$ + 4) << 16 | $cpu$$.read8($addr$$ + 7) << 24, $limit$$ = $cpu$$.read16($addr$$) | ($cpu$$.read8($addr$$ + 6) & 15) << 16, $access$$ = $cpu$$.read8($addr$$ + 5), $flags$$ = $cpu$$.read8($addr$$ + 6) >> 4, $flags_str$$ = "", $dpl$$ = $access$$ >> 5 & 3;
        $flags_str$$ = $access$$ & 128 ? $flags_str$$ + " P " : $flags_str$$ + "NP ";
        $access$$ & 16 ? ($flags_str$$ = $flags$$ & 4 ? $flags_str$$ + "32b " : $flags_str$$ + "16b ", $access$$ & 8 ? ($flags_str$$ += "X ", $access$$ & 4 && ($flags_str$$ += "C ")) : $flags_str$$ += "R ", $flags_str$$ += "RW ") : $flags_str$$ += "sys: " + h($access$$ & 15);
        $flags$$ & 8 && ($limit$$ = $limit$$ << 12 | 4095);
        dbg_log(h($i$$ & -8, 4) + " " + h($base$$ >>> 0, 8) + " (" + h($limit$$ >>> 0, 8) + " bytes) " + $flags_str$$ + ";  dpl = " + $dpl$$ + ", a = " + $access$$.toString(2) + ", f = " + $flags$$.toString(2));
      }
    }
    DEBUG && (dbg_log("gdt: (len = " + h($cpu$$.gdtr_size[0]) + ")"), $dump_table$$($cpu$$.translate_address_system_read($cpu$$.gdtr_offset[0]), $cpu$$.gdtr_size[0]), dbg_log("\nldt: (len = " + h($cpu$$.segment_limits[REG_LDTR]) + ")"), $dump_table$$($cpu$$.translate_address_system_read($cpu$$.segment_offsets[REG_LDTR]), $cpu$$.segment_limits[REG_LDTR]));
  };
  $debug$$.dump_idt = function() {
    if (DEBUG) {
      for (var $i$$ = 0; $i$$ < $cpu$$.idtr_size[0]; $i$$ += 8) {
        var $addr$jscomp$53_type$$ = $cpu$$.translate_address_system_read($cpu$$.idtr_offset[0] + $i$$), $base$$ = $cpu$$.read16($addr$jscomp$53_type$$) | $cpu$$.read16($addr$jscomp$53_type$$ + 6) << 16, $selector$$ = $cpu$$.read16($addr$jscomp$53_type$$ + 2);
        $addr$jscomp$53_type$$ = $cpu$$.read8($addr$jscomp$53_type$$ + 5);
        var $dpl$$ = $addr$jscomp$53_type$$ >> 5 & 3;
        var $line$$ = 5 === ($addr$jscomp$53_type$$ & 31) ? "task gate " : 14 === ($addr$jscomp$53_type$$ & 31) ? "intr gate " : 15 === ($addr$jscomp$53_type$$ & 31) ? "trap gate " : "invalid   ";
        $line$$ = $addr$jscomp$53_type$$ & 128 ? $line$$ + " P" : $line$$ + "NP";
        dbg_log(h($i$$ >> 3, 4) + " " + h($base$$ >>> 0, 8) + ", " + h($selector$$, 4) + "; " + $line$$ + ";  dpl = " + $dpl$$ + ", t = " + $addr$jscomp$53_type$$.toString(2));
      }
    }
  };
  $debug$$.get_memory_dump = function($start$$, $count$$) {
    if (DEBUG) {
      return void 0 === $start$$ ? ($start$$ = 0, $count$$ = $cpu$$.memory_size[0]) : void 0 === $count$$ && ($count$$ = $start$$, $start$$ = 0), $cpu$$.mem8.slice($start$$, $start$$ + $count$$).buffer;
    }
  };
  $debug$$.memory_hex_dump = function($addr$$, $length$$) {
    if (DEBUG) {
      $length$$ = $length$$ || 64;
      for (var $line$$, $byt$$, $i$$ = 0; $i$$ < $length$$ >> 4; $i$$++) {
        $line$$ = h($addr$$ + ($i$$ << 4), 5) + "   ";
        for (var $j$$ = 0; 16 > $j$$; $j$$++) {
          $byt$$ = $cpu$$.read8($addr$$ + ($i$$ << 4) + $j$$), $line$$ += h($byt$$, 2) + " ";
        }
        $line$$ += "  ";
        for ($j$$ = 0; 16 > $j$$; $j$$++) {
          $byt$$ = $cpu$$.read8($addr$$ + ($i$$ << 4) + $j$$), $line$$ += 33 > $byt$$ || 126 < $byt$$ ? "." : String.fromCharCode($byt$$);
        }
        dbg_log($line$$);
      }
    }
  };
  $debug$$.used_memory_dump = function() {
    if (DEBUG) {
      for (var $block_size$$ = $cpu$$.memory_size[0] / 128 / 16 | 0, $row$$, $i$$ = 0; 16 > $i$$; $i$$++) {
        $row$$ = h(128 * $i$$ * $block_size$$, 8) + " | ";
        for (var $j$$ = 0; 128 > $j$$; $j$$++) {
          $row$$ += 0 < $cpu$$.mem32s[(128 * $i$$ + $j$$) * $block_size$$] ? "X" : " ";
        }
        dbg_log($row$$);
      }
    }
  };
  $debug$$.debug_interrupt = function($interrupt_nr$$) {
  };
  let $cs$$, $capstone_decoder$$;
  $debug$$.dump_code = function($is_32$$, $buffer$$, $start$$) {
    if (!$capstone_decoder$$) {
      if (void 0 === $cs$$ && ($cs$$ = "function" === typeof require ? require("./capstone-x86.min.js") : window.cs, void 0 === $cs$$)) {
        dbg_log("Warning: Missing capstone library, disassembly not available");
        return;
      }
      $capstone_decoder$$ = [new $cs$$.Capstone($cs$$.ARCH_X86, $cs$$.MODE_16), new $cs$$.Capstone($cs$$.ARCH_X86, $cs$$.MODE_32), ];
    }
    try {
      $capstone_decoder$$[$is_32$$].disasm($buffer$$, $start$$).forEach(function($instr$$) {
        dbg_log(h($instr$$.address >>> 0) + ": " + v86util.pads($instr$$.bytes.map($x$$ => h($x$$, 2).slice(-2)).join(" "), 20) + " " + $instr$$.mnemonic + " " + $instr$$.op_str);
      }), dbg_log("");
    } catch ($e$$) {
      dbg_log("Could not disassemble: " + Array.from($buffer$$).map($x$$ => h($x$$, 2)).join(" "));
    }
  };
  let $wabt$$;
  $debug$$.dump_wasm = function($buffer$$) {
    if (void 0 === $wabt$$ && ($wabt$$ = "function" === typeof require ? require("./libwabt.js") : new window.WabtModule, void 0 === $wabt$$)) {
      dbg_log("Warning: Missing libwabt, wasm dump not available");
      return;
    }
    $buffer$$ = $buffer$$.slice();
    try {
      var $module$$ = $wabt$$.readWasm($buffer$$, {readDebugNames:!1});
      $module$$.generateNames();
      $module$$.applyNames();
      const $result$$ = $module$$.toText({foldExprs:!0, inlineExport:!0});
      dbg_log($result$$);
    } catch ($e$$) {
      var $blob$$ = new Blob([$buffer$$]), $a$$ = document.createElement("a");
      $a$$.download = "failed.wasm";
      $a$$.href = window.URL.createObjectURL($blob$$);
      $a$$.dataset.downloadurl = ["application/octet-stream", $a$$.download, $a$$.href].join(":");
      $a$$.click();
      window.URL.revokeObjectURL($a$$.src);
      console.log($e$$.toString());
    } finally {
      $module$$ && $module$$.destroy();
    }
  };
};
const ELF_MAGIC = 1179403647;
let types = DataView.prototype, U8 = {size:1, get:types.getUint8, set:types.setUint8, }, U16 = {size:2, get:types.getUint16, set:types.setUint16, }, U32 = {size:4, get:types.getUint32, set:types.setUint32, }, pad = function($size$$) {
  return {size:$size$$, get:$offset$$ => -1, };
}, Header = create_struct([{magic:U32, }, {class:U8, }, {data:U8, }, {version0:U8, }, {osabi:U8, }, {abiversion:U8, }, {pad0:pad(7)}, {type:U16, }, {machine:U16, }, {version1:U32, }, {entry:U32, }, {phoff:U32, }, {shoff:U32, }, {flags:U32, }, {ehsize:U16, }, {phentsize:U16, }, {phnum:U16, }, {shentsize:U16, }, {shnum:U16, }, {shstrndx:U16, }, ]);
console.assert(52 === Header.reduce(($a$$, $entry$$) => $a$$ + $entry$$.size, 0));
let ProgramHeader = create_struct([{type:U32, }, {offset:U32, }, {vaddr:U32, }, {paddr:U32, }, {filesz:U32, }, {memsz:U32, }, {flags:U32, }, {align:U32, }, ]);
console.assert(32 === ProgramHeader.reduce(($a$$, $entry$$) => $a$$ + $entry$$.size, 0));
let SectionHeader = create_struct([{name:U32, }, {type:U32, }, {flags:U32, }, {addr:U32, }, {offset:U32, }, {size:U32, }, {link:U32, }, {info:U32, }, {addralign:U32, }, {entsize:U32, }, ]);
console.assert(40 === SectionHeader.reduce(($a$$, $entry$$) => $a$$ + $entry$$.size, 0));
function create_struct($struct$$) {
  return $struct$$.map(function($entry$jscomp$11_type$$) {
    var $keys_name$$ = Object.keys($entry$jscomp$11_type$$);
    console.assert(1 === $keys_name$$.length);
    $keys_name$$ = $keys_name$$[0];
    $entry$jscomp$11_type$$ = $entry$jscomp$11_type$$[$keys_name$$];
    console.assert(0 < $entry$jscomp$11_type$$.size);
    return {name:$keys_name$$, type:$entry$jscomp$11_type$$, size:$entry$jscomp$11_type$$.size, get:$entry$jscomp$11_type$$.get, set:$entry$jscomp$11_type$$.set, };
  });
}
function read_elf($buffer$jscomp$44_sections_headers_view$$) {
  $buffer$jscomp$44_sections_headers_view$$ = new DataView($buffer$jscomp$44_sections_headers_view$$);
  let [$header$$, $offset$$] = read_struct($buffer$jscomp$44_sections_headers_view$$, Header);
  console.assert(52 === $offset$$);
  if (DEBUG) {
    for ($key$$ of Object.keys($header$$)) {
      dbg_log($key$$ + ": 0x" + ($header$$[$key$$].toString(16) >>> 0));
    }
  }
  console.assert($header$$.magic === ELF_MAGIC, "Bad magic");
  console.assert(1 === $header$$.class, "Unimplemented: 64 bit elf");
  console.assert(1 === $header$$.data, "Unimplemented: big endian");
  console.assert(1 === $header$$.version0, "Bad version0");
  console.assert(2 === $header$$.type, "Unimplemented type");
  console.assert(1 === $header$$.version1, "Bad version1");
  console.assert(52 === $header$$.ehsize, "Bad header size");
  console.assert(32 === $header$$.phentsize, "Bad program header size");
  console.assert(40 === $header$$.shentsize, "Bad section header size");
  var [$key$$] = read_structs(view_slice($buffer$jscomp$44_sections_headers_view$$, $header$$.phoff, $header$$.phentsize * $header$$.phnum), ProgramHeader, $header$$.phnum);
  [$buffer$jscomp$44_sections_headers_view$$] = read_structs(view_slice($buffer$jscomp$44_sections_headers_view$$, $header$$.shoff, $header$$.shentsize * $header$$.shnum), SectionHeader, $header$$.shnum);
  if (DEBUG && LOG_LEVEL) {
    console.log("%d program headers:", $key$$.length);
    for (let $program$$ of $key$$) {
      console.log("type=%s offset=%s vaddr=%s paddr=%s filesz=%s memsz=%s flags=%s align=%s", $program$$.type.toString(16), $program$$.offset.toString(16), $program$$.vaddr.toString(16), $program$$.paddr.toString(16), $program$$.filesz.toString(16), $program$$.memsz.toString(16), $program$$.flags.toString(16), $program$$.align.toString(16));
    }
    console.log("%d program headers:", $buffer$jscomp$44_sections_headers_view$$.length);
    for (let $section$$ of $buffer$jscomp$44_sections_headers_view$$) {
      console.log("name=%s type=%s flags=%s addr=%s offset=%s size=%s link=%s info=%s addralign=%s entsize=%s", $section$$.name.toString(16), $section$$.type.toString(16), $section$$.flags.toString(16), $section$$.addr.toString(16), $section$$.offset.toString(16), $section$$.size.toString(16), $section$$.link.toString(16), $section$$.info.toString(16), $section$$.addralign.toString(16), $section$$.entsize.toString(16));
    }
  }
  return {header:$header$$, program_headers:$key$$, sections_headers:$buffer$jscomp$44_sections_headers_view$$, };
}
function read_struct($view$$, $Struct_value$$) {
  let $result$$ = {}, $offset$$ = 0;
  for (let $entry$$ of $Struct_value$$) {
    $Struct_value$$ = $entry$$.get.call($view$$, $offset$$, !0), console.assert(void 0 === $result$$[$entry$$.name]), $result$$[$entry$$.name] = $Struct_value$$, $offset$$ += $entry$$.size;
  }
  return [$result$$, $offset$$];
}
function read_structs($view$$, $Struct$$, $count$$) {
  let $result$$ = [], $offset$$ = 0;
  for (var $i$$ = 0; $i$$ < $count$$; $i$$++) {
    let [$s$$, $size$$] = read_struct(view_slice($view$$, $offset$$), $Struct$$);
    $result$$.push($s$$);
    $offset$$ += $size$$;
  }
  return [$result$$, $offset$$];
}
function view_slice($view$$, $offset$$, $length$$) {
  return new DataView($view$$.buffer, $view$$.byteOffset + $offset$$, $length$$);
}
;const LINUX_BOOT_HDR_SETUP_SECTS = 497, LINUX_BOOT_HDR_SYSSIZE = 500, LINUX_BOOT_HDR_VIDMODE = 506, LINUX_BOOT_HDR_BOOT_FLAG = 510, LINUX_BOOT_HDR_HEADER = 514, LINUX_BOOT_HDR_VERSION = 518, LINUX_BOOT_HDR_TYPE_OF_LOADER = 528, LINUX_BOOT_HDR_LOADFLAGS = 529, LINUX_BOOT_HDR_CODE32_START = 532, LINUX_BOOT_HDR_RAMDISK_IMAGE = 536, LINUX_BOOT_HDR_RAMDISK_SIZE = 540, LINUX_BOOT_HDR_HEAP_END_PTR = 548, LINUX_BOOT_HDR_CMD_LINE_PTR = 552, LINUX_BOOT_HDR_INITRD_ADDR_MAX = 556, LINUX_BOOT_HDR_KERNEL_ALIGNMENT = 
560, LINUX_BOOT_HDR_RELOCATABLE_KERNEL = 564, LINUX_BOOT_HDR_MIN_ALIGNMENT = 565, LINUX_BOOT_HDR_XLOADFLAGS = 566, LINUX_BOOT_HDR_CMDLINE_SIZE = 568, LINUX_BOOT_HDR_PAYLOAD_OFFSET = 584, LINUX_BOOT_HDR_PAYLOAD_LENGTH = 588, LINUX_BOOT_HDR_PREF_ADDRESS = 600, LINUX_BOOT_HDR_INIT_SIZE = 608, LINUX_BOOT_HDR_CHECKSUM1 = 43605, LINUX_BOOT_HDR_CHECKSUM2 = 1400005704, LINUX_BOOT_HDR_TYPE_OF_LOADER_NOT_ASSIGNED = 255, LINUX_BOOT_HDR_LOADFLAGS_LOADED_HIGH = 1, LINUX_BOOT_HDR_LOADFLAGS_QUIET_FLAG = 32, LINUX_BOOT_HDR_LOADFLAGS_KEEP_SEGMENTS = 
64, LINUX_BOOT_HDR_LOADFLAGS_CAN_USE_HEAPS = 128;
function load_kernel($mem8$$, $bzimage_protected_mode_kernel$$, $initrd$$, $cmdline_real_mode_kernel$$) {
  dbg_log("Trying to load kernel of size " + $bzimage_protected_mode_kernel$$.byteLength);
  var $bzimage8_i$$ = new Uint8Array($bzimage_protected_mode_kernel$$);
  const $bzimage16$$ = new Uint16Array($bzimage_protected_mode_kernel$$), $bzimage32$$ = new Uint32Array($bzimage_protected_mode_kernel$$);
  var $prot_mode_kernel_start_ramdisk_address_setup_sects$$ = $bzimage8_i$$[LINUX_BOOT_HDR_SETUP_SECTS] || 4, $checksum1_checksum2_protocol$$ = $bzimage16$$[LINUX_BOOT_HDR_BOOT_FLAG >> 1];
  if ($checksum1_checksum2_protocol$$ !== LINUX_BOOT_HDR_CHECKSUM1) {
    dbg_log("Bad checksum1: " + h($checksum1_checksum2_protocol$$));
  } else {
    if ($checksum1_checksum2_protocol$$ = $bzimage16$$[LINUX_BOOT_HDR_HEADER >> 1] | $bzimage16$$[LINUX_BOOT_HDR_HEADER + 2 >> 1] << 16, $checksum1_checksum2_protocol$$ !== LINUX_BOOT_HDR_CHECKSUM2) {
      dbg_log("Bad checksum2: " + h($checksum1_checksum2_protocol$$));
    } else {
      $checksum1_checksum2_protocol$$ = $bzimage16$$[LINUX_BOOT_HDR_VERSION >> 1];
      dbg_assert(514 <= $checksum1_checksum2_protocol$$);
      var $flags$$ = $bzimage8_i$$[LINUX_BOOT_HDR_LOADFLAGS];
      dbg_assert($flags$$ & LINUX_BOOT_HDR_LOADFLAGS_LOADED_HIGH);
      var $flags2$$ = $bzimage16$$[LINUX_BOOT_HDR_XLOADFLAGS >> 1], $initrd_addr_max$$ = $bzimage32$$[LINUX_BOOT_HDR_INITRD_ADDR_MAX >> 2], $kernel_alignment$$ = $bzimage32$$[LINUX_BOOT_HDR_KERNEL_ALIGNMENT >> 2], $relocatable_kernel$$ = $bzimage8_i$$[LINUX_BOOT_HDR_RELOCATABLE_KERNEL], $min_alignment$$ = $bzimage8_i$$[LINUX_BOOT_HDR_MIN_ALIGNMENT], $cmdline_size$$ = $bzimage32$$[LINUX_BOOT_HDR_CMDLINE_SIZE >> 2], $payload_offset$$ = $bzimage32$$[LINUX_BOOT_HDR_PAYLOAD_OFFSET >> 2], $payload_length$$ = 
      $bzimage32$$[LINUX_BOOT_HDR_PAYLOAD_LENGTH >> 2], $pref_address$$ = $bzimage32$$[LINUX_BOOT_HDR_PREF_ADDRESS >> 2], $pref_address_high$$ = $bzimage32$$[LINUX_BOOT_HDR_PREF_ADDRESS + 4 >> 2], $init_size$$ = $bzimage32$$[LINUX_BOOT_HDR_INIT_SIZE >> 2];
      dbg_log("kernel boot protocol version: " + h($checksum1_checksum2_protocol$$));
      dbg_log("flags=" + h($flags$$) + " xflags=" + h($flags2$$));
      dbg_log("code32_start=" + h($bzimage32$$[LINUX_BOOT_HDR_CODE32_START >> 2]));
      dbg_log("initrd_addr_max=" + h($initrd_addr_max$$));
      dbg_log("kernel_alignment=" + h($kernel_alignment$$));
      dbg_log("relocatable=" + $relocatable_kernel$$);
      dbg_log("min_alignment=" + h($min_alignment$$));
      dbg_log("cmdline max=" + h($cmdline_size$$));
      dbg_log("payload offset=" + h($payload_offset$$) + " size=" + h($payload_length$$));
      dbg_log("pref_address=" + h($pref_address_high$$) + ":" + h($pref_address$$));
      dbg_log("init_size=" + h($init_size$$));
      $bzimage8_i$$[LINUX_BOOT_HDR_TYPE_OF_LOADER] = LINUX_BOOT_HDR_TYPE_OF_LOADER_NOT_ASSIGNED;
      $bzimage8_i$$[LINUX_BOOT_HDR_LOADFLAGS] = $flags$$ & ~LINUX_BOOT_HDR_LOADFLAGS_QUIET_FLAG & ~LINUX_BOOT_HDR_LOADFLAGS_KEEP_SEGMENTS | LINUX_BOOT_HDR_LOADFLAGS_CAN_USE_HEAPS;
      $bzimage16$$[LINUX_BOOT_HDR_HEAP_END_PTR >> 1] = 56832;
      $bzimage16$$[LINUX_BOOT_HDR_VIDMODE >> 1] = 65535;
      dbg_log("heap_end_ptr=" + h(56832));
      $cmdline_real_mode_kernel$$ += "\x00";
      dbg_assert($cmdline_real_mode_kernel$$.length < $cmdline_size$$);
      dbg_log("cmd_line_ptr=" + h(581632));
      $bzimage32$$[LINUX_BOOT_HDR_CMD_LINE_PTR >> 2] = 581632;
      for ($bzimage8_i$$ = 0; $bzimage8_i$$ < $cmdline_real_mode_kernel$$.length; $bzimage8_i$$++) {
        $mem8$$[581632 + $bzimage8_i$$] = $cmdline_real_mode_kernel$$.charCodeAt($bzimage8_i$$);
      }
      $prot_mode_kernel_start_ramdisk_address_setup_sects$$ = 512 * ($prot_mode_kernel_start_ramdisk_address_setup_sects$$ + 1);
      dbg_log("prot_mode_kernel_start=" + h($prot_mode_kernel_start_ramdisk_address_setup_sects$$));
      $cmdline_real_mode_kernel$$ = new Uint8Array($bzimage_protected_mode_kernel$$, 0, $prot_mode_kernel_start_ramdisk_address_setup_sects$$);
      $bzimage_protected_mode_kernel$$ = new Uint8Array($bzimage_protected_mode_kernel$$, $prot_mode_kernel_start_ramdisk_address_setup_sects$$);
      $bzimage8_i$$ = $prot_mode_kernel_start_ramdisk_address_setup_sects$$ = 0;
      $initrd$$ && ($prot_mode_kernel_start_ramdisk_address_setup_sects$$ = 67108864, $bzimage8_i$$ = $initrd$$.byteLength, dbg_assert(1048576 + $bzimage_protected_mode_kernel$$.length < $prot_mode_kernel_start_ramdisk_address_setup_sects$$), $mem8$$.set(new Uint8Array($initrd$$), $prot_mode_kernel_start_ramdisk_address_setup_sects$$));
      $bzimage32$$[LINUX_BOOT_HDR_RAMDISK_IMAGE >> 2] = $prot_mode_kernel_start_ramdisk_address_setup_sects$$;
      $bzimage32$$[LINUX_BOOT_HDR_RAMDISK_SIZE >> 2] = $bzimage8_i$$;
      dbg_assert(655360 > 524288 + $cmdline_real_mode_kernel$$.length);
      $mem8$$.set($cmdline_real_mode_kernel$$, 524288);
      $mem8$$.set($bzimage_protected_mode_kernel$$, 1048576);
      return {option_rom:{name:"genroms/kernel.bin", data:make_linux_boot_rom(32768, 57344), }};
    }
  }
}
function make_linux_boot_rom($checksum_index_real_mode_segment$$, $checksum$jscomp$3_heap_end$$) {
  const $data8$$ = new Uint8Array(256);
  (new Uint16Array($data8$$.buffer))[0] = 43605;
  $data8$$[2] = 1;
  var $i$jscomp$86_i$$ = 3;
  $data8$$[$i$jscomp$86_i$$++] = 250;
  $data8$$[$i$jscomp$86_i$$++] = 184;
  $data8$$[$i$jscomp$86_i$$++] = $checksum_index_real_mode_segment$$ >> 0;
  $data8$$[$i$jscomp$86_i$$++] = $checksum_index_real_mode_segment$$ >> 8;
  $data8$$[$i$jscomp$86_i$$++] = 142;
  $data8$$[$i$jscomp$86_i$$++] = 192;
  $data8$$[$i$jscomp$86_i$$++] = 142;
  $data8$$[$i$jscomp$86_i$$++] = 216;
  $data8$$[$i$jscomp$86_i$$++] = 142;
  $data8$$[$i$jscomp$86_i$$++] = 224;
  $data8$$[$i$jscomp$86_i$$++] = 142;
  $data8$$[$i$jscomp$86_i$$++] = 232;
  $data8$$[$i$jscomp$86_i$$++] = 142;
  $data8$$[$i$jscomp$86_i$$++] = 208;
  $data8$$[$i$jscomp$86_i$$++] = 188;
  $data8$$[$i$jscomp$86_i$$++] = $checksum$jscomp$3_heap_end$$ >> 0;
  $data8$$[$i$jscomp$86_i$$++] = $checksum$jscomp$3_heap_end$$ >> 8;
  $data8$$[$i$jscomp$86_i$$++] = 234;
  $data8$$[$i$jscomp$86_i$$++] = 0;
  $data8$$[$i$jscomp$86_i$$++] = 0;
  $data8$$[$i$jscomp$86_i$$++] = $checksum_index_real_mode_segment$$ + 32 >> 0;
  $data8$$[$i$jscomp$86_i$$++] = $checksum_index_real_mode_segment$$ + 32 >> 8;
  dbg_assert(512 > $i$jscomp$86_i$$);
  $checksum_index_real_mode_segment$$ = $i$jscomp$86_i$$;
  $checksum$jscomp$3_heap_end$$ = $data8$$[$checksum_index_real_mode_segment$$] = 0;
  for ($i$jscomp$86_i$$ = 0; $i$jscomp$86_i$$ < $data8$$.length; $i$jscomp$86_i$$++) {
    $checksum$jscomp$3_heap_end$$ += $data8$$[$i$jscomp$86_i$$];
  }
  $data8$$[$checksum_index_real_mode_segment$$] = -$checksum$jscomp$3_heap_end$$;
  return $data8$$;
}
;var SHIFT_SCAN_CODE = 42, SCAN_CODE_RELEASE = 128;
function KeyboardAdapter($bus$$) {
  function $keyup_handler$$($e$$) {
    !$e$$.altKey && $keys_pressed$$[56] && $handle_code$$(56, !1);
    return $handler$$($e$$, !1);
  }
  function $keydown_handler$$($e$$) {
    !$e$$.altKey && $keys_pressed$$[56] && $handle_code$$(56, !1);
    return $handler$$($e$$, !0);
  }
  function $blur_handler$$($e$jscomp$22_keys$$) {
    $e$jscomp$22_keys$$ = Object.keys($keys_pressed$$);
    for (var $key$$, $i$$ = 0; $i$$ < $e$jscomp$22_keys$$.length; $i$$++) {
      $key$$ = +$e$jscomp$22_keys$$[$i$$], $keys_pressed$$[$key$$] && $handle_code$$($key$$, !1);
    }
    $keys_pressed$$ = {};
  }
  function $handler$$($e$$, $keydown$$) {
    var $JSCompiler_temp$jscomp$13_code$jscomp$7_code$$;
    if ($JSCompiler_temp$jscomp$13_code$jscomp$7_code$$ = $keyboard$$.bus) {
      $JSCompiler_temp$jscomp$13_code$jscomp$7_code$$ = $e$$.shiftKey && $e$$.ctrlKey && (73 === $e$$.keyCode || 74 === $e$$.keyCode || 75 === $e$$.keyCode) || !$keyboard$$.emu_enabled ? !1 : $e$$.target ? $e$$.target.classList.contains("phone_keyboard") || "INPUT" !== $e$$.target.nodeName && "TEXTAREA" !== $e$$.target.nodeName : !0;
    }
    if ($JSCompiler_temp$jscomp$13_code$jscomp$7_code$$) {
      a: {
        if (void 0 !== $e$$.code && ($JSCompiler_temp$jscomp$13_code$jscomp$7_code$$ = $codemap$$[$e$$.code], void 0 !== $JSCompiler_temp$jscomp$13_code$jscomp$7_code$$)) {
          break a;
        }
        $JSCompiler_temp$jscomp$13_code$jscomp$7_code$$ = $charmap$$[$e$$.keyCode];
      }
      if ($JSCompiler_temp$jscomp$13_code$jscomp$7_code$$) {
        return $handle_code$$($JSCompiler_temp$jscomp$13_code$jscomp$7_code$$, $keydown$$, $e$$.repeat), $e$$.preventDefault && $e$$.preventDefault(), !1;
      }
      console.log("Missing char in map: keyCode=" + ($e$$.keyCode || -1).toString(16) + " code=" + $e$$.code);
    }
  }
  function $handle_code$$($code$$, $keydown$$, $is_repeat$$) {
    if ($keydown$$) {
      $keys_pressed$$[$code$$] && !$is_repeat$$ && $handle_code$$($code$$, !1);
    } else {
      if (!$keys_pressed$$[$code$$]) {
        return;
      }
    }
    ($keys_pressed$$[$code$$] = $keydown$$) || ($code$$ |= 128);
    255 < $code$$ ? ($send_to_controller$$($code$$ >> 8), $send_to_controller$$($code$$ & 255)) : $send_to_controller$$($code$$);
  }
  function $send_to_controller$$($code$$) {
    $keyboard$$.bus.send("keyboard-code", $code$$);
  }
  var $keys_pressed$$ = {}, $keyboard$$ = this;
  this.emu_enabled = !0;
  var $charmap$$ = new Uint16Array([0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0, 28, 0, 0, 42, 29, 56, 0, 58, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 57, 57417, 57425, 57423, 57415, 57419, 57416, 57421, 80, 0, 0, 0, 0, 82, 83, 0, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 39, 0, 13, 0, 0, 0, 30, 48, 46, 32, 18, 33, 34, 35, 23, 36, 37, 38, 50, 49, 24, 25, 16, 19, 31, 20, 22, 47, 17, 45, 21, 44, 57435, 57436, 57437, 0, 0, 82, 79, 80, 81, 75, 76, 77, 71, 72, 73, 0, 0, 0, 0, 0, 0, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 
  87, 88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 13, 51, 12, 52, 53, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 43, 27, 40, 0, 57435, 57400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]), $asciimap$$ = {8:8, 10:13, 32:32, 39:222, 44:188, 45:189, 46:190, 47:191, 48:48, 49:49, 50:50, 51:51, 52:52, 53:53, 54:54, 
  55:55, 56:56, 57:57, 59:186, 61:187, 91:219, 92:220, 93:221, 96:192, 97:65, 98:66, 99:67, 100:68, 101:69, 102:70, 103:71, 104:72, 105:73, 106:74, 107:75, 108:76, 109:77, 110:78, 111:79, 112:80, 113:81, 114:82, 115:83, 116:84, 117:85, 118:86, 119:87, 120:88, 121:89, 122:90}, $asciimap_shift$$ = {33:49, 34:222, 35:51, 36:52, 37:53, 38:55, 40:57, 41:48, 42:56, 43:187, 58:186, 60:188, 62:190, 63:191, 64:50, 65:65, 66:66, 67:67, 68:68, 69:69, 70:70, 71:71, 72:72, 73:73, 74:74, 75:75, 76:76, 77:77, 78:78, 
  79:79, 80:80, 81:81, 82:82, 83:83, 84:84, 85:85, 86:86, 87:87, 88:88, 89:89, 90:90, 94:54, 95:189, 123:219, 124:220, 125:221, 126:192}, $codemap$$ = {Escape:1, Digit1:2, Digit2:3, Digit3:4, Digit4:5, Digit5:6, Digit6:7, Digit7:8, Digit8:9, Digit9:10, Digit0:11, Minus:12, Equal:13, Backspace:14, Tab:15, KeyQ:16, KeyW:17, KeyE:18, KeyR:19, KeyT:20, KeyY:21, KeyU:22, KeyI:23, KeyO:24, KeyP:25, BracketLeft:26, BracketRight:27, Enter:28, ControlLeft:29, KeyA:30, KeyS:31, KeyD:32, KeyF:33, KeyG:34, KeyH:35, 
  KeyJ:36, KeyK:37, KeyL:38, Semicolon:39, Quote:40, Backquote:41, ShiftLeft:42, Backslash:43, KeyZ:44, KeyX:45, KeyC:46, KeyV:47, KeyB:48, KeyN:49, KeyM:50, Comma:51, Period:52, Slash:53, ShiftRight:54, NumpadMultiply:55, AltLeft:56, Space:57, CapsLock:58, F1:59, F2:60, F3:61, F4:62, F5:63, F6:64, F7:65, F8:66, F9:67, F10:68, NumLock:69, ScrollLock:70, Numpad7:71, Numpad8:72, Numpad9:73, NumpadSubtract:74, Numpad4:75, Numpad5:76, Numpad6:77, NumpadAdd:78, Numpad1:79, Numpad2:80, Numpad3:81, Numpad0:82, 
  NumpadDecimal:83, IntlBackslash:86, F11:87, F12:88, NumpadEnter:57372, ControlRight:57373, NumpadDivide:57397, AltRight:57400, Home:57415, ArrowUp:57416, PageUp:57417, ArrowLeft:57419, ArrowRight:57421, End:57423, ArrowDown:57424, PageDown:57425, Insert:57426, Delete:57427, OSLeft:57435, OSRight:57436, ContextMenu:57437, };
  this.bus = $bus$$;
  this.destroy = function() {
    "undefined" !== typeof window && (window.removeEventListener("keyup", $keyup_handler$$, !1), window.removeEventListener("keydown", $keydown_handler$$, !1), window.removeEventListener("blur", $blur_handler$$, !1));
  };
  this.init = function() {
    "undefined" !== typeof window && (this.destroy(), window.addEventListener("keyup", $keyup_handler$$, !1), window.addEventListener("keydown", $keydown_handler$$, !1), window.addEventListener("blur", $blur_handler$$, !1));
  };
  this.init();
  this.simulate_press = function($code$jscomp$4_ev$$) {
    $code$jscomp$4_ev$$ = {keyCode:$code$jscomp$4_ev$$};
    $handler$$($code$jscomp$4_ev$$, !0);
    $handler$$($code$jscomp$4_ev$$, !1);
  };
  this.simulate_char = function($chr$$) {
    var $code$$ = $chr$$.charCodeAt(0);
    $code$$ in $asciimap$$ ? this.simulate_press($asciimap$$[$code$$]) : $code$$ in $asciimap_shift$$ ? ($send_to_controller$$(SHIFT_SCAN_CODE), this.simulate_press($asciimap_shift$$[$code$$]), $send_to_controller$$(SHIFT_SCAN_CODE | SCAN_CODE_RELEASE)) : console.log("ascii -> keyCode not found: ", $code$$, $chr$$);
  };
}
;function MouseAdapter($bus$$, $screen_container$$) {
  function $may_handle$$($child$jscomp$inline_18_e$$) {
    if (!$mouse$$.enabled || !$mouse$$.emu_enabled) {
      return !1;
    }
    var $parent$$ = $screen_container$$ || document.body, $JSCompiler_temp$$;
    if (!($JSCompiler_temp$$ = document.pointerLockElement)) {
      a: {
        for ($child$jscomp$inline_18_e$$ = $child$jscomp$inline_18_e$$.target; $child$jscomp$inline_18_e$$.parentNode;) {
          if ($child$jscomp$inline_18_e$$ === $parent$$) {
            $JSCompiler_temp$$ = !0;
            break a;
          }
          $child$jscomp$inline_18_e$$ = $child$jscomp$inline_18_e$$.parentNode;
        }
        $JSCompiler_temp$$ = !1;
      }
    }
    return $JSCompiler_temp$$;
  }
  function $touch_start_handler$$($e$jscomp$25_touch_touches$$) {
    $may_handle$$($e$jscomp$25_touch_touches$$) && ($e$jscomp$25_touch_touches$$ = $e$jscomp$25_touch_touches$$.changedTouches) && $e$jscomp$25_touch_touches$$.length && ($e$jscomp$25_touch_touches$$ = $e$jscomp$25_touch_touches$$[$e$jscomp$25_touch_touches$$.length - 1], $last_x$$ = $e$jscomp$25_touch_touches$$.clientX, $last_y$$ = $e$jscomp$25_touch_touches$$.clientY);
  }
  function $touch_end_handler$$($e$$) {
    if ($left_down$$ || $middle_down$$ || $right_down$$) {
      $mouse$$.bus.send("mouse-click", [!1, !1, !1]), $left_down$$ = $middle_down$$ = $right_down$$ = !1;
    }
  }
  function $mousemove_handler$$($e$$) {
    if ($mouse$$.bus && $may_handle$$($e$$) && $mouse$$.is_running) {
      var $delta_x$$ = 0, $delta_y$$ = 0, $touch$jscomp$1_touches$$ = $e$$.changedTouches;
      $touch$jscomp$1_touches$$ ? $touch$jscomp$1_touches$$.length && ($touch$jscomp$1_touches$$ = $touch$jscomp$1_touches$$[$touch$jscomp$1_touches$$.length - 1], $delta_x$$ = $touch$jscomp$1_touches$$.clientX - $last_x$$, $delta_y$$ = $touch$jscomp$1_touches$$.clientY - $last_y$$, $last_x$$ = $touch$jscomp$1_touches$$.clientX, $last_y$$ = $touch$jscomp$1_touches$$.clientY, $e$$.preventDefault()) : "number" === typeof $e$$.movementX ? ($delta_x$$ = $e$$.movementX, $delta_y$$ = $e$$.movementY) : 
      "number" === typeof $e$$.webkitMovementX ? ($delta_x$$ = $e$$.webkitMovementX, $delta_y$$ = $e$$.webkitMovementY) : "number" === typeof $e$$.mozMovementX ? ($delta_x$$ = $e$$.mozMovementX, $delta_y$$ = $e$$.mozMovementY) : ($delta_x$$ = $e$$.clientX - $last_x$$, $delta_y$$ = $e$$.clientY - $last_y$$, $last_x$$ = $e$$.clientX, $last_y$$ = $e$$.clientY);
      $mouse$$.bus.send("mouse-delta", [0.15 * $delta_x$$, -(0.15 * $delta_y$$)]);
      $screen_container$$ && $mouse$$.bus.send("mouse-absolute", [$e$$.pageX - $screen_container$$.offsetLeft, $e$$.pageY - $screen_container$$.offsetTop, $screen_container$$.offsetWidth, $screen_container$$.offsetHeight]);
    }
  }
  function $mousedown_handler$$($e$$) {
    $may_handle$$($e$$) && $click_event$$($e$$, !0);
  }
  function $mouseup_handler$$($e$$) {
    $may_handle$$($e$$) && $click_event$$($e$$, !1);
  }
  function $click_event$$($e$$, $down$$) {
    $mouse$$.bus && (1 === $e$$.which ? $left_down$$ = $down$$ : 2 === $e$$.which ? $middle_down$$ = $down$$ : 3 === $e$$.which ? $right_down$$ = $down$$ : dbg_log("Unknown event.which: " + $e$$.which), $mouse$$.bus.send("mouse-click", [$left_down$$, $middle_down$$, $right_down$$]), $e$$.preventDefault());
  }
  function $mousewheel_handler$$($e$$) {
    if ($may_handle$$($e$$)) {
      var $delta_x$$ = $e$$.wheelDelta || -$e$$.detail;
      0 > $delta_x$$ ? $delta_x$$ = -1 : 0 < $delta_x$$ && ($delta_x$$ = 1);
      $mouse$$.bus.send("mouse-wheel", [$delta_x$$, 0]);
      $e$$.preventDefault();
    }
  }
  var $left_down$$ = !1, $right_down$$ = !1, $middle_down$$ = !1, $last_x$$ = 0, $last_y$$ = 0, $mouse$$ = this;
  this.enabled = !1;
  this.emu_enabled = !0;
  this.bus = $bus$$;
  this.bus.register("mouse-enable", function($enabled$$) {
    this.enabled = $enabled$$;
  }, this);
  this.is_running = !1;
  this.bus.register("emulator-stopped", function() {
    this.is_running = !1;
  }, this);
  this.bus.register("emulator-started", function() {
    this.is_running = !0;
  }, this);
  this.destroy = function() {
    "undefined" !== typeof window && (window.removeEventListener("touchstart", $touch_start_handler$$, !1), window.removeEventListener("touchend", $touch_end_handler$$, !1), window.removeEventListener("touchmove", $mousemove_handler$$, !1), window.removeEventListener("mousemove", $mousemove_handler$$, !1), window.removeEventListener("mousedown", $mousedown_handler$$, !1), window.removeEventListener("mouseup", $mouseup_handler$$, !1), window.removeEventListener("wheel", $mousewheel_handler$$, {passive:!1}));
  };
  this.init = function() {
    "undefined" !== typeof window && (this.destroy(), window.addEventListener("touchstart", $touch_start_handler$$, !1), window.addEventListener("touchend", $touch_end_handler$$, !1), window.addEventListener("touchmove", $mousemove_handler$$, !1), window.addEventListener("mousemove", $mousemove_handler$$, !1), window.addEventListener("mousedown", $mousedown_handler$$, !1), window.addEventListener("mouseup", $mouseup_handler$$, !1), window.addEventListener("wheel", $mousewheel_handler$$, {passive:!1}));
  };
  this.init();
}
;var DAC_QUEUE_RESERVE = 0.2, AUDIOBUFFER_MINIMUM_SAMPLING_RATE = 8000;
function SpeakerAdapter($bus$$) {
  if ("undefined" !== typeof window) {
    if (window.AudioContext || window.webkitAudioContext) {
      var $SpeakerDAC$$ = window.AudioWorklet ? SpeakerWorkletDAC : SpeakerBufferSourceDAC;
      this.bus = $bus$$;
      this.audio_context = window.AudioContext ? new AudioContext : new webkitAudioContext;
      this.mixer = new SpeakerMixer($bus$$, this.audio_context);
      this.pcspeaker = new PCSpeaker($bus$$, this.audio_context, this.mixer);
      this.dac = new $SpeakerDAC$$($bus$$, this.audio_context, this.mixer);
      this.pcspeaker.start();
      $bus$$.register("emulator-stopped", function() {
        this.audio_context.suspend();
      }, this);
      $bus$$.register("emulator-started", function() {
        this.audio_context.resume();
      }, this);
      $bus$$.register("speaker-confirm-initialized", function() {
        $bus$$.send("speaker-has-initialized");
      }, this);
      $bus$$.send("speaker-has-initialized");
    } else {
      console.warn("Web browser doesn't support Web Audio API");
    }
  }
}
SpeakerAdapter.prototype.destroy = function() {
  this.audio_context && this.audio_context.close();
  this.dac && this.dac.node_processor && this.dac.node_processor.port.close();
};
function SpeakerMixer($bus$$, $audio_context$$) {
  function $create_gain_handler$$($audio_node$$) {
    return function($decibels$$) {
      $audio_node$$.gain.setValueAtTime($decibels$$, this.audio_context.currentTime);
    };
  }
  this.audio_context = $audio_context$$;
  this.sources = new Map;
  this.gain_right = this.gain_left = this.volume_right = this.volume_left = this.volume_both = 1;
  this.node_treble_left = this.audio_context.createBiquadFilter();
  this.node_treble_right = this.audio_context.createBiquadFilter();
  this.node_treble_left.type = "highshelf";
  this.node_treble_right.type = "highshelf";
  this.node_treble_left.frequency.setValueAtTime(2000, this.audio_context.currentTime);
  this.node_treble_right.frequency.setValueAtTime(2000, this.audio_context.currentTime);
  this.node_bass_left = this.audio_context.createBiquadFilter();
  this.node_bass_right = this.audio_context.createBiquadFilter();
  this.node_bass_left.type = "lowshelf";
  this.node_bass_right.type = "lowshelf";
  this.node_bass_left.frequency.setValueAtTime(200, this.audio_context.currentTime);
  this.node_bass_right.frequency.setValueAtTime(200, this.audio_context.currentTime);
  this.node_gain_left = this.audio_context.createGain();
  this.node_gain_right = this.audio_context.createGain();
  this.node_merger = this.audio_context.createChannelMerger(2);
  this.input_left = this.node_treble_left;
  this.input_right = this.node_treble_right;
  this.node_treble_left.connect(this.node_bass_left);
  this.node_bass_left.connect(this.node_gain_left);
  this.node_gain_left.connect(this.node_merger, 0, 0);
  this.node_treble_right.connect(this.node_bass_right);
  this.node_bass_right.connect(this.node_gain_right);
  this.node_gain_right.connect(this.node_merger, 0, 1);
  this.node_merger.connect(this.audio_context.destination);
  $bus$$.register("mixer-connect", function($data$$) {
    this.connect_source($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("mixer-disconnect", function($data$$) {
    this.disconnect_source($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("mixer-volume", function($data$$) {
    var $source_id$$ = $data$$[0], $channel$$ = $data$$[1];
    $data$$ = Math.pow(10, $data$$[2] / 20);
    var $source$$ = $source_id$$ === MIXER_SRC_MASTER ? this : this.sources.get($source_id$$);
    void 0 === $source$$ ? dbg_assert(!1, "Mixer set volume - cannot set volume for undefined source: " + $source_id$$) : $source$$.set_volume($data$$, $channel$$);
  }, this);
  $bus$$.register("mixer-gain-left", function($decibels$$) {
    this.gain_left = Math.pow(10, $decibels$$ / 20);
    this.update();
  }, this);
  $bus$$.register("mixer-gain-right", function($decibels$$) {
    this.gain_right = Math.pow(10, $decibels$$ / 20);
    this.update();
  }, this);
  $bus$$.register("mixer-treble-left", $create_gain_handler$$(this.node_treble_left), this);
  $bus$$.register("mixer-treble-right", $create_gain_handler$$(this.node_treble_right), this);
  $bus$$.register("mixer-bass-left", $create_gain_handler$$(this.node_bass_left), this);
  $bus$$.register("mixer-bass-right", $create_gain_handler$$(this.node_bass_right), this);
}
SpeakerMixer.prototype.add_source = function($source$$, $source_id$$) {
  $source$$ = new SpeakerMixerSource(this.audio_context, $source$$, this.input_left, this.input_right);
  dbg_assert(!this.sources.has($source_id$$), "Mixer add source - overwritting source: " + $source_id$$);
  this.sources.set($source_id$$, $source$$);
  return $source$$;
};
SpeakerMixer.prototype.connect_source = function($source_id$$, $channel$$) {
  var $source$$ = this.sources.get($source_id$$);
  void 0 === $source$$ ? dbg_assert(!1, "Mixer connect - cannot connect undefined source: " + $source_id$$) : $source$$.connect($channel$$);
};
SpeakerMixer.prototype.disconnect_source = function($source_id$$, $channel$$) {
  var $source$$ = this.sources.get($source_id$$);
  void 0 === $source$$ ? dbg_assert(!1, "Mixer disconnect - cannot disconnect undefined source: " + $source_id$$) : $source$$.disconnect($channel$$);
};
SpeakerMixer.prototype.set_volume = function($value$$, $channel$$) {
  void 0 === $channel$$ && ($channel$$ = MIXER_CHANNEL_BOTH);
  switch($channel$$) {
    case MIXER_CHANNEL_LEFT:
      this.volume_left = $value$$;
      break;
    case MIXER_CHANNEL_RIGHT:
      this.volume_right = $value$$;
      break;
    case MIXER_CHANNEL_BOTH:
      this.volume_both = $value$$;
      break;
    default:
      dbg_assert(!1, "Mixer set master volume - unknown channel: " + $channel$$);
      return;
  }
  this.update();
};
SpeakerMixer.prototype.update = function() {
  var $net_gain_right$$ = this.volume_both * this.volume_right * this.gain_right;
  this.node_gain_left.gain.setValueAtTime(this.volume_both * this.volume_left * this.gain_left, this.audio_context.currentTime);
  this.node_gain_right.gain.setValueAtTime($net_gain_right$$, this.audio_context.currentTime);
};
function SpeakerMixerSource($audio_context$$, $source_node$$, $destination_left$$, $destination_right$$) {
  this.audio_context = $audio_context$$;
  this.connected_right = this.connected_left = !0;
  this.volume_right = this.volume_left = this.volume_both = this.gain_hidden = 1;
  this.node_splitter = $audio_context$$.createChannelSplitter(2);
  this.node_gain_left = $audio_context$$.createGain();
  this.node_gain_right = $audio_context$$.createGain();
  $source_node$$.connect(this.node_splitter);
  this.node_splitter.connect(this.node_gain_left, 0);
  this.node_gain_left.connect($destination_left$$);
  this.node_splitter.connect(this.node_gain_right, 1);
  this.node_gain_right.connect($destination_right$$);
}
SpeakerMixerSource.prototype.update = function() {
  var $net_gain_right$$ = this.connected_right * this.gain_hidden * this.volume_both * this.volume_right;
  this.node_gain_left.gain.setValueAtTime(this.connected_left * this.gain_hidden * this.volume_both * this.volume_left, this.audio_context.currentTime);
  this.node_gain_right.gain.setValueAtTime($net_gain_right$$, this.audio_context.currentTime);
};
SpeakerMixerSource.prototype.connect = function($channel$$) {
  var $both$$ = !$channel$$ || $channel$$ === MIXER_CHANNEL_BOTH;
  if ($both$$ || $channel$$ === MIXER_CHANNEL_LEFT) {
    this.connected_left = !0;
  }
  if ($both$$ || $channel$$ === MIXER_CHANNEL_RIGHT) {
    this.connected_right = !0;
  }
  this.update();
};
SpeakerMixerSource.prototype.disconnect = function($channel$$) {
  var $both$$ = !$channel$$ || $channel$$ === MIXER_CHANNEL_BOTH;
  if ($both$$ || $channel$$ === MIXER_CHANNEL_LEFT) {
    this.connected_left = !1;
  }
  if ($both$$ || $channel$$ === MIXER_CHANNEL_RIGHT) {
    this.connected_right = !1;
  }
  this.update();
};
SpeakerMixerSource.prototype.set_volume = function($value$$, $channel$$) {
  void 0 === $channel$$ && ($channel$$ = MIXER_CHANNEL_BOTH);
  switch($channel$$) {
    case MIXER_CHANNEL_LEFT:
      this.volume_left = $value$$;
      break;
    case MIXER_CHANNEL_RIGHT:
      this.volume_right = $value$$;
      break;
    case MIXER_CHANNEL_BOTH:
      this.volume_both = $value$$;
      break;
    default:
      dbg_assert(!1, "Mixer set volume - unknown channel: " + $channel$$);
      return;
  }
  this.update();
};
SpeakerMixerSource.prototype.set_gain_hidden = function($value$$) {
  this.gain_hidden = $value$$;
};
function PCSpeaker($bus$$, $audio_context$$, $mixer$$) {
  this.node_oscillator = $audio_context$$.createOscillator();
  this.node_oscillator.type = "square";
  this.node_oscillator.frequency.setValueAtTime(440, $audio_context$$.currentTime);
  this.mixer_connection = $mixer$$.add_source(this.node_oscillator, MIXER_SRC_PCSPEAKER);
  this.mixer_connection.disconnect();
  $bus$$.register("pcspeaker-enable", function() {
    $mixer$$.connect_source(MIXER_SRC_PCSPEAKER);
  }, this);
  $bus$$.register("pcspeaker-disable", function() {
    $mixer$$.disconnect_source(MIXER_SRC_PCSPEAKER);
  }, this);
  $bus$$.register("pcspeaker-update", function($data$$) {
    var $counter_reload$$ = $data$$[1], $frequency$$ = 0;
    3 === $data$$[0] && ($frequency$$ = 1000 * OSCILLATOR_FREQ / $counter_reload$$, $frequency$$ = Math.min($frequency$$, this.node_oscillator.frequency.maxValue), $frequency$$ = Math.max($frequency$$, 0));
    this.node_oscillator.frequency.setValueAtTime($frequency$$, $audio_context$$.currentTime);
  }, this);
}
PCSpeaker.prototype.start = function() {
  this.node_oscillator.start();
};
function SpeakerWorkletDAC($bus$$, $audio_context$$, $mixer$$) {
  this.bus = $bus$$;
  this.audio_context = $audio_context$$;
  this.enabled = !1;
  this.sampling_rate = 48000;
  $audio_context$$ = function() {
    function $sinc$$($x$$) {
      if (0 === $x$$) {
        return 1;
      }
      $x$$ *= Math.PI;
      return Math.sin($x$$) / $x$$;
    }
    function $DACProcessor$$() {
      var $self$$ = Reflect.construct(AudioWorkletProcessor, [], $DACProcessor$$);
      $self$$.kernel_size = 3;
      $self$$.queue_data = Array(1024);
      $self$$.queue_start = 0;
      $self$$.queue_end = 0;
      $self$$.queue_length = 0;
      $self$$.queue_size = $self$$.queue_data.length;
      $self$$.queued_samples = 0;
      $self$$.source_buffer_previous = $EMPTY_BUFFER$$;
      $self$$.source_buffer_current = $EMPTY_BUFFER$$;
      $self$$.source_samples_per_destination = 1.0;
      $self$$.source_block_start = 0;
      $self$$.source_time = 0.0;
      $self$$.source_offset = 0;
      $self$$.port.onmessage = $event$$ => {
        switch($event$$.data.type) {
          case "queue":
            $self$$.queue_push($event$$.data.value);
            break;
          case "sampling-rate":
            $self$$.source_samples_per_destination = $event$$.data.value / sampleRate;
        }
      };
      return $self$$;
    }
    var $EMPTY_BUFFER$$ = [new Float32Array(256), new Float32Array(256), ];
    Reflect.setPrototypeOf($DACProcessor$$.prototype, AudioWorkletProcessor.prototype);
    Reflect.setPrototypeOf($DACProcessor$$, AudioWorkletProcessor);
    $DACProcessor$$.prototype.process = $DACProcessor$$.prototype.process = function($i$jscomp$89_inputs$$, $outputs$$, $parameters$$) {
      for ($i$jscomp$89_inputs$$ = 0; $i$jscomp$89_inputs$$ < $outputs$$[0][0].length; $i$jscomp$89_inputs$$++) {
        for (var $sum1$$ = $parameters$$ = 0, $end$$ = this.source_offset + this.kernel_size, $j$$ = this.source_offset - this.kernel_size + 1; $j$$ <= $end$$; $j$$++) {
          var $convolute_index$$ = this.source_block_start + $j$$;
          $parameters$$ += this.get_sample($convolute_index$$, 0) * this.kernel(this.source_time - $j$$);
          $sum1$$ += this.get_sample($convolute_index$$, 1) * this.kernel(this.source_time - $j$$);
        }
        if (isNaN($parameters$$) || isNaN($sum1$$)) {
          $parameters$$ = $sum1$$ = 0, this.dbg_log("ERROR: NaN values! Ignoring for now.");
        }
        $outputs$$[0][0][$i$jscomp$89_inputs$$] = $parameters$$;
        $outputs$$[0][1][$i$jscomp$89_inputs$$] = $sum1$$;
        this.source_time += this.source_samples_per_destination;
        this.source_offset = Math.floor(this.source_time);
      }
      $outputs$$ = this.source_offset;
      $outputs$$ += this.kernel_size + 2;
      this.source_time -= this.source_offset;
      this.source_block_start += this.source_offset;
      this.source_offset = 0;
      this.ensure_enough_data($outputs$$);
      return !0;
    };
    $DACProcessor$$.prototype.kernel = function($x$$) {
      return $sinc$$($x$$) * $sinc$$($x$$ / this.kernel_size);
    };
    $DACProcessor$$.prototype.get_sample = function($index$$, $channel$$) {
      return 0 > $index$$ ? ($index$$ += this.source_buffer_previous[0].length, this.source_buffer_previous[$channel$$][$index$$]) : this.source_buffer_current[$channel$$][$index$$];
    };
    $DACProcessor$$.prototype.ensure_enough_data = function($needed$$) {
      var $current_length$$ = this.source_buffer_current[0].length;
      $current_length$$ - this.source_block_start < $needed$$ && (this.prepare_next_buffer(), this.source_block_start -= $current_length$$);
    };
    $DACProcessor$$.prototype.prepare_next_buffer = function() {
      256 > this.queued_samples && this.queue_length && this.dbg_log("Not enough samples - should not happen during midway of playback");
      this.source_buffer_previous = this.source_buffer_current;
      this.source_buffer_current = this.queue_shift();
      var $new_big_buffer_new_big_buffer_size_sample_count$$ = this.source_buffer_current[0].length;
      if (256 > $new_big_buffer_new_big_buffer_size_sample_count$$) {
        for (var $new_big_buffer_pos_queue_pos$$ = this.queue_start, $buffer_count$$ = 0; 256 > $new_big_buffer_new_big_buffer_size_sample_count$$ && $buffer_count$$ < this.queue_length;) {
          $new_big_buffer_new_big_buffer_size_sample_count$$ += this.queue_data[$new_big_buffer_pos_queue_pos$$][0].length, $new_big_buffer_pos_queue_pos$$ = $new_big_buffer_pos_queue_pos$$ + 1 & this.queue_size - 1, $buffer_count$$++;
        }
        $new_big_buffer_new_big_buffer_size_sample_count$$ = Math.max($new_big_buffer_new_big_buffer_size_sample_count$$, 256);
        $new_big_buffer_new_big_buffer_size_sample_count$$ = [new Float32Array($new_big_buffer_new_big_buffer_size_sample_count$$), new Float32Array($new_big_buffer_new_big_buffer_size_sample_count$$), ];
        $new_big_buffer_new_big_buffer_size_sample_count$$[0].set(this.source_buffer_current[0]);
        $new_big_buffer_new_big_buffer_size_sample_count$$[1].set(this.source_buffer_current[1]);
        $new_big_buffer_pos_queue_pos$$ = this.source_buffer_current[0].length;
        for (var $i$$ = 0; $i$$ < $buffer_count$$; $i$$++) {
          var $small_buffer$$ = this.queue_shift();
          $new_big_buffer_new_big_buffer_size_sample_count$$[0].set($small_buffer$$[0], $new_big_buffer_pos_queue_pos$$);
          $new_big_buffer_new_big_buffer_size_sample_count$$[1].set($small_buffer$$[1], $new_big_buffer_pos_queue_pos$$);
          $new_big_buffer_pos_queue_pos$$ += $small_buffer$$[0].length;
        }
        this.source_buffer_current = $new_big_buffer_new_big_buffer_size_sample_count$$;
      }
      this.pump();
    };
    $DACProcessor$$.prototype.pump = function() {
      1024 > this.queued_samples / this.source_samples_per_destination && this.port.postMessage({type:"pump", });
    };
    $DACProcessor$$.prototype.queue_push = function($item$$) {
      this.queue_length < this.queue_size && (this.queue_data[this.queue_end] = $item$$, this.queue_end = this.queue_end + 1 & this.queue_size - 1, this.queue_length++, this.queued_samples += $item$$[0].length, this.pump());
    };
    $DACProcessor$$.prototype.queue_shift = function() {
      if (!this.queue_length) {
        return $EMPTY_BUFFER$$;
      }
      var $item$$ = this.queue_data[this.queue_start];
      this.queue_data[this.queue_start] = null;
      this.queue_start = this.queue_start + 1 & this.queue_size - 1;
      this.queue_length--;
      this.queued_samples -= $item$$[0].length;
      return $item$$;
    };
    $DACProcessor$$.prototype.dbg_log = function($message$$) {
      DEBUG && this.port.postMessage({type:"debug-log", value:$message$$, });
    };
    registerProcessor("dac-processor", $DACProcessor$$);
  }.toString();
  var $worklet_code_start$$ = $audio_context$$.indexOf("{") + 1, $worklet_code_end$$ = $audio_context$$.lastIndexOf("}");
  $audio_context$$ = $audio_context$$.substring($worklet_code_start$$, $worklet_code_end$$);
  DEBUG && ($audio_context$$ = "var DEBUG = true;\n" + $audio_context$$);
  $audio_context$$ = new Blob([$audio_context$$], {type:"application/javascript"});
  var $worklet_url$$ = URL.createObjectURL($audio_context$$);
  this.node_processor = null;
  this.node_output = this.audio_context.createGain();
  this.audio_context.audioWorklet.addModule($worklet_url$$).then(() => {
    URL.revokeObjectURL($worklet_url$$);
    this.node_processor = new AudioWorkletNode(this.audio_context, "dac-processor", {numberOfInputs:0, numberOfOutputs:1, outputChannelCount:[2], parameterData:{}, processorOptions:{}, });
    this.node_processor.port.postMessage({type:"sampling-rate", value:this.sampling_rate, });
    this.node_processor.port.onmessage = $event$$ => {
      switch($event$$.data.type) {
        case "pump":
          this.pump();
          break;
        case "debug-log":
          dbg_log("SpeakerWorkletDAC - Worklet: " + $event$$.data.value);
      }
    };
    this.node_processor.connect(this.node_output);
  });
  this.mixer_connection = $mixer$$.add_source(this.node_output, MIXER_SRC_DAC);
  this.mixer_connection.set_gain_hidden(3);
  $bus$$.register("dac-send-data", function($data$$) {
    this.queue($data$$);
  }, this);
  $bus$$.register("dac-enable", function($enabled$$) {
    this.enabled = !0;
  }, this);
  $bus$$.register("dac-disable", function() {
    this.enabled = !1;
  }, this);
  $bus$$.register("dac-tell-sampling-rate", function($rate$$) {
    dbg_assert(0 < $rate$$, "Sampling rate should be nonzero");
    this.sampling_rate = $rate$$;
    this.node_processor && this.node_processor.port.postMessage({type:"sampling-rate", value:$rate$$, });
  }, this);
  DEBUG && (this.debugger = new SpeakerDACDebugger(this.audio_context, this.node_output));
}
SpeakerWorkletDAC.prototype.queue = function($data$$) {
  this.node_processor && (DEBUG && this.debugger.push_queued_data($data$$), this.node_processor.port.postMessage({type:"queue", value:$data$$, }, [$data$$[0].buffer, $data$$[1].buffer]));
};
SpeakerWorkletDAC.prototype.pump = function() {
  this.enabled && this.bus.send("dac-request-data");
};
function SpeakerBufferSourceDAC($bus$$, $audio_context$$, $mixer$$) {
  this.bus = $bus$$;
  this.audio_context = $audio_context$$;
  this.enabled = !1;
  this.sampling_rate = 22050;
  this.buffered_time = 0;
  this.rate_ratio = 1;
  this.node_lowpass = this.audio_context.createBiquadFilter();
  this.node_lowpass.type = "lowpass";
  this.node_output = this.node_lowpass;
  this.mixer_connection = $mixer$$.add_source(this.node_output, MIXER_SRC_DAC);
  this.mixer_connection.set_gain_hidden(3);
  $bus$$.register("dac-send-data", function($data$$) {
    this.queue($data$$);
  }, this);
  $bus$$.register("dac-enable", function($enabled$$) {
    this.enabled = !0;
    this.pump();
  }, this);
  $bus$$.register("dac-disable", function() {
    this.enabled = !1;
  }, this);
  $bus$$.register("dac-tell-sampling-rate", function($rate$$) {
    dbg_assert(0 < $rate$$, "Sampling rate should be nonzero");
    this.sampling_rate = $rate$$;
    this.rate_ratio = Math.ceil(AUDIOBUFFER_MINIMUM_SAMPLING_RATE / $rate$$);
    this.node_lowpass.frequency.setValueAtTime($rate$$ / 2, this.audio_context.currentTime);
  }, this);
  DEBUG && (this.debugger = new SpeakerDACDebugger(this.audio_context, this.node_output));
}
SpeakerBufferSourceDAC.prototype.queue = function($data$jscomp$185_source$$) {
  DEBUG && this.debugger.push_queued_data($data$jscomp$185_source$$);
  var $current_silence_duration_sample_count$$ = $data$jscomp$185_source$$[0].length, $block_duration$$ = $current_silence_duration_sample_count$$ / this.sampling_rate;
  if (1 < this.rate_ratio) {
    var $buffer$$ = this.audio_context.createBuffer(2, $current_silence_duration_sample_count$$ * this.rate_ratio, this.sampling_rate * this.rate_ratio);
    for (var $buffer_data0$$ = $buffer$$.getChannelData(0), $buffer_data1$$ = $buffer$$.getChannelData(1), $buffer_index$$ = 0, $i$$ = 0; $i$$ < $current_silence_duration_sample_count$$; $i$$++) {
      for (var $j$$ = 0; $j$$ < this.rate_ratio; $j$$++, $buffer_index$$++) {
        $buffer_data0$$[$buffer_index$$] = $data$jscomp$185_source$$[0][$i$$], $buffer_data1$$[$buffer_index$$] = $data$jscomp$185_source$$[1][$i$$];
      }
    }
  } else {
    $buffer$$ = this.audio_context.createBuffer(2, $current_silence_duration_sample_count$$, this.sampling_rate), $buffer$$.copyToChannel ? ($buffer$$.copyToChannel($data$jscomp$185_source$$[0], 0), $buffer$$.copyToChannel($data$jscomp$185_source$$[1], 1)) : ($buffer$$.getChannelData(0).set($data$jscomp$185_source$$[0]), $buffer$$.getChannelData(1).set($data$jscomp$185_source$$[1]));
  }
  $data$jscomp$185_source$$ = this.audio_context.createBufferSource();
  $data$jscomp$185_source$$.buffer = $buffer$$;
  $data$jscomp$185_source$$.connect(this.node_lowpass);
  $data$jscomp$185_source$$.addEventListener("ended", this.pump.bind(this));
  $buffer$$ = this.audio_context.currentTime;
  if (this.buffered_time < $buffer$$) {
    for (dbg_log("Speaker DAC - Creating/Recreating reserve - shouldn't occur frequently during playback"), this.buffered_time = $buffer$$, $buffer$$ = DAC_QUEUE_RESERVE - $block_duration$$, $current_silence_duration_sample_count$$ = 0; $current_silence_duration_sample_count$$ <= $buffer$$;) {
      $current_silence_duration_sample_count$$ += $block_duration$$, this.buffered_time += $block_duration$$, setTimeout(() => this.pump(), 1000 * $current_silence_duration_sample_count$$);
    }
  }
  $data$jscomp$185_source$$.start(this.buffered_time);
  this.buffered_time += $block_duration$$;
  setTimeout(() => this.pump(), 0);
};
SpeakerBufferSourceDAC.prototype.pump = function() {
  this.enabled && (this.buffered_time - this.audio_context.currentTime > DAC_QUEUE_RESERVE || this.bus.send("dac-request-data"));
};
function SpeakerDACDebugger($audio_context$$, $source_node$$) {
  this.audio_context = $audio_context$$;
  this.node_source = $source_node$$;
  this.node_processor = null;
  this.node_gain = this.audio_context.createGain();
  this.node_gain.gain.setValueAtTime(0, this.audio_context.currentTime);
  this.node_gain.connect(this.audio_context.destination);
  this.is_active = !1;
  this.queued_history = [];
  this.output_history = [];
  this.queued = [[], []];
  this.output = [[], []];
}
SpeakerDACDebugger.prototype.start = function($duration_ms$$) {
  this.is_active = !0;
  this.queued = [[], []];
  this.output = [[], []];
  this.queued_history.push(this.queued);
  this.output_history.push(this.output);
  this.node_processor = this.audio_context.createScriptProcessor(1024, 2, 2);
  this.node_processor.onaudioprocess = $event$$ => {
    this.output[0].push($event$$.inputBuffer.getChannelData(0).slice());
    this.output[1].push($event$$.inputBuffer.getChannelData(1).slice());
  };
  this.node_source.connect(this.node_processor);
  this.node_processor.connect(this.node_gain);
  setTimeout(() => {
    this.stop();
  }, $duration_ms$$);
};
SpeakerDACDebugger.prototype.stop = function() {
  this.is_active = !1;
  this.node_source.disconnect(this.node_processor);
  this.node_processor.disconnect();
  this.node_processor = null;
};
SpeakerDACDebugger.prototype.push_queued_data = function($data$$) {
  this.is_active && (this.queued[0].push($data$$[0].slice()), this.queued[1].push($data$$[1].slice()));
};
SpeakerDACDebugger.prototype.download_txt = function($history_id_txt$$, $channel$$) {
  $history_id_txt$$ = this.output_history[$history_id_txt$$][$channel$$].map($v$$ => $v$$.join(" ")).join(" ");
  dump_file($history_id_txt$$, "dacdata.txt");
};
SpeakerDACDebugger.prototype.download_csv = function($buffers$jscomp$5_history_id$$) {
  $buffers$jscomp$5_history_id$$ = this.output_history[$buffers$jscomp$5_history_id$$];
  for (var $csv_rows$$ = [], $buffer_id$$ = 0; $buffer_id$$ < $buffers$jscomp$5_history_id$$[0].length; $buffer_id$$++) {
    for (var $i$$ = 0; $i$$ < $buffers$jscomp$5_history_id$$[0][$buffer_id$$].length; $i$$++) {
      $csv_rows$$.push(`${$buffers$jscomp$5_history_id$$[0][$buffer_id$$][$i$$]},${$buffers$jscomp$5_history_id$$[1][$buffer_id$$][$i$$]}`);
    }
  }
  dump_file($csv_rows$$.join("\n"), "dacdata.csv");
};
function SerialAdapter($element$$, $bus$$) {
  function $keypress_handler$$($e$$) {
    $serial$$.bus && $serial$$.enabled && ($serial$$.send_char($e$$.which), $e$$.preventDefault());
  }
  function $keydown_handler$$($e$$) {
    var $chr$$ = $e$$.which;
    8 === $chr$$ ? ($serial$$.send_char(127), $e$$.preventDefault()) : 9 === $chr$$ && ($serial$$.send_char(9), $e$$.preventDefault());
  }
  function $paste_handler$$($e$$) {
    if ($serial$$.enabled) {
      for (var $data$$ = $e$$.clipboardData.getData("text/plain"), $i$$ = 0; $i$$ < $data$$.length; $i$$++) {
        $serial$$.send_char($data$$.charCodeAt($i$$));
      }
      $e$$.preventDefault();
    }
  }
  function $window_click_handler$$($e$$) {
    $e$$.target !== $element$$ && $element$$.blur();
  }
  var $serial$$ = this;
  this.enabled = !0;
  this.bus = $bus$$;
  this.text = "";
  this.text_new_line = !1;
  this.last_update = 0;
  this.bus.register("serial0-output-char", function($chr$$) {
    this.show_char($chr$$);
  }, this);
  this.destroy = function() {
    $element$$.removeEventListener("keypress", $keypress_handler$$, !1);
    $element$$.removeEventListener("keydown", $keydown_handler$$, !1);
    $element$$.removeEventListener("paste", $paste_handler$$, !1);
    window.removeEventListener("mousedown", $window_click_handler$$, !1);
  };
  this.init = function() {
    this.destroy();
    $element$$.style.display = "block";
    $element$$.addEventListener("keypress", $keypress_handler$$, !1);
    $element$$.addEventListener("keydown", $keydown_handler$$, !1);
    $element$$.addEventListener("paste", $paste_handler$$, !1);
    window.addEventListener("mousedown", $window_click_handler$$, !1);
  };
  this.init();
  this.show_char = function($chr$$) {
    "\b" === $chr$$ ? (this.text = this.text.slice(0, -1), this.update()) : "\r" !== $chr$$ && (this.text += $chr$$, "\n" === $chr$$ && (this.text_new_line = !0), this.update());
  };
  this.update = function() {
    var $now$jscomp$0$$ = Date.now(), $delta$$ = $now$jscomp$0$$ - this.last_update;
    16 > $delta$$ ? void 0 === this.update_timer && (this.update_timer = setTimeout(() => {
      this.update_timer = void 0;
      var $now$$ = Date.now();
      dbg_assert(15 <= $now$$ - this.last_update);
      this.last_update = $now$$;
      this.render();
    }, 16 - $delta$$)) : (void 0 !== this.update_timer && (clearTimeout(this.update_timer), this.update_timer = void 0), this.last_update = $now$jscomp$0$$, this.render());
  };
  this.render = function() {
    $element$$.value = this.text;
    this.text_new_line && (this.text_new_line = !1, $element$$.scrollTop = 1e9);
  };
  this.send_char = function($chr_code$$) {
    $serial$$.bus && $serial$$.bus.send("serial0-input", $chr_code$$);
  };
}
function SerialRecordingAdapter($bus$$) {
  this.text = "";
  $bus$$.register("serial0-output-char", function($chr$$) {
    this.text += $chr$$;
  }, this);
}
function SerialAdapterXtermJS($element$$, $bus$$) {
  this.element = $element$$;
  if (window.Terminal) {
    var $term$$ = this.term = new window.Terminal;
    $term$$.setOption("logLevel", "off");
    $term$$.write("This is the serial console. Whatever you type or paste here will be sent to COM1");
    var $on_data_disposable$$ = $term$$.onData(function($data$$) {
      for (let $i$$ = 0; $i$$ < $data$$.length; $i$$++) {
        $bus$$.send("serial0-input", $data$$.charCodeAt($i$$));
      }
    });
    $bus$$.register("serial0-output-char", function($chr$$) {
      $term$$.write($chr$$);
    }, this);
    this.destroy = function() {
      $on_data_disposable$$.dispose();
      $term$$.dispose();
    };
  }
}
SerialAdapterXtermJS.prototype.show = function() {
  this.term && this.term.open(this.element);
};
function NetworkAdapter($url$$, $bus$$) {
  this.bus = $bus$$;
  this.socket = void 0;
  this.send_queue = [];
  this.url = $url$$;
  this.reconnect_interval = 10000;
  this.last_connect_attempt = Date.now() - this.reconnect_interval;
  this.send_queue_limit = 64;
  this.bus.register("net0-send", function($data$$) {
    this.send($data$$);
  }, this);
}
NetworkAdapter.prototype.handle_message = function($e$$) {
  this.bus && this.bus.send("net0-receive", new Uint8Array($e$$.data));
};
NetworkAdapter.prototype.handle_close = function($e$$) {
  this.connect();
  setTimeout(this.connect.bind(this), this.reconnect_interval);
};
NetworkAdapter.prototype.handle_open = function($e$jscomp$39_i$$) {
  for ($e$jscomp$39_i$$ = 0; $e$jscomp$39_i$$ < this.send_queue.length; $e$jscomp$39_i$$++) {
    this.send(this.send_queue[$e$jscomp$39_i$$]);
  }
  this.send_queue = [];
};
NetworkAdapter.prototype.handle_error = function($e$$) {
};
NetworkAdapter.prototype.destroy = function() {
  this.socket && this.socket.close();
};
NetworkAdapter.prototype.connect = function() {
  if ("undefined" !== typeof WebSocket) {
    if (this.socket) {
      var $now$jscomp$15_state$$ = this.socket.readyState;
      if (0 === $now$jscomp$15_state$$ || 1 === $now$jscomp$15_state$$) {
        return;
      }
    }
    $now$jscomp$15_state$$ = Date.now();
    this.last_connect_attempt + this.reconnect_interval > $now$jscomp$15_state$$ || (this.last_connect_attempt = Date.now(), this.socket = new WebSocket(this.url), this.socket.binaryType = "arraybuffer", this.socket.onopen = this.handle_open.bind(this), this.socket.onmessage = this.handle_message.bind(this), this.socket.onclose = this.handle_close.bind(this), this.socket.onerror = this.handle_error.bind(this));
  }
};
NetworkAdapter.prototype.send = function($data$$) {
  this.socket && 1 === this.socket.readyState ? this.socket.send($data$$) : (this.send_queue.push($data$$), this.send_queue.length > 2 * this.send_queue_limit && (this.send_queue = this.send_queue.slice(-this.send_queue_limit)), this.connect());
};
NetworkAdapter.prototype.change_proxy = function($url$$) {
  this.url = $url$$;
  this.socket && (this.socket.onclose = function() {
  }, this.socket.onerror = function() {
  }, this.socket.close(), this.socket = void 0);
};
function V86Starter($options$$) {
  this.cpu_is_running = !1;
  var $bus$$ = Bus.create();
  this.bus = $bus$$[0];
  this.emulator_bus = $bus$$[1];
  var $cpu$$, $wasm_memory$$;
  const $wasm_table$$ = new WebAssembly.Table({element:"anyfunc", initial:WASM_TABLE_SIZE + WASM_TABLE_OFFSET});
  $bus$$ = {cpu_exception_hook:$n$$ => this.cpu_exception_hook && this.cpu_exception_hook($n$$), hlt_op:function() {
    return $cpu$$.hlt_op();
  }, abort:function() {
    dbg_assert(!1);
  }, microtick:v86.microtick, get_rand_int:function() {
    return v86util.get_rand_int();
  }, pic_acknowledge:function() {
    $cpu$$.pic_acknowledge();
  }, io_port_read8:function($addr$$) {
    return $cpu$$.io.port_read8($addr$$);
  }, io_port_read16:function($addr$$) {
    return $cpu$$.io.port_read16($addr$$);
  }, io_port_read32:function($addr$$) {
    return $cpu$$.io.port_read32($addr$$);
  }, io_port_write8:function($addr$$, $value$$) {
    $cpu$$.io.port_write8($addr$$, $value$$);
  }, io_port_write16:function($addr$$, $value$$) {
    $cpu$$.io.port_write16($addr$$, $value$$);
  }, io_port_write32:function($addr$$, $value$$) {
    $cpu$$.io.port_write32($addr$$, $value$$);
  }, mmap_read8:function($addr$$) {
    return $cpu$$.mmap_read8($addr$$);
  }, mmap_read16:function($addr$$) {
    return $cpu$$.mmap_read16($addr$$);
  }, mmap_read32:function($addr$$) {
    return $cpu$$.mmap_read32($addr$$);
  }, mmap_write8:function($addr$$, $value$$) {
    $cpu$$.mmap_write8($addr$$, $value$$);
  }, mmap_write16:function($addr$$, $value$$) {
    $cpu$$.mmap_write16($addr$$, $value$$);
  }, mmap_write32:function($addr$$, $value$$) {
    $cpu$$.mmap_write32($addr$$, $value$$);
  }, mmap_write64:function($addr$$, $value0$$, $value1$$) {
    $cpu$$.mmap_write64($addr$$, $value0$$, $value1$$);
  }, mmap_write128:function($addr$$, $value0$$, $value1$$, $value2$$, $value3$$) {
    $cpu$$.mmap_write128($addr$$, $value0$$, $value1$$, $value2$$, $value3$$);
  }, log_from_wasm:function($offset$jscomp$63_str$$, $len$$) {
    $offset$jscomp$63_str$$ = v86util.read_sized_string_from_mem($wasm_memory$$, $offset$jscomp$63_str$$, $len$$);
    dbg_log($offset$jscomp$63_str$$, LOG_CPU);
  }, console_log_from_wasm:function($offset$jscomp$64_str$$, $len$$) {
    $offset$jscomp$64_str$$ = v86util.read_sized_string_from_mem($wasm_memory$$, $offset$jscomp$64_str$$, $len$$);
    console.error($offset$jscomp$64_str$$);
  }, dbg_trace_from_wasm:function() {
    dbg_trace(LOG_CPU);
  }, codegen_finalize:($wasm_table_index$$, $start$$, $state_flags$$, $ptr$$, $len$$) => {
    $cpu$$.codegen_finalize($wasm_table_index$$, $start$$, $state_flags$$, $ptr$$, $len$$);
  }, jit_clear_func:$wasm_table_index$$ => $cpu$$.jit_clear_func($wasm_table_index$$), jit_clear_all_funcs:() => $cpu$$.jit_clear_all_funcs(), __indirect_function_table:$wasm_table$$, };
  let $wasm_fn$$ = $options$$.wasm_fn;
  $wasm_fn$$ || ($wasm_fn$$ = $env$$ => new Promise($resolve$$ => {
    let $v86_bin$$ = DEBUG ? "v86-debug.wasm" : "v86.wasm", $v86_bin_fallback$$ = "v86-fallback.wasm";
    if ($options$$.wasm_path) {
      $v86_bin$$ = $options$$.wasm_path;
      const $slash$$ = $v86_bin$$.lastIndexOf("/");
      $v86_bin_fallback$$ = (-1 === $slash$$ ? "" : $v86_bin$$.substr(0, $slash$$)) + "/" + $v86_bin_fallback$$;
    } else {
      "undefined" === typeof window && "string" === typeof __dirname ? ($v86_bin$$ = __dirname + "/" + $v86_bin$$, $v86_bin_fallback$$ = __dirname + "/" + $v86_bin_fallback$$) : ($v86_bin$$ = "build/" + $v86_bin$$, $v86_bin_fallback$$ = "build/" + $v86_bin_fallback$$);
    }
    v86util.load_file($v86_bin$$, {done:async $bytes$$ => {
      try {
        const {instance:$instance$$} = await WebAssembly.instantiate($bytes$$, $env$$);
        $resolve$$($instance$$.exports);
      } catch ($err$$) {
        v86util.load_file($v86_bin_fallback$$, {done:async $bytes$jscomp$5_instance$$ => {
          ({instance:$bytes$jscomp$5_instance$$} = await WebAssembly.instantiate($bytes$jscomp$5_instance$$, $env$$));
          $resolve$$($bytes$jscomp$5_instance$$.exports);
        }, });
      }
    }, progress:$e$$ => {
      this.emulator_bus.send("download-progress", {file_index:0, file_count:1, file_name:$v86_bin$$, lengthComputable:$e$$.lengthComputable, total:$e$$.total, loaded:$e$$.loaded, });
    }});
  }));
  $wasm_fn$$({env:$bus$$}).then($emulator_exports$$ => {
    $wasm_memory$$ = $emulator_exports$$.memory;
    $emulator_exports$$.rust_init();
    $emulator_exports$$ = this.v86 = new v86(this.emulator_bus, {exports:$emulator_exports$$, wasm_table:$wasm_table$$});
    $cpu$$ = $emulator_exports$$.cpu;
    this.continue_init($emulator_exports$$, $options$$);
  });
}
V86Starter.prototype.continue_init = async function($emulator$$, $options$$) {
  function $put_on_settings$$($name$$, $buffer$$) {
    switch($name$$) {
      case "hda":
        $settings$$.hda = this.disk_images.hda = $buffer$$;
        break;
      case "hdb":
        $settings$$.hdb = this.disk_images.hdb = $buffer$$;
        break;
      case "cdrom":
        $settings$$.cdrom = this.disk_images.cdrom = $buffer$$;
        break;
      case "fda":
        $settings$$.fda = this.disk_images.fda = $buffer$$;
        break;
      case "fdb":
        $settings$$.fdb = this.disk_images.fdb = $buffer$$;
        break;
      case "multiboot":
        $settings$$.multiboot = this.disk_images.multiboot = $buffer$$.buffer;
        break;
      case "bzimage":
        $settings$$.bzimage = this.disk_images.bzimage = $buffer$$.buffer;
        break;
      case "initrd":
        $settings$$.initrd = this.disk_images.initrd = $buffer$$.buffer;
        break;
      case "bios":
        $settings$$.bios = $buffer$$.buffer;
        break;
      case "vga_bios":
        $settings$$.vga_bios = $buffer$$.buffer;
        break;
      case "initial_state":
        $settings$$.initial_state = $buffer$$.buffer;
        break;
      case "fs9p_json":
        $settings$$.fs9p_json = $buffer$$;
        break;
      default:
        dbg_assert(!1, $name$$);
    }
  }
  function $add_file$$($name$$, $buffer$jscomp$47_buffer$jscomp$48_file$$) {
    if ($buffer$jscomp$47_buffer$jscomp$48_file$$) {
      if ($buffer$jscomp$47_buffer$jscomp$48_file$$.get && $buffer$jscomp$47_buffer$jscomp$48_file$$.set && $buffer$jscomp$47_buffer$jscomp$48_file$$.load) {
        $files_to_load$$.push({name:$name$$, loadable:$buffer$jscomp$47_buffer$jscomp$48_file$$, });
      } else {
        if ("bios" === $name$$ || "vga_bios" === $name$$ || "initial_state" === $name$$ || "multiboot" === $name$$ || "bzimage" === $name$$ || "initrd" === $name$$) {
          $buffer$jscomp$47_buffer$jscomp$48_file$$.async = !1;
        }
        $buffer$jscomp$47_buffer$jscomp$48_file$$.buffer instanceof ArrayBuffer ? ($buffer$jscomp$47_buffer$jscomp$48_file$$ = new v86util.SyncBuffer($buffer$jscomp$47_buffer$jscomp$48_file$$.buffer), $files_to_load$$.push({name:$name$$, loadable:$buffer$jscomp$47_buffer$jscomp$48_file$$, })) : "undefined" !== typeof File && $buffer$jscomp$47_buffer$jscomp$48_file$$.buffer instanceof File ? (void 0 === $buffer$jscomp$47_buffer$jscomp$48_file$$.async && ($buffer$jscomp$47_buffer$jscomp$48_file$$.async = 
        268435456 <= $buffer$jscomp$47_buffer$jscomp$48_file$$.buffer.size), $buffer$jscomp$47_buffer$jscomp$48_file$$ = $buffer$jscomp$47_buffer$jscomp$48_file$$.async ? new v86util.AsyncFileBuffer($buffer$jscomp$47_buffer$jscomp$48_file$$.buffer) : new v86util.SyncFileBuffer($buffer$jscomp$47_buffer$jscomp$48_file$$.buffer), $files_to_load$$.push({name:$name$$, loadable:$buffer$jscomp$47_buffer$jscomp$48_file$$, })) : $buffer$jscomp$47_buffer$jscomp$48_file$$.url ? $buffer$jscomp$47_buffer$jscomp$48_file$$.async ? 
        ($buffer$jscomp$47_buffer$jscomp$48_file$$ = $buffer$jscomp$47_buffer$jscomp$48_file$$.use_parts ? new v86util.AsyncXHRPartfileBuffer($buffer$jscomp$47_buffer$jscomp$48_file$$.url, $buffer$jscomp$47_buffer$jscomp$48_file$$.size, $buffer$jscomp$47_buffer$jscomp$48_file$$.fixed_chunk_size) : new v86util.AsyncXHRBuffer($buffer$jscomp$47_buffer$jscomp$48_file$$.url, $buffer$jscomp$47_buffer$jscomp$48_file$$.size, $buffer$jscomp$47_buffer$jscomp$48_file$$.fixed_chunk_size), $files_to_load$$.push({name:$name$$, 
        loadable:$buffer$jscomp$47_buffer$jscomp$48_file$$, })) : $files_to_load$$.push({name:$name$$, url:$buffer$jscomp$47_buffer$jscomp$48_file$$.url, size:$buffer$jscomp$47_buffer$jscomp$48_file$$.size, }) : dbg_log("Ignored file: url=" + $buffer$jscomp$47_buffer$jscomp$48_file$$.url + " buffer=" + $buffer$jscomp$47_buffer$jscomp$48_file$$.buffer);
      }
    }
  }
  async function $done$$() {
    if ($settings$$.fs9p && $settings$$.fs9p_json) {
      if ($settings$$.initial_state ? dbg_log("Filesystem basefs ignored: Overridden by state image") : $settings$$.fs9p.load_from_json($settings$$.fs9p_json), $options$$.bzimage_initrd_from_filesystem) {
        const {bzimage_path:$bzimage_path$$, initrd_path:$initrd_path$$} = this.get_bzimage_initrd_from_filesystem($settings$$.fs9p);
        dbg_log("Found bzimage: " + $bzimage_path$$ + " and initrd: " + $initrd_path$$);
        const [$initrd$$, $bzimage$$] = await Promise.all([$settings$$.fs9p.read_file($initrd_path$$), $settings$$.fs9p.read_file($bzimage_path$$), ]);
        $put_on_settings$$.call(this, "initrd", new v86util.SyncBuffer($initrd$$.buffer));
        $put_on_settings$$.call(this, "bzimage", new v86util.SyncBuffer($bzimage$$.buffer));
      }
    } else {
      dbg_assert(!$options$$.bzimage_initrd_from_filesystem, "bzimage_initrd_from_filesystem: Requires a filesystem");
    }
    this.serial_adapter && this.serial_adapter.show && this.serial_adapter.show();
    this.bus.send("cpu-init", $settings$$);
    $settings$$.initial_state && ($emulator$$.restore_state($settings$$.initial_state), $settings$$.initial_state = void 0);
    $options$$.autostart && this.bus.send("cpu-run");
    this.emulator_bus.send("emulator-loaded");
  }
  this.bus.register("emulator-stopped", function() {
    this.cpu_is_running = !1;
  }, this);
  this.bus.register("emulator-started", function() {
    this.cpu_is_running = !0;
  }, this);
  var $settings$$ = {};
  this.disk_images = {fda:void 0, fdb:void 0, hda:void 0, hdb:void 0, cdrom:void 0, };
  $settings$$.acpi = $options$$.acpi;
  $settings$$.load_devices = !0;
  $settings$$.log_level = $options$$.log_level;
  $settings$$.memory_size = $options$$.memory_size || 67108864;
  $settings$$.vga_memory_size = $options$$.vga_memory_size || 8388608;
  $settings$$.boot_order = $options$$.boot_order || 531;
  $settings$$.fastboot = $options$$.fastboot || !1;
  $settings$$.fda = void 0;
  $settings$$.fdb = void 0;
  $settings$$.uart1 = $options$$.uart1;
  $settings$$.uart2 = $options$$.uart2;
  $settings$$.uart3 = $options$$.uart3;
  $settings$$.cmdline = $options$$.cmdline;
  $settings$$.preserve_mac_from_state_image = $options$$.preserve_mac_from_state_image;
  $settings$$.mac_address_translation = $options$$.mac_address_translation;
  $settings$$.cpuid_level = $options$$.cpuid_level;
  $options$$.network_adapter ? this.network_adapter = $options$$.network_adapter(this.bus) : $options$$.network_relay_url && (this.network_adapter = new NetworkAdapter($options$$.network_relay_url, this.bus));
  $settings$$.enable_ne2k = !0;
  $options$$.disable_keyboard || (this.keyboard_adapter = new KeyboardAdapter(this.bus));
  $options$$.disable_mouse || (this.mouse_adapter = new MouseAdapter(this.bus, $options$$.screen_container));
  $options$$.screen_container ? this.screen_adapter = new ScreenAdapter($options$$.screen_container, this.bus) : $options$$.screen_dummy && (this.screen_adapter = new DummyScreenAdapter(this.bus));
  $options$$.serial_container && (this.serial_adapter = new SerialAdapter($options$$.serial_container, this.bus));
  $options$$.serial_container_xtermjs && (this.serial_adapter = new SerialAdapterXtermJS($options$$.serial_container_xtermjs, this.bus));
  $options$$.disable_speaker || (this.speaker_adapter = new SpeakerAdapter(this.bus));
  var $files_to_load$$ = [];
  $options$$.state && console.warn("Warning: Unknown option 'state'. Did you mean 'initial_state'?");
  for (var $fs_url_image_names$$ = "bios vga_bios cdrom hda hdb fda fdb initial_state multiboot bzimage initrd".split(" "), $base_url_i$$ = 0; $base_url_i$$ < $fs_url_image_names$$.length; $base_url_i$$++) {
    $add_file$$($fs_url_image_names$$[$base_url_i$$], $options$$[$fs_url_image_names$$[$base_url_i$$]]);
  }
  if ($options$$.filesystem) {
    $fs_url_image_names$$ = $options$$.filesystem.basefs;
    $base_url_i$$ = $options$$.filesystem.baseurl;
    let $file_storage$$ = new MemoryFileStorage;
    $base_url_i$$ && ($file_storage$$ = new ServerFileStorageWrapper($file_storage$$, $base_url_i$$));
    $settings$$.fs9p = this.fs9p = new FS($file_storage$$);
    if ($fs_url_image_names$$) {
      dbg_assert($base_url_i$$, "Filesystem: baseurl must be specified");
      if ("object" === typeof $fs_url_image_names$$) {
        var $size$$ = $fs_url_image_names$$.size;
        $fs_url_image_names$$ = $fs_url_image_names$$.url;
      }
      dbg_assert("string" === typeof $fs_url_image_names$$);
      $files_to_load$$.push({name:"fs9p_json", url:$fs_url_image_names$$, size:$size$$, as_json:!0, });
    }
  }
  var $starter$$ = this, $total$$ = $files_to_load$$.length, $cont$$ = function($index$$) {
    if ($index$$ === $total$$) {
      setTimeout($done$$.bind(this), 0);
    } else {
      var $f$$ = $files_to_load$$[$index$$];
      $f$$.loadable ? ($f$$.loadable.onload = function($e$$) {
        $put_on_settings$$.call(this, $f$$.name, $f$$.loadable);
        $cont$$($index$$ + 1);
      }.bind(this), $f$$.loadable.load()) : v86util.load_file($f$$.url, {done:function($result$$) {
        $put_on_settings$$.call(this, $f$$.name, $f$$.as_json ? $result$$ : new v86util.SyncBuffer($result$$));
        $cont$$($index$$ + 1);
      }.bind(this), progress:function($e$$) {
        200 === $e$$.target.status ? $starter$$.emulator_bus.send("download-progress", {file_index:$index$$, file_count:$total$$, file_name:$f$$.url, lengthComputable:$e$$.lengthComputable, total:$e$$.total || $f$$.size, loaded:$e$$.loaded, }) : $starter$$.emulator_bus.send("download-error", {file_index:$index$$, file_count:$total$$, file_name:$f$$.url, request:$e$$.target, });
      }, as_json:$f$$.as_json, });
    }
  }.bind(this);
  $cont$$(0);
};
V86Starter.prototype.get_bzimage_initrd_from_filesystem = function($boot_filesystem$$) {
  const $root$$ = ($boot_filesystem$$.read_dir("/") || []).map($x$$ => "/" + $x$$);
  $boot_filesystem$$ = ($boot_filesystem$$.read_dir("/boot/") || []).map($x$$ => "/boot/" + $x$$);
  let $initrd_path$$, $bzimage_path$$;
  for (let $f$$ of [].concat($root$$, $boot_filesystem$$)) {
    const $old$$ = /old/i.test($f$$) || /fallback/i.test($f$$), $is_bzimage$$ = /vmlinuz/i.test($f$$) || /bzimage/i.test($f$$), $is_initrd$$ = /initrd/i.test($f$$) || /initramfs/i.test($f$$);
    !$is_bzimage$$ || $bzimage_path$$ && $old$$ || ($bzimage_path$$ = $f$$);
    !$is_initrd$$ || $initrd_path$$ && $old$$ || ($initrd_path$$ = $f$$);
  }
  $initrd_path$$ && $bzimage_path$$ || (console.log("Failed to find bzimage or initrd in filesystem. Files:"), console.log($root$$.join(" ")), console.log($boot_filesystem$$.join(" ")));
  return {initrd_path:$initrd_path$$, bzimage_path:$bzimage_path$$};
};
V86Starter.prototype.run = async function() {
  this.bus.send("cpu-run");
};
goog.exportProperty(V86Starter.prototype, "run", V86Starter.prototype.run);
V86Starter.prototype.stop = async function() {
  this.cpu_is_running && await new Promise($resolve$$ => {
    const $listener$$ = () => {
      this.remove_listener("emulator-stopped", $listener$$);
      $resolve$$();
    };
    this.add_listener("emulator-stopped", $listener$$);
    this.bus.send("cpu-stop");
  });
};
goog.exportProperty(V86Starter.prototype, "stop", V86Starter.prototype.stop);
V86Starter.prototype.destroy = async function() {
  await this.stop();
  this.v86.destroy();
  this.keyboard_adapter && this.keyboard_adapter.destroy();
  this.network_adapter && this.network_adapter.destroy();
  this.mouse_adapter && this.mouse_adapter.destroy();
  this.screen_adapter && this.screen_adapter.destroy();
  this.serial_adapter && this.serial_adapter.destroy();
  this.speaker_adapter && this.speaker_adapter.destroy();
};
goog.exportProperty(V86Starter.prototype, "destroy", V86Starter.prototype.destroy);
V86Starter.prototype.restart = function() {
  this.bus.send("cpu-restart");
};
goog.exportProperty(V86Starter.prototype, "restart", V86Starter.prototype.restart);
V86Starter.prototype.add_listener = function($event$$, $listener$$) {
  this.bus.register($event$$, $listener$$, this);
};
goog.exportProperty(V86Starter.prototype, "add_listener", V86Starter.prototype.add_listener);
V86Starter.prototype.remove_listener = function($event$$, $listener$$) {
  this.bus.unregister($event$$, $listener$$);
};
goog.exportProperty(V86Starter.prototype, "remove_listener", V86Starter.prototype.remove_listener);
V86Starter.prototype.restore_state = async function($state$$) {
  dbg_assert(1 === arguments.length);
  this.v86.restore_state($state$$);
};
goog.exportProperty(V86Starter.prototype, "restore_state", V86Starter.prototype.restore_state);
V86Starter.prototype.save_state = async function() {
  dbg_assert(0 === arguments.length);
  return this.v86.save_state();
};
goog.exportProperty(V86Starter.prototype, "save_state", V86Starter.prototype.save_state);
V86Starter.prototype.get_statistics = function() {
  console.warn("V86Starter.prototype.get_statistics is deprecated. Use events instead.");
  var $stats$$ = {cpu:{instruction_counter:this.get_instruction_counter(), }, };
  if (!this.v86) {
    return $stats$$;
  }
  var $devices$$ = this.v86.cpu.devices;
  $devices$$.hda && ($stats$$.hda = $devices$$.hda.stats);
  $devices$$.cdrom && ($stats$$.cdrom = $devices$$.cdrom.stats);
  $devices$$.ps2 && ($stats$$.mouse = {enabled:$devices$$.ps2.use_mouse, });
  $devices$$.vga && ($stats$$.vga = {is_graphical:$devices$$.vga.stats.is_graphical, });
  return $stats$$;
};
goog.exportProperty(V86Starter.prototype, "get_statistics", V86Starter.prototype.get_statistics);
V86Starter.prototype.get_instruction_counter = function() {
  return this.v86 ? this.v86.cpu.instruction_counter[0] >>> 0 : 0;
};
goog.exportProperty(V86Starter.prototype, "get_instruction_counter", V86Starter.prototype.get_instruction_counter);
V86Starter.prototype.is_running = function() {
  return this.cpu_is_running;
};
goog.exportProperty(V86Starter.prototype, "is_running", V86Starter.prototype.is_running);
V86Starter.prototype.keyboard_send_scancodes = function($codes$$) {
  for (var $i$$ = 0; $i$$ < $codes$$.length; $i$$++) {
    this.bus.send("keyboard-code", $codes$$[$i$$]);
  }
};
goog.exportProperty(V86Starter.prototype, "keyboard_send_scancodes", V86Starter.prototype.keyboard_send_scancodes);
V86Starter.prototype.keyboard_send_keys = function($codes$$) {
  for (var $i$$ = 0; $i$$ < $codes$$.length; $i$$++) {
    this.keyboard_adapter.simulate_press($codes$$[$i$$]);
  }
};
goog.exportProperty(V86Starter.prototype, "keyboard_send_keys", V86Starter.prototype.keyboard_send_keys);
V86Starter.prototype.keyboard_send_text = function($string$$) {
  for (var $i$$ = 0; $i$$ < $string$$.length; $i$$++) {
    this.keyboard_adapter.simulate_char($string$$[$i$$]);
  }
};
goog.exportProperty(V86Starter.prototype, "keyboard_send_text", V86Starter.prototype.keyboard_send_text);
V86Starter.prototype.screen_make_screenshot = function() {
  this.screen_adapter && this.screen_adapter.make_screenshot();
};
goog.exportProperty(V86Starter.prototype, "screen_make_screenshot", V86Starter.prototype.screen_make_screenshot);
V86Starter.prototype.screen_set_scale = function($sx$$, $sy$$) {
  this.screen_adapter && this.screen_adapter.set_scale($sx$$, $sy$$);
};
goog.exportProperty(V86Starter.prototype, "screen_set_scale", V86Starter.prototype.screen_set_scale);
V86Starter.prototype.screen_go_fullscreen = function() {
  if (this.screen_adapter) {
    var $elem$$ = document.getElementById("screen_container");
    if ($elem$$) {
      var $fn$$ = $elem$$.requestFullScreen || $elem$$.webkitRequestFullscreen || $elem$$.mozRequestFullScreen || $elem$$.msRequestFullScreen;
      $fn$$ && ($fn$$.call($elem$$), ($elem$$ = document.getElementsByClassName("phone_keyboard")[0]) && $elem$$.focus());
      try {
        navigator.keyboard.lock();
      } catch ($e$$) {
      }
      this.lock_mouse();
    }
  }
};
goog.exportProperty(V86Starter.prototype, "screen_go_fullscreen", V86Starter.prototype.screen_go_fullscreen);
V86Starter.prototype.lock_mouse = function() {
  var $elem$$ = document.body, $fn$$ = $elem$$.requestPointerLock || $elem$$.mozRequestPointerLock || $elem$$.webkitRequestPointerLock;
  $fn$$ && $fn$$.call($elem$$);
};
goog.exportProperty(V86Starter.prototype, "lock_mouse", V86Starter.prototype.lock_mouse);
V86Starter.prototype.mouse_set_status = function($enabled$$) {
  this.mouse_adapter && (this.mouse_adapter.emu_enabled = $enabled$$);
};
V86Starter.prototype.keyboard_set_status = function($enabled$$) {
  this.keyboard_adapter && (this.keyboard_adapter.emu_enabled = $enabled$$);
};
goog.exportProperty(V86Starter.prototype, "keyboard_set_status", V86Starter.prototype.keyboard_set_status);
V86Starter.prototype.serial0_send = function($data$$) {
  for (var $i$$ = 0; $i$$ < $data$$.length; $i$$++) {
    this.bus.send("serial0-input", $data$$.charCodeAt($i$$));
  }
};
goog.exportProperty(V86Starter.prototype, "serial0_send", V86Starter.prototype.serial0_send);
V86Starter.prototype.serial_send_bytes = function($serial$$, $data$$) {
  for (var $i$$ = 0; $i$$ < $data$$.length; $i$$++) {
    this.bus.send("serial" + $serial$$ + "-input", $data$$[$i$$]);
  }
};
goog.exportProperty(V86Starter.prototype, "serial_send_bytes", V86Starter.prototype.serial_send_bytes);
V86Starter.prototype.mount_fs = async function($path$$, $baseurl$$, $basefs$$, $callback$$) {
  let $file_storage$$ = new MemoryFileStorage;
  $baseurl$$ && ($file_storage$$ = new ServerFileStorageWrapper($file_storage$$, $baseurl$$));
  const $newfs$$ = new FS($file_storage$$, this.fs9p.qidcounter), $mount$$ = () => {
    const $idx$$ = this.fs9p.Mount($path$$, $newfs$$);
    $callback$$ && ($idx$$ === -ENOENT ? $callback$$(new FileNotFoundError) : $idx$$ === -EEXIST ? $callback$$(new FileExistsError) : 0 > $idx$$ ? (dbg_assert(!1, "Unexpected error code: " + -$idx$$), $callback$$(Error("Failed to mount. Error number: " + -$idx$$))) : $callback$$(null));
  };
  $baseurl$$ ? (dbg_assert("object" === typeof $basefs$$, "Filesystem: basefs must be a JSON object"), $newfs$$.load_from_json($basefs$$, () => $mount$$())) : $mount$$();
};
goog.exportProperty(V86Starter.prototype, "mount_fs", V86Starter.prototype.mount_fs);
V86Starter.prototype.create_file = async function($file$$, $data$$) {
  dbg_assert(2 === arguments.length);
  var $fs$$ = this.fs9p;
  if ($fs$$) {
    var $filename$jscomp$7_parts$$ = $file$$.split("/");
    $filename$jscomp$7_parts$$ = $filename$jscomp$7_parts$$[$filename$jscomp$7_parts$$.length - 1];
    var $parent_id$$ = $fs$$.SearchPath($file$$).parentid;
    if ("" !== $filename$jscomp$7_parts$$ && -1 !== $parent_id$$) {
      await $fs$$.CreateBinaryFile($filename$jscomp$7_parts$$, $parent_id$$, $data$$);
    } else {
      return Promise.reject(new FileNotFoundError);
    }
  }
};
goog.exportProperty(V86Starter.prototype, "create_file", V86Starter.prototype.create_file);
V86Starter.prototype.read_file = async function($file$$) {
  dbg_assert(1 === arguments.length);
  var $fs$jscomp$2_result$$ = this.fs9p;
  if ($fs$jscomp$2_result$$) {
    return ($fs$jscomp$2_result$$ = await $fs$jscomp$2_result$$.read_file($file$$)) ? $fs$jscomp$2_result$$ : Promise.reject(new FileNotFoundError);
  }
};
goog.exportProperty(V86Starter.prototype, "read_file", V86Starter.prototype.read_file);
V86Starter.prototype.automatically = function($steps$jscomp$0$$) {
  const $run$$ = $steps$$ => {
    const $step$$ = $steps$$[0];
    if ($step$$) {
      var $remaining_steps$$ = $steps$$.slice(1);
      if ($step$$.sleep) {
        setTimeout(() => $run$$($remaining_steps$$), 1000 * $step$$.sleep);
      } else {
        if ($step$$.vga_text) {
          const $screen$$ = this.screen_adapter.get_text_screen();
          for (let $line$$ of $screen$$) {
            if ($line$$.includes($step$$.vga_text)) {
              $run$$($remaining_steps$$);
              return;
            }
          }
          setTimeout(() => $run$$($steps$$), 1000);
        } else {
          $step$$.keyboard_send ? ($step$$.keyboard_send instanceof Array ? this.keyboard_send_scancodes($step$$.keyboard_send) : (dbg_assert("string" === typeof $step$$.keyboard_send), this.keyboard_send_text($step$$.keyboard_send)), $run$$($remaining_steps$$)) : $step$$.call ? ($step$$.call(), $run$$($remaining_steps$$)) : dbg_assert(!1, $step$$);
        }
      }
    }
  };
  $run$$($steps$jscomp$0$$);
};
V86Starter.prototype.read_memory = function($offset$$, $length$$) {
  return this.v86.cpu.read_blob($offset$$, $length$$);
};
V86Starter.prototype.write_memory = function($blob$$, $offset$$) {
  this.v86.cpu.write_blob($blob$$, $offset$$);
};
function FileExistsError($message$$) {
  this.message = $message$$ || "File already exists";
}
FileExistsError.prototype = Error.prototype;
function FileNotFoundError($message$$) {
  this.message = $message$$ || "File not found";
}
FileNotFoundError.prototype = Error.prototype;
"undefined" !== typeof window ? (window.V86Starter = V86Starter, window.V86 = V86Starter) : "undefined" !== typeof module && "undefined" !== typeof module.exports ? (module.exports.V86Starter = V86Starter, module.exports.V86 = V86Starter) : "function" === typeof importScripts && (self.V86Starter = V86Starter, self.V86 = V86Starter);
var WorkerBus = {Connector:function($pair$$) {
  this.listeners = {};
  this.pair = $pair$$;
  $pair$$.addEventListener("message", function($data$jscomp$194_e$$) {
    $data$jscomp$194_e$$ = $data$jscomp$194_e$$.data;
    for (var $listeners$$ = this.listeners[$data$jscomp$194_e$$[0]], $i$$ = 0; $i$$ < $listeners$$.length; $i$$++) {
      var $listener$$ = $listeners$$[$i$$];
      $listener$$.fn.call($listener$$.this_value, $data$jscomp$194_e$$[1]);
    }
  }.bind(this), !1);
}};
WorkerBus.Connector.prototype.register = function($name$$, $fn$$, $this_value$$) {
  var $listeners$$ = this.listeners[$name$$];
  void 0 === $listeners$$ && ($listeners$$ = this.listeners[$name$$] = []);
  $listeners$$.push({fn:$fn$$, this_value:$this_value$$, });
};
WorkerBus.Connector.prototype.send = function($name$$, $value$$, $transfer_list$$) {
  dbg_assert(1 <= arguments.length);
  this.pair && this.pair.postMessage([$name$$, $value$$], $transfer_list$$);
};
WorkerBus.init = function($worker$$) {
  return new WorkerBus.Connector($worker$$);
};
function DummyScreenAdapter($bus$$) {
  var $cursor_row$$, $cursor_col$$, $text_mode_data$$, $text_mode_width$$, $text_mode_height$$;
  this.bus = $bus$$;
  $bus$$.register("screen-set-mode", function($data$$) {
    this.set_mode($data$$);
  }, this);
  $bus$$.register("screen-fill-buffer-end", function($data$$) {
    this.update_buffer($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("screen-put-char", function($data$$) {
    this.put_char($data$$[0], $data$$[1], $data$$[2], $data$$[3], $data$$[4]);
  }, this);
  $bus$$.register("screen-text-scroll", function($rows$$) {
    console.log("scroll", $rows$$);
  }, this);
  $bus$$.register("screen-update-cursor", function($data$$) {
    this.update_cursor($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("screen-update-cursor-scanline", function($data$$) {
    this.update_cursor_scanline($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("screen-set-size-text", function($data$$) {
    this.set_size_text($data$$[0], $data$$[1]);
  }, this);
  $bus$$.register("screen-set-size-graphical", function($data$$) {
    this.set_size_graphical($data$$[0], $data$$[1]);
  }, this);
  this.put_char = function($p$jscomp$1_row$$, $col$$, $chr$$, $bg_color$$, $fg_color$$) {
    $p$jscomp$1_row$$ < $text_mode_height$$ && $col$$ < $text_mode_width$$ && ($p$jscomp$1_row$$ = 3 * ($p$jscomp$1_row$$ * $text_mode_width$$ + $col$$), $text_mode_data$$[$p$jscomp$1_row$$] = $chr$$, $text_mode_data$$[$p$jscomp$1_row$$ + 1] = $bg_color$$, $text_mode_data$$[$p$jscomp$1_row$$ + 2] = $fg_color$$);
  };
  this.destroy = function() {
  };
  this.set_mode = function($graphical$$) {
  };
  this.clear_screen = function() {
  };
  this.set_size_text = function($cols$$, $rows$$) {
    if ($cols$$ !== $text_mode_width$$ || $rows$$ !== $text_mode_height$$) {
      $text_mode_data$$ = new Int32Array($cols$$ * $rows$$ * 3), $text_mode_width$$ = $cols$$, $text_mode_height$$ = $rows$$;
    }
  };
  this.set_size_graphical = function($width$$, $height$$) {
  };
  this.set_scale = function($s_x$$, $s_y$$) {
  };
  this.update_cursor_scanline = function($start$$, $end$$) {
  };
  this.update_cursor = function($row$$, $col$$) {
    if ($row$$ !== $cursor_row$$ || $col$$ !== $cursor_col$$) {
      $cursor_row$$ = $row$$, $cursor_col$$ = $col$$;
    }
  };
  this.update_buffer = function($min$$, $max$$) {
  };
  this.get_text_screen = function() {
    for (var $screen$$ = [], $i$$ = 0; $i$$ < $text_mode_height$$; $i$$++) {
      $screen$$.push(this.get_text_row($i$$));
    }
    return $screen$$;
  };
  this.get_text_row = function($i$jscomp$104_offset$$) {
    var $row$$ = "";
    $i$jscomp$104_offset$$ = 3 * $i$jscomp$104_offset$$ * $text_mode_width$$;
    for (var $j$$ = 0; $j$$ < $text_mode_width$$; $j$$++) {
      $row$$ += String.fromCharCode($text_mode_data$$[$i$jscomp$104_offset$$ + 3 * $j$$]);
    }
    return $row$$;
  };
}
;const print_stats = {stats_to_string:function($cpu$$) {
  return print_stats.print_misc_stats($cpu$$) + print_stats.print_instruction_counts($cpu$$);
}, print_misc_stats:function($cpu$$) {
  let $text$$ = "";
  var $stat_names_tlb_entries$$ = "COMPILE COMPILE_SKIPPED_NO_NEW_ENTRY_POINTS COMPILE_WRONG_ADDRESS_SPACE COMPILE_CUT_OFF_AT_END_OF_PAGE COMPILE_WITH_LOOP_SAFETY COMPILE_PAGE COMPILE_PAGE/COMPILE COMPILE_BASIC_BLOCK COMPILE_DUPLICATED_BASIC_BLOCK COMPILE_WASM_BLOCK COMPILE_WASM_LOOP COMPILE_DISPATCHER COMPILE_ENTRY_POINT COMPILE_WASM_TOTAL_BYTES COMPILE_WASM_TOTAL_BYTES/COMPILE_PAGE RUN_INTERPRETED RUN_INTERPRETED_NEW_PAGE RUN_INTERPRETED_PAGE_HAS_CODE RUN_INTERPRETED_PAGE_HAS_ENTRY_AFTER_PAGE_WALK RUN_INTERPRETED_NEAR_END_OF_PAGE RUN_INTERPRETED_DIFFERENT_STATE RUN_INTERPRETED_DIFFERENT_STATE_CPL3 RUN_INTERPRETED_DIFFERENT_STATE_FLAT RUN_INTERPRETED_DIFFERENT_STATE_IS32 RUN_INTERPRETED_DIFFERENT_STATE_SS32 RUN_INTERPRETED_MISSED_COMPILED_ENTRY_RUN_INTERPRETED RUN_INTERPRETED_STEPS RUN_FROM_CACHE RUN_FROM_CACHE_STEPS RUN_FROM_CACHE_STEPS/RUN_FROM_CACHE RUN_FROM_CACHE_STEPS/RUN_INTERPRETED_STEPS DIRECT_EXIT INDIRECT_JUMP INDIRECT_JUMP_NO_ENTRY NORMAL_PAGE_CHANGE NORMAL_FALLTHRU NORMAL_FALLTHRU_WITH_TARGET_BLOCK NORMAL_BRANCH NORMAL_BRANCH_WITH_TARGET_BLOCK CONDITIONAL_JUMP CONDITIONAL_JUMP_PAGE_CHANGE CONDITIONAL_JUMP_EXIT CONDITIONAL_JUMP_FALLTHRU CONDITIONAL_JUMP_FALLTHRU_WITH_TARGET_BLOCK CONDITIONAL_JUMP_BRANCH CONDITIONAL_JUMP_BRANCH_WITH_TARGET_BLOCK DISPATCHER_SMALL DISPATCHER_LARGE LOOP LOOP_SAFETY CONDITION_OPTIMISED CONDITION_UNOPTIMISED CONDITION_UNOPTIMISED_PF CONDITION_UNOPTIMISED_UNHANDLED_L CONDITION_UNOPTIMISED_UNHANDLED_LE FAILED_PAGE_CHANGE SAFE_READ_FAST SAFE_READ_SLOW_PAGE_CROSSED SAFE_READ_SLOW_NOT_VALID SAFE_READ_SLOW_NOT_USER SAFE_READ_SLOW_IN_MAPPED_RANGE SAFE_WRITE_FAST SAFE_WRITE_SLOW_PAGE_CROSSED SAFE_WRITE_SLOW_NOT_VALID SAFE_WRITE_SLOW_NOT_USER SAFE_WRITE_SLOW_IN_MAPPED_RANGE SAFE_WRITE_SLOW_READ_ONLY SAFE_WRITE_SLOW_HAS_CODE SAFE_READ_WRITE_FAST SAFE_READ_WRITE_SLOW_PAGE_CROSSED SAFE_READ_WRITE_SLOW_NOT_VALID SAFE_READ_WRITE_SLOW_NOT_USER SAFE_READ_WRITE_SLOW_IN_MAPPED_RANGE SAFE_READ_WRITE_SLOW_READ_ONLY SAFE_READ_WRITE_SLOW_HAS_CODE PAGE_FAULT TLB_MISS DO_MANY_CYCLES CYCLE_INTERNAL INVALIDATE_ALL_MODULES_NO_FREE_WASM_INDICES INVALIDATE_MODULE_WRITTEN_WHILE_COMPILED INVALIDATE_MODULE_UNUSED_AFTER_OVERWRITE INVALIDATE_MODULE_DIRTY_PAGE INVALIDATE_PAGE_HAD_CODE INVALIDATE_PAGE_HAD_ENTRY_POINTS DIRTY_PAGE_DID_NOT_HAVE_CODE RUN_FROM_CACHE_EXIT_SAME_PAGE RUN_FROM_CACHE_EXIT_NEAR_END_OF_PAGE RUN_FROM_CACHE_EXIT_DIFFERENT_PAGE CLEAR_TLB FULL_CLEAR_TLB TLB_FULL TLB_GLOBAL_FULL MODRM_SIMPLE_REG MODRM_SIMPLE_REG_WITH_OFFSET MODRM_SIMPLE_CONST_OFFSET MODRM_COMPLEX SEG_OFFSET_OPTIMISED SEG_OFFSET_NOT_OPTIMISED SEG_OFFSET_NOT_OPTIMISED_ES SEG_OFFSET_NOT_OPTIMISED_FS SEG_OFFSET_NOT_OPTIMISED_GS SEG_OFFSET_NOT_OPTIMISED_NOT_FLAT".split(" "), 
  $global_tlb_entries_j$$ = 0;
  const $stat_values$$ = {};
  for (let $i$$ = 0; $i$$ < $stat_names_tlb_entries$$.length; $i$$++) {
    const $name$$ = $stat_names_tlb_entries$$[$i$$];
    var $stat_value$$ = void 0;
    if ($name$$.includes("/")) {
      $global_tlb_entries_j$$++;
      const [$left$$, $right$$] = $name$$.split("/");
      $stat_value$$ = $stat_values$$[$left$$] / $stat_values$$[$right$$];
    } else {
      $stat_value$$ = $stat_values$$[$name$$] = $cpu$$.wm.exports.profiler_stat_get($i$$ - $global_tlb_entries_j$$), $stat_value$$ = 100e6 <= $stat_value$$ ? Math.round($stat_value$$ / 1e6) + "m" : 100e3 <= $stat_value$$ ? Math.round($stat_value$$ / 1e3) + "k" : $stat_value$$;
    }
    $text$$ += $name$$ + "=" + $stat_value$$ + "\n";
  }
  $text$$ += "\n";
  $stat_names_tlb_entries$$ = $cpu$$.wm.exports.get_valid_tlb_entries_count();
  $global_tlb_entries_j$$ = $cpu$$.wm.exports.get_valid_global_tlb_entries_count();
  $text$$ = $text$$ + ("TLB_ENTRIES=" + $stat_names_tlb_entries$$ + " (" + $global_tlb_entries_j$$ + " global, " + ($stat_names_tlb_entries$$ - $global_tlb_entries_j$$) + " non-global)\nWASM_TABLE_FREE=") + ($cpu$$.wm.exports.jit_get_wasm_table_index_free_list_count() + "\n");
  $text$$ += "JIT_CACHE_SIZE=" + $cpu$$.wm.exports.jit_get_cache_size() + "\n";
  $text$$ += "FLAT_SEGMENTS=" + $cpu$$.wm.exports.has_flat_segmentation() + "\n";
  $text$$ += "do_many_cycles avg: " + ($cpu$$.do_many_cycles_total / $cpu$$.do_many_cycles_count || 0) + "\n";
  $text$$ += "wasm memory size: " + ($cpu$$.wasm_memory.buffer.byteLength >> 20) + "m\n";
  $text$$ = $text$$ + "Config:\nMAX_PAGES=" + ($cpu$$.wm.exports.get_jit_config(0) + "\n");
  $text$$ += "JIT_USE_LOOP_SAFETY=" + !!$cpu$$.wm.exports.get_jit_config(1) + "\n";
  return $text$$ += "MAX_EXTRA_BASIC_BLOCKS=" + $cpu$$.wm.exports.get_jit_config(2) + "\n";
}, print_instruction_counts:function($cpu$$) {
  return [print_stats.print_instruction_counts_offset($cpu$$, !1, !1, !1, !1), print_stats.print_instruction_counts_offset($cpu$$, !0, !1, !1, !1), print_stats.print_instruction_counts_offset($cpu$$, !1, !0, !1, !1), print_stats.print_instruction_counts_offset($cpu$$, !1, !1, !0, !1), print_stats.print_instruction_counts_offset($cpu$$, !1, !1, !1, !0), ].join("\n\n");
}, print_instruction_counts_offset:function($cpu$jscomp$27_total$$, $compiled_per_opcode0f_prefixes$$, $jit_exit_per_opcode$$, $max_count_pad_length_unguarded_register$$, $i$$) {
  let $text$$ = "";
  var $counts_opcode_description_top_counts$$ = [], $i$jscomp$107_label$$ = $compiled_per_opcode0f_prefixes$$ ? "compiled" : $jit_exit_per_opcode$$ ? "jit exit" : $max_count_pad_length_unguarded_register$$ ? "unguarded register" : $i$$ ? "wasm size" : "executed";
  for (let $opcode$$ = 0; 256 > $opcode$$; $opcode$$++) {
    for (let $fixed_g$$ = 0; 8 > $fixed_g$$; $fixed_g$$++) {
      for (let $is_mem$$ of [!1, !0]) {
        var $count$jscomp$0$$ = $cpu$jscomp$27_total$$.wm.exports.get_opstats_buffer($compiled_per_opcode0f_prefixes$$, $jit_exit_per_opcode$$, $max_count_pad_length_unguarded_register$$, $i$$, $opcode$$, !1, $is_mem$$, $fixed_g$$);
        $counts_opcode_description_top_counts$$.push({opcode:$opcode$$, count:$count$jscomp$0$$, is_mem:$is_mem$$, fixed_g:$fixed_g$$});
        $count$jscomp$0$$ = $cpu$jscomp$27_total$$.wm.exports.get_opstats_buffer($compiled_per_opcode0f_prefixes$$, $jit_exit_per_opcode$$, $max_count_pad_length_unguarded_register$$, $i$$, $opcode$$, !0, $is_mem$$, $fixed_g$$);
        $counts_opcode_description_top_counts$$.push({opcode:3840 | $opcode$$, count:$count$jscomp$0$$, is_mem:$is_mem$$, fixed_g:$fixed_g$$});
      }
    }
  }
  $cpu$jscomp$27_total$$ = 0;
  $compiled_per_opcode0f_prefixes$$ = new Set([38, 46, 54, 62, 100, 101, 102, 103, 240, 242, 243, ]);
  for (let {count:$count$$, opcode:$opcode$$} of $counts_opcode_description_top_counts$$) {
    $compiled_per_opcode0f_prefixes$$.has($opcode$$) || ($cpu$jscomp$27_total$$ += $count$$);
  }
  if (0 === $cpu$jscomp$27_total$$) {
    return "";
  }
  $jit_exit_per_opcode$$ = new Uint32Array(256);
  $compiled_per_opcode0f_prefixes$$ = new Uint32Array(256);
  for (let {opcode:$opcode$$, count:$count$$} of $counts_opcode_description_top_counts$$) {
    3840 == ($opcode$$ & 65280) ? $compiled_per_opcode0f_prefixes$$[$opcode$$ & 255] += $count$$ : $jit_exit_per_opcode$$[$opcode$$ & 255] += $count$$;
  }
  $text$$ = $text$$ + "------------------\nTotal: " + ($cpu$jscomp$27_total$$ + "\n");
  const $factor$$ = 1e7 < $cpu$jscomp$27_total$$ ? 1000 : 1;
  $max_count_pad_length_unguarded_register$$ = Math.max.apply(Math, $counts_opcode_description_top_counts$$.map(({count:$count$$}) => Math.round($count$$ / $factor$$)));
  $max_count_pad_length_unguarded_register$$ = String($max_count_pad_length_unguarded_register$$).length;
  $text$$ += `Instruction counts ${$i$jscomp$107_label$$} (in ${$factor$$}):\n`;
  for ($i$$ = 0; 256 > $i$$; $i$$++) {
    $text$$ += $i$$.toString(16).padStart(2, "0") + ":" + v86util.pads(Math.round($jit_exit_per_opcode$$[$i$$] / $factor$$), $max_count_pad_length_unguarded_register$$), $text$$ = 15 == $i$$ % 16 ? $text$$ + "\n" : $text$$ + " ";
  }
  $text$$ = $text$$ + "\n" + `Instruction counts ${$i$jscomp$107_label$$} (0f, in ${$factor$$}):\n`;
  for ($i$jscomp$107_label$$ = 0; 256 > $i$jscomp$107_label$$; $i$jscomp$107_label$$++) {
    $text$$ += ($i$jscomp$107_label$$ & 255).toString(16).padStart(2, "0") + ":" + v86util.pads(Math.round($compiled_per_opcode0f_prefixes$$[$i$jscomp$107_label$$] / $factor$$), $max_count_pad_length_unguarded_register$$), $text$$ = 15 == $i$jscomp$107_label$$ % 16 ? $text$$ + "\n" : $text$$ + " ";
  }
  $text$$ += "\n";
  $counts_opcode_description_top_counts$$ = $counts_opcode_description_top_counts$$.filter(({count:$count$$}) => $count$$).sort(({count:$count1$$}, {count:$count2$$}) => $count2$$ - $count1$$);
  for (let {opcode:$opcode$$, is_mem:$is_mem$$, fixed_g:$fixed_g$$, count:$count$$} of $counts_opcode_description_top_counts$$.slice(0, 200)) {
    $counts_opcode_description_top_counts$$ = $opcode$$.toString(16) + "_" + $fixed_g$$ + ($is_mem$$ ? "_m" : "_r"), $text$$ += $counts_opcode_description_top_counts$$ + ":" + ($count$$ / $cpu$jscomp$27_total$$ * 100).toFixed(2) + " ";
  }
  return $text$$ + "\n";
}, };
"undefined" !== typeof module && "undefined" !== typeof module.exports && (module.exports.print_stats = print_stats);
function FileStorageInterface() {
}
FileStorageInterface.prototype.read = function($sha256sum$$, $offset$$, $count$$) {
};
FileStorageInterface.prototype.cache = function($sha256sum$$, $data$$) {
};
FileStorageInterface.prototype.uncache = function($sha256sum$$) {
};
function MemoryFileStorage() {
  this.filedata = new Map;
}
MemoryFileStorage.prototype.read = async function($data$jscomp$203_sha256sum$$, $offset$$, $count$$) {
  dbg_assert($data$jscomp$203_sha256sum$$, "MemoryFileStorage read: sha256sum should be a non-empty string");
  return ($data$jscomp$203_sha256sum$$ = this.filedata.get($data$jscomp$203_sha256sum$$)) ? $data$jscomp$203_sha256sum$$.subarray($offset$$, $offset$$ + $count$$) : null;
};
MemoryFileStorage.prototype.cache = async function($sha256sum$$, $data$$) {
  dbg_assert($sha256sum$$, "MemoryFileStorage cache: sha256sum should be a non-empty string");
  this.filedata.set($sha256sum$$, $data$$);
};
MemoryFileStorage.prototype.uncache = function($sha256sum$$) {
  this.filedata.delete($sha256sum$$);
};
function ServerFileStorageWrapper($file_storage$$, $baseurl$$) {
  dbg_assert($baseurl$$, "ServerMemoryFileStorage: baseurl should not be empty");
  this.storage = $file_storage$$;
  this.baseurl = $baseurl$$;
}
ServerFileStorageWrapper.prototype.load_from_server = function($sha256sum$$) {
  return new Promise(($resolve$$, $reject$$) => {
    v86util.load_file(this.baseurl + $sha256sum$$, {done:async $buffer$jscomp$49_data$$ => {
      $buffer$jscomp$49_data$$ = new Uint8Array($buffer$jscomp$49_data$$);
      await this.cache($sha256sum$$, $buffer$jscomp$49_data$$);
      $resolve$$($buffer$jscomp$49_data$$);
    }});
  });
};
ServerFileStorageWrapper.prototype.read = async function($sha256sum$$, $offset$$, $count$$) {
  const $data$$ = await this.storage.read($sha256sum$$, $offset$$, $count$$);
  return $data$$ ? $data$$ : (await this.load_from_server($sha256sum$$)).subarray($offset$$, $offset$$ + $count$$);
};
ServerFileStorageWrapper.prototype.cache = async function($sha256sum$$, $data$$) {
  return await this.storage.cache($sha256sum$$, $data$$);
};
ServerFileStorageWrapper.prototype.uncache = function($sha256sum$$) {
  this.storage.uncache($sha256sum$$);
};
"undefined" !== typeof window ? (window.MemoryFileStorage = MemoryFileStorage, window.ServerFileStorageWrapper = ServerFileStorageWrapper) : "undefined" !== typeof module && "undefined" !== typeof module.exports ? (module.exports.MemoryFileStorage = MemoryFileStorage, module.exports.ServerFileStorageWrapper = ServerFileStorageWrapper) : "function" === typeof importScripts && (self.MemoryFileStorage = MemoryFileStorage, self.ServerFileStorageWrapper = ServerFileStorageWrapper);
var S_IRWXUGO = 511, S_IFMT = 61440, S_IFSOCK = 49152, S_IFLNK = 40960, S_IFREG = 32768, S_IFBLK = 24576, S_IFDIR = 16384, S_IFCHR = 8192, O_RDONLY = 0, O_WRONLY = 1, O_RDWR = 2, O_ACCMODE = 3, STATUS_INVALID = -1, STATUS_OK = 0, STATUS_ON_STORAGE = 2, STATUS_UNLINKED = 4, STATUS_FORWARDING = 5, JSONFS_VERSION = 3, JSONFS_IDX_NAME = 0, JSONFS_IDX_SIZE = 1, JSONFS_IDX_MTIME = 2, JSONFS_IDX_MODE = 3, JSONFS_IDX_UID = 4, JSONFS_IDX_GID = 5, JSONFS_IDX_TARGET = 6, JSONFS_IDX_SHA256 = 6;
function FS($storage$$, $qidcounter$$) {
  this.inodes = [];
  this.events = [];
  this.storage = $storage$$;
  this.qidcounter = $qidcounter$$ || {last_qidnumber:0};
  this.inodedata = {};
  this.total_size = 274877906944;
  this.used_size = 0;
  this.mounts = [];
  this.CreateDirectory("", -1);
}
FS.prototype.get_state = function() {
  let $state$$ = [];
  $state$$[0] = this.inodes;
  $state$$[1] = this.qidcounter.last_qidnumber;
  $state$$[2] = [];
  for (const [$id$$, $data$$] of Object.entries(this.inodedata)) {
    0 === (this.inodes[$id$$].mode & S_IFDIR) && $state$$[2].push([$id$$, $data$$]);
  }
  $state$$[3] = this.total_size;
  $state$$[4] = this.used_size;
  return $state$$ = $state$$.concat(this.mounts);
};
FS.prototype.set_state = function($state$jscomp$0$$) {
  this.inodes = $state$jscomp$0$$[0].map($state$$ => {
    const $inode$$ = new Inode(0);
    $inode$$.set_state($state$$);
    return $inode$$;
  });
  this.qidcounter.last_qidnumber = $state$jscomp$0$$[1];
  this.inodedata = {};
  for (let [$key$$, $value$$] of $state$jscomp$0$$[2]) {
    $value$$.buffer.byteLength !== $value$$.byteLength && ($value$$ = $value$$.slice()), this.inodedata[$key$$] = $value$$;
  }
  this.total_size = $state$jscomp$0$$[3];
  this.used_size = $state$jscomp$0$$[4];
  this.mounts = $state$jscomp$0$$.slice(5);
};
FS.prototype.AddEvent = function($id$$, $OnEvent$$) {
  var $inode$$ = this.inodes[$id$$];
  $inode$$.status == STATUS_OK || $inode$$.status == STATUS_ON_STORAGE ? $OnEvent$$() : this.is_forwarder($inode$$) ? this.follow_fs($inode$$).AddEvent($inode$$.foreign_id, $OnEvent$$) : this.events.push({id:$id$$, OnEvent:$OnEvent$$});
};
FS.prototype.HandleEvent = function($id$$) {
  var $inode$$ = this.inodes[$id$$];
  this.is_forwarder($inode$$) && this.follow_fs($inode$$).HandleEvent($inode$$.foreign_id);
  $inode$$ = [];
  for (var $i$$ = 0; $i$$ < this.events.length; $i$$++) {
    this.events[$i$$].id == $id$$ ? this.events[$i$$].OnEvent() : $inode$$.push(this.events[$i$$]);
  }
  this.events = $inode$$;
};
FS.prototype.load_from_json = function($fs$jscomp$3_i$$, $done$$) {
  dbg_assert($fs$jscomp$3_i$$, "Invalid fs passed to load_from_json");
  if ($fs$jscomp$3_i$$.version !== JSONFS_VERSION) {
    throw "The filesystem JSON format has changed. Please update your fs2json (https://github.com/copy/fs2json) and recreate the filesystem JSON.";
  }
  var $fsroot$$ = $fs$jscomp$3_i$$.fsroot;
  this.used_size = $fs$jscomp$3_i$$.size;
  for ($fs$jscomp$3_i$$ = 0; $fs$jscomp$3_i$$ < $fsroot$$.length; $fs$jscomp$3_i$$++) {
    this.LoadRecursive($fsroot$$[$fs$jscomp$3_i$$], 0);
  }
  $done$$ && $done$$();
};
FS.prototype.LoadRecursive = function($data$$, $parentid$$) {
  var $inode$$ = this.CreateInode();
  const $name$$ = $data$$[JSONFS_IDX_NAME];
  $inode$$.size = $data$$[JSONFS_IDX_SIZE];
  $inode$$.mtime = $data$$[JSONFS_IDX_MTIME];
  $inode$$.ctime = $inode$$.mtime;
  $inode$$.atime = $inode$$.mtime;
  $inode$$.mode = $data$$[JSONFS_IDX_MODE];
  $inode$$.uid = $data$$[JSONFS_IDX_UID];
  $inode$$.gid = $data$$[JSONFS_IDX_GID];
  var $ifmt$$ = $inode$$.mode & S_IFMT;
  $ifmt$$ === S_IFDIR ? (this.PushInode($inode$$, $parentid$$, $name$$), this.LoadDir(this.inodes.length - 1, $data$$[JSONFS_IDX_TARGET])) : $ifmt$$ === S_IFREG ? ($inode$$.status = STATUS_ON_STORAGE, $inode$$.sha256sum = $data$$[JSONFS_IDX_SHA256], dbg_assert($inode$$.sha256sum), this.PushInode($inode$$, $parentid$$, $name$$)) : $ifmt$$ === S_IFLNK ? ($inode$$.symlink = $data$$[JSONFS_IDX_TARGET], this.PushInode($inode$$, $parentid$$, $name$$)) : $ifmt$$ !== S_IFSOCK && dbg_log("Unexpected ifmt: " + 
  h($ifmt$$) + " (" + $name$$ + ")");
};
FS.prototype.LoadDir = function($parentid$$, $children$$) {
  for (var $i$$ = 0; $i$$ < $children$$.length; $i$$++) {
    this.LoadRecursive($children$$[$i$$], $parentid$$);
  }
};
FS.prototype.should_be_linked = function($inode$$) {
  return !this.is_forwarder($inode$$) || 0 === $inode$$.foreign_id;
};
FS.prototype.link_under_dir = function($parentid$$, $idx$$, $name$$) {
  const $inode$$ = this.inodes[$idx$$], $parent_inode$$ = this.inodes[$parentid$$];
  dbg_assert(!this.is_forwarder($parent_inode$$), "Filesystem: Shouldn't link under fowarder parents");
  dbg_assert(this.IsDirectory($parentid$$), "Filesystem: Can't link under non-directories");
  dbg_assert(this.should_be_linked($inode$$), "Filesystem: Can't link across filesystems apart from their root");
  dbg_assert(0 <= $inode$$.nlinks, "Filesystem: Found negative nlinks value of " + $inode$$.nlinks);
  dbg_assert(!$parent_inode$$.direntries.has($name$$), "Filesystem: Name '" + $name$$ + "' is already taken");
  $parent_inode$$.direntries.set($name$$, $idx$$);
  $inode$$.nlinks++;
  this.IsDirectory($idx$$) && (dbg_assert(!$inode$$.direntries.has(".."), "Filesystem: Cannot link a directory twice"), $inode$$.direntries.has(".") || $inode$$.nlinks++, $inode$$.direntries.set(".", $idx$$), $inode$$.direntries.set("..", $parentid$$), $parent_inode$$.nlinks++);
};
FS.prototype.unlink_from_dir = function($parentid$$, $name$$) {
  const $idx$$ = this.Search($parentid$$, $name$$), $inode$$ = this.inodes[$idx$$], $parent_inode$$ = this.inodes[$parentid$$];
  dbg_assert(!this.is_forwarder($parent_inode$$), "Filesystem: Can't unlink from forwarders");
  dbg_assert(this.IsDirectory($parentid$$), "Filesystem: Can't unlink from non-directories");
  $parent_inode$$.direntries.delete($name$$) ? ($inode$$.nlinks--, this.IsDirectory($idx$$) && (dbg_assert($inode$$.direntries.get("..") === $parentid$$, "Filesystem: Found directory with bad parent id"), $inode$$.direntries.delete(".."), $parent_inode$$.nlinks--), dbg_assert(0 <= $inode$$.nlinks, "Filesystem: Found negative nlinks value of " + $inode$$.nlinks)) : dbg_assert(!1, "Filesystem: Can't unlink non-existent file: " + $name$$);
};
FS.prototype.PushInode = function($inode$$, $parentid$$, $name$$) {
  -1 != $parentid$$ ? (this.inodes.push($inode$$), $inode$$.fid = this.inodes.length - 1, this.link_under_dir($parentid$$, $inode$$.fid, $name$$)) : 0 == this.inodes.length ? (this.inodes.push($inode$$), $inode$$.direntries.set(".", 0), $inode$$.direntries.set("..", 0), $inode$$.nlinks = 2) : (message.Debug("Error in Filesystem: Pushed inode with name = " + $name$$ + " has no parent"), message.Abort());
};
function Inode($qidnumber$$) {
  this.direntries = new Map;
  this.minor = this.major = this.mtime = this.atime = this.ctime = this.fid = this.gid = this.uid = this.size = this.status = 0;
  this.symlink = "";
  this.mode = 493;
  this.qid = {type:0, version:0, path:$qidnumber$$, };
  this.caps = void 0;
  this.nlinks = 0;
  this.sha256sum = "";
  this.locks = [];
  this.foreign_id = this.mount_id = -1;
}
Inode.prototype.get_state = function() {
  const $state$$ = [];
  $state$$[0] = this.mode;
  $state$$[1] = (this.mode & S_IFMT) === S_IFDIR ? [...this.direntries] : (this.mode & S_IFMT) === S_IFREG ? this.sha256sum : (this.mode & S_IFMT) === S_IFLNK ? this.symlink : (this.mode & S_IFMT) === S_IFSOCK ? [this.minor, this.major] : null;
  $state$$[2] = this.locks;
  $state$$[3] = this.status;
  $state$$[4] = this.size;
  $state$$[5] = this.uid;
  $state$$[6] = this.gid;
  $state$$[7] = this.fid;
  $state$$[8] = this.ctime;
  $state$$[9] = this.atime;
  $state$$[10] = this.mtime;
  $state$$[11] = this.qid.version;
  $state$$[12] = this.qid.path;
  $state$$[13] = this.nlinks;
  return $state$$;
};
Inode.prototype.set_state = function($state$$) {
  this.mode = $state$$[0];
  if ((this.mode & S_IFMT) === S_IFDIR) {
    this.direntries = new Map;
    for (const [$name$$, $entry$$] of $state$$[1]) {
      this.direntries.set($name$$, $entry$$);
    }
  } else {
    (this.mode & S_IFMT) === S_IFREG ? this.sha256sum = $state$$[1] : (this.mode & S_IFMT) === S_IFLNK ? this.symlink = $state$$[1] : (this.mode & S_IFMT) === S_IFSOCK && ([this.minor, this.major] = $state$$[1]);
  }
  this.locks = [];
  for (const $lock_state$$ of $state$$[2]) {
    const $lock$$ = new FSLockRegion;
    $lock$$.set_state($lock_state$$);
    this.locks.push($lock$$);
  }
  this.status = $state$$[3];
  this.size = $state$$[4];
  this.uid = $state$$[5];
  this.gid = $state$$[6];
  this.fid = $state$$[7];
  this.ctime = $state$$[8];
  this.atime = $state$$[9];
  this.mtime = $state$$[10];
  this.qid.type = (this.mode & S_IFMT) >> 8;
  this.qid.version = $state$$[11];
  this.qid.path = $state$$[12];
  this.nlinks = $state$$[13];
};
FS.prototype.divert = function($parentid$$, $filename$$) {
  const $old_idx$$ = this.Search($parentid$$, $filename$$), $old_inode$$ = this.inodes[$old_idx$$], $new_inode$$ = new Inode(-1);
  dbg_assert($old_inode$$, "Filesystem divert: name (" + $filename$$ + ") not found");
  dbg_assert(this.IsDirectory($old_idx$$) || 1 >= $old_inode$$.nlinks, "Filesystem: can't divert hardlinked file '" + $filename$$ + "' with nlinks=" + $old_inode$$.nlinks);
  Object.assign($new_inode$$, $old_inode$$);
  const $idx$$ = this.inodes.length;
  this.inodes.push($new_inode$$);
  $new_inode$$.fid = $idx$$;
  this.is_forwarder($old_inode$$) && this.mounts[$old_inode$$.mount_id].backtrack.set($old_inode$$.foreign_id, $idx$$);
  this.should_be_linked($old_inode$$) && (this.unlink_from_dir($parentid$$, $filename$$), this.link_under_dir($parentid$$, $idx$$, $filename$$));
  if (this.IsDirectory($old_idx$$) && !this.is_forwarder($old_inode$$)) {
    for (const [$name$$, $child_id$$] of $new_inode$$.direntries) {
      "." !== $name$$ && ".." !== $name$$ && this.IsDirectory($child_id$$) && this.inodes[$child_id$$].direntries.set("..", $idx$$);
    }
  }
  this.inodedata[$idx$$] = this.inodedata[$old_idx$$];
  delete this.inodedata[$old_idx$$];
  $old_inode$$.direntries = new Map;
  $old_inode$$.nlinks = 0;
  return $idx$$;
};
FS.prototype.copy_inode = function($src_inode$$, $dest_inode$$) {
  Object.assign($dest_inode$$, $src_inode$$, {fid:$dest_inode$$.fid, direntries:$dest_inode$$.direntries, nlinks:$dest_inode$$.nlinks, });
};
FS.prototype.CreateInode = function() {
  const $now$$ = Math.round(Date.now() / 1000), $inode$$ = new Inode(++this.qidcounter.last_qidnumber);
  $inode$$.atime = $inode$$.ctime = $inode$$.mtime = $now$$;
  return $inode$$;
};
FS.prototype.CreateDirectory = function($foreign_id_name$$, $foreign_parentid_parentid$$) {
  var $parent_inode$jscomp$2_x$$ = this.inodes[$foreign_parentid_parentid$$];
  if (0 <= $foreign_parentid_parentid$$ && this.is_forwarder($parent_inode$jscomp$2_x$$)) {
    return $foreign_parentid_parentid$$ = $parent_inode$jscomp$2_x$$.foreign_id, $foreign_id_name$$ = this.follow_fs($parent_inode$jscomp$2_x$$).CreateDirectory($foreign_id_name$$, $foreign_parentid_parentid$$), this.create_forwarder($parent_inode$jscomp$2_x$$.mount_id, $foreign_id_name$$);
  }
  $parent_inode$jscomp$2_x$$ = this.CreateInode();
  $parent_inode$jscomp$2_x$$.mode = 511 | S_IFDIR;
  0 <= $foreign_parentid_parentid$$ && ($parent_inode$jscomp$2_x$$.uid = this.inodes[$foreign_parentid_parentid$$].uid, $parent_inode$jscomp$2_x$$.gid = this.inodes[$foreign_parentid_parentid$$].gid, $parent_inode$jscomp$2_x$$.mode = this.inodes[$foreign_parentid_parentid$$].mode & 511 | S_IFDIR);
  $parent_inode$jscomp$2_x$$.qid.type = S_IFDIR >> 8;
  this.PushInode($parent_inode$jscomp$2_x$$, $foreign_parentid_parentid$$, $foreign_id_name$$);
  this.NotifyListeners(this.inodes.length - 1, "newdir");
  return this.inodes.length - 1;
};
FS.prototype.CreateFile = function($filename$jscomp$9_foreign_id$$, $foreign_parentid$jscomp$1_parentid$$) {
  var $parent_inode$jscomp$3_x$$ = this.inodes[$foreign_parentid$jscomp$1_parentid$$];
  if (this.is_forwarder($parent_inode$jscomp$3_x$$)) {
    return $foreign_parentid$jscomp$1_parentid$$ = $parent_inode$jscomp$3_x$$.foreign_id, $filename$jscomp$9_foreign_id$$ = this.follow_fs($parent_inode$jscomp$3_x$$).CreateFile($filename$jscomp$9_foreign_id$$, $foreign_parentid$jscomp$1_parentid$$), this.create_forwarder($parent_inode$jscomp$3_x$$.mount_id, $filename$jscomp$9_foreign_id$$);
  }
  $parent_inode$jscomp$3_x$$ = this.CreateInode();
  $parent_inode$jscomp$3_x$$.uid = this.inodes[$foreign_parentid$jscomp$1_parentid$$].uid;
  $parent_inode$jscomp$3_x$$.gid = this.inodes[$foreign_parentid$jscomp$1_parentid$$].gid;
  $parent_inode$jscomp$3_x$$.qid.type = S_IFREG >> 8;
  $parent_inode$jscomp$3_x$$.mode = this.inodes[$foreign_parentid$jscomp$1_parentid$$].mode & 438 | S_IFREG;
  this.PushInode($parent_inode$jscomp$3_x$$, $foreign_parentid$jscomp$1_parentid$$, $filename$jscomp$9_foreign_id$$);
  this.NotifyListeners(this.inodes.length - 1, "newfile");
  return this.inodes.length - 1;
};
FS.prototype.CreateNode = function($filename$jscomp$10_foreign_id$$, $foreign_parentid$jscomp$2_parentid$$, $major$$, $minor$$) {
  var $parent_inode$jscomp$4_x$$ = this.inodes[$foreign_parentid$jscomp$2_parentid$$];
  if (this.is_forwarder($parent_inode$jscomp$4_x$$)) {
    return $foreign_parentid$jscomp$2_parentid$$ = $parent_inode$jscomp$4_x$$.foreign_id, $filename$jscomp$10_foreign_id$$ = this.follow_fs($parent_inode$jscomp$4_x$$).CreateNode($filename$jscomp$10_foreign_id$$, $foreign_parentid$jscomp$2_parentid$$, $major$$, $minor$$), this.create_forwarder($parent_inode$jscomp$4_x$$.mount_id, $filename$jscomp$10_foreign_id$$);
  }
  $parent_inode$jscomp$4_x$$ = this.CreateInode();
  $parent_inode$jscomp$4_x$$.major = $major$$;
  $parent_inode$jscomp$4_x$$.minor = $minor$$;
  $parent_inode$jscomp$4_x$$.uid = this.inodes[$foreign_parentid$jscomp$2_parentid$$].uid;
  $parent_inode$jscomp$4_x$$.gid = this.inodes[$foreign_parentid$jscomp$2_parentid$$].gid;
  $parent_inode$jscomp$4_x$$.qid.type = S_IFSOCK >> 8;
  $parent_inode$jscomp$4_x$$.mode = this.inodes[$foreign_parentid$jscomp$2_parentid$$].mode & 438;
  this.PushInode($parent_inode$jscomp$4_x$$, $foreign_parentid$jscomp$2_parentid$$, $filename$jscomp$10_foreign_id$$);
  return this.inodes.length - 1;
};
FS.prototype.CreateSymlink = function($filename$jscomp$11_foreign_id$$, $foreign_parentid$jscomp$3_parentid$$, $symlink$$) {
  var $parent_inode$jscomp$5_x$$ = this.inodes[$foreign_parentid$jscomp$3_parentid$$];
  if (this.is_forwarder($parent_inode$jscomp$5_x$$)) {
    return $foreign_parentid$jscomp$3_parentid$$ = $parent_inode$jscomp$5_x$$.foreign_id, $filename$jscomp$11_foreign_id$$ = this.follow_fs($parent_inode$jscomp$5_x$$).CreateSymlink($filename$jscomp$11_foreign_id$$, $foreign_parentid$jscomp$3_parentid$$, $symlink$$), this.create_forwarder($parent_inode$jscomp$5_x$$.mount_id, $filename$jscomp$11_foreign_id$$);
  }
  $parent_inode$jscomp$5_x$$ = this.CreateInode();
  $parent_inode$jscomp$5_x$$.uid = this.inodes[$foreign_parentid$jscomp$3_parentid$$].uid;
  $parent_inode$jscomp$5_x$$.gid = this.inodes[$foreign_parentid$jscomp$3_parentid$$].gid;
  $parent_inode$jscomp$5_x$$.qid.type = S_IFLNK >> 8;
  $parent_inode$jscomp$5_x$$.symlink = $symlink$$;
  $parent_inode$jscomp$5_x$$.mode = S_IFLNK;
  this.PushInode($parent_inode$jscomp$5_x$$, $foreign_parentid$jscomp$3_parentid$$, $filename$jscomp$11_foreign_id$$);
  return this.inodes.length - 1;
};
FS.prototype.CreateTextFile = async function($data$jscomp$210_filename$$, $foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$, $foreign_id$jscomp$4_str$$) {
  var $id$jscomp$12_parent_inode$$ = this.inodes[$foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$];
  if (this.is_forwarder($id$jscomp$12_parent_inode$$)) {
    return $foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$ = $id$jscomp$12_parent_inode$$.foreign_id, $foreign_id$jscomp$4_str$$ = await this.follow_fs($id$jscomp$12_parent_inode$$).CreateTextFile($data$jscomp$210_filename$$, $foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$, $foreign_id$jscomp$4_str$$), this.create_forwarder($id$jscomp$12_parent_inode$$.mount_id, $foreign_id$jscomp$4_str$$);
  }
  $id$jscomp$12_parent_inode$$ = this.CreateFile($data$jscomp$210_filename$$, $foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$);
  $foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$ = this.inodes[$id$jscomp$12_parent_inode$$];
  $data$jscomp$210_filename$$ = new Uint8Array($foreign_id$jscomp$4_str$$.length);
  $foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$.size = $foreign_id$jscomp$4_str$$.length;
  for ($foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$ = 0; $foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$ < $foreign_id$jscomp$4_str$$.length; $foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$++) {
    $data$jscomp$210_filename$$[$foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$] = $foreign_id$jscomp$4_str$$.charCodeAt($foreign_parentid$jscomp$4_j$jscomp$14_parentid$jscomp$10_x$$);
  }
  await this.set_data($id$jscomp$12_parent_inode$$, $data$jscomp$210_filename$$);
  return $id$jscomp$12_parent_inode$$;
};
FS.prototype.CreateBinaryFile = async function($filename$jscomp$13_x$$, $data$jscomp$211_foreign_parentid$jscomp$5_parentid$$, $buffer$jscomp$50_foreign_id$$) {
  var $id$jscomp$13_parent_inode$$ = this.inodes[$data$jscomp$211_foreign_parentid$jscomp$5_parentid$$];
  if (this.is_forwarder($id$jscomp$13_parent_inode$$)) {
    return $data$jscomp$211_foreign_parentid$jscomp$5_parentid$$ = $id$jscomp$13_parent_inode$$.foreign_id, $buffer$jscomp$50_foreign_id$$ = await this.follow_fs($id$jscomp$13_parent_inode$$).CreateBinaryFile($filename$jscomp$13_x$$, $data$jscomp$211_foreign_parentid$jscomp$5_parentid$$, $buffer$jscomp$50_foreign_id$$), this.create_forwarder($id$jscomp$13_parent_inode$$.mount_id, $buffer$jscomp$50_foreign_id$$);
  }
  $id$jscomp$13_parent_inode$$ = this.CreateFile($filename$jscomp$13_x$$, $data$jscomp$211_foreign_parentid$jscomp$5_parentid$$);
  $filename$jscomp$13_x$$ = this.inodes[$id$jscomp$13_parent_inode$$];
  $data$jscomp$211_foreign_parentid$jscomp$5_parentid$$ = new Uint8Array($buffer$jscomp$50_foreign_id$$.length);
  $data$jscomp$211_foreign_parentid$jscomp$5_parentid$$.set($buffer$jscomp$50_foreign_id$$);
  await this.set_data($id$jscomp$13_parent_inode$$, $data$jscomp$211_foreign_parentid$jscomp$5_parentid$$);
  $filename$jscomp$13_x$$.size = $buffer$jscomp$50_foreign_id$$.length;
  return $id$jscomp$13_parent_inode$$;
};
FS.prototype.OpenInode = function($id$$, $mode$$) {
  var $inode$$ = this.inodes[$id$$];
  if (this.is_forwarder($inode$$)) {
    return this.follow_fs($inode$$).OpenInode($inode$$.foreign_id, $mode$$);
  }
  ($inode$$.mode & S_IFMT) == S_IFDIR && this.FillDirectory($id$$);
  return !0;
};
FS.prototype.CloseInode = async function($id$$) {
  var $inode$$ = this.inodes[$id$$];
  if (this.is_forwarder($inode$$)) {
    return await this.follow_fs($inode$$).CloseInode($inode$$.foreign_id);
  }
  $inode$$.status === STATUS_ON_STORAGE && this.storage.uncache($inode$$.sha256sum);
  $inode$$.status == STATUS_UNLINKED && ($inode$$.status = STATUS_INVALID, await this.DeleteData($id$$));
};
FS.prototype.Rename = async function($olddirid_ret$jscomp$6_ret$$, $oldname$$, $foreign_fs_new_real_inode_newdirid$$, $foreign_id$jscomp$6_newname$$) {
  if ($olddirid_ret$jscomp$6_ret$$ == $foreign_fs_new_real_inode_newdirid$$ && $oldname$$ == $foreign_id$jscomp$6_newname$$) {
    return 0;
  }
  var $oldid$$ = this.Search($olddirid_ret$jscomp$6_ret$$, $oldname$$);
  if (-1 === $oldid$$) {
    return -ENOENT;
  }
  var $oldpath$$ = this.GetFullPath($olddirid_ret$jscomp$6_ret$$) + "/" + $oldname$$;
  if (-1 != this.Search($foreign_fs_new_real_inode_newdirid$$, $foreign_id$jscomp$6_newname$$) && ($newdir_ret$jscomp$5_ret$$ = this.Unlink($foreign_fs_new_real_inode_newdirid$$, $foreign_id$jscomp$6_newname$$), 0 > $newdir_ret$jscomp$5_ret$$)) {
    return $newdir_ret$jscomp$5_ret$$;
  }
  var $inode$$ = this.inodes[$oldid$$], $diverted_old_idx_olddir$$ = this.inodes[$olddirid_ret$jscomp$6_ret$$], $newdir_ret$jscomp$5_ret$$ = this.inodes[$foreign_fs_new_real_inode_newdirid$$];
  if (this.is_forwarder($diverted_old_idx_olddir$$) || this.is_forwarder($newdir_ret$jscomp$5_ret$$)) {
    if (this.is_forwarder($diverted_old_idx_olddir$$) && $diverted_old_idx_olddir$$.mount_id === $newdir_ret$jscomp$5_ret$$.mount_id) {
      if ($olddirid_ret$jscomp$6_ret$$ = await this.follow_fs($diverted_old_idx_olddir$$).Rename($diverted_old_idx_olddir$$.foreign_id, $oldname$$, $newdir_ret$jscomp$5_ret$$.foreign_id, $foreign_id$jscomp$6_newname$$), 0 > $olddirid_ret$jscomp$6_ret$$) {
        return $olddirid_ret$jscomp$6_ret$$;
      }
    } else {
      if (this.is_a_root($oldid$$)) {
        return dbg_log("XXX: Attempted to move mountpoint (" + $oldname$$ + ") - skipped", LOG_9P), -EPERM;
      }
      if (!this.IsDirectory($oldid$$) && 1 < this.GetInode($oldid$$).nlinks) {
        return dbg_log("XXX: Attempted to move hardlinked file (" + $oldname$$ + ") across filesystems - skipped", LOG_9P), -EPERM;
      }
      $diverted_old_idx_olddir$$ = this.divert($olddirid_ret$jscomp$6_ret$$, $oldname$$);
      const $old_real_inode$$ = this.GetInode($oldid$$), $data$$ = await this.Read($diverted_old_idx_olddir$$, 0, $old_real_inode$$.size);
      this.is_forwarder($newdir_ret$jscomp$5_ret$$) ? ($foreign_fs_new_real_inode_newdirid$$ = this.follow_fs($newdir_ret$jscomp$5_ret$$), $foreign_id$jscomp$6_newname$$ = this.IsDirectory($diverted_old_idx_olddir$$) ? $foreign_fs_new_real_inode_newdirid$$.CreateDirectory($foreign_id$jscomp$6_newname$$, $newdir_ret$jscomp$5_ret$$.foreign_id) : $foreign_fs_new_real_inode_newdirid$$.CreateFile($foreign_id$jscomp$6_newname$$, $newdir_ret$jscomp$5_ret$$.foreign_id), $foreign_fs_new_real_inode_newdirid$$ = 
      $foreign_fs_new_real_inode_newdirid$$.GetInode($foreign_id$jscomp$6_newname$$), this.copy_inode($old_real_inode$$, $foreign_fs_new_real_inode_newdirid$$), this.set_forwarder($oldid$$, $newdir_ret$jscomp$5_ret$$.mount_id, $foreign_id$jscomp$6_newname$$)) : (this.delete_forwarder($inode$$), this.copy_inode($old_real_inode$$, $inode$$), this.link_under_dir($foreign_fs_new_real_inode_newdirid$$, $oldid$$, $foreign_id$jscomp$6_newname$$));
      await this.ChangeSize($oldid$$, $old_real_inode$$.size);
      $data$$ && $data$$.length && await this.Write($oldid$$, 0, $data$$.length, $data$$);
      if (this.IsDirectory($oldid$$)) {
        for (const $child_filename$$ of this.GetChildren($diverted_old_idx_olddir$$)) {
          if ($newdir_ret$jscomp$5_ret$$ = await this.Rename($diverted_old_idx_olddir$$, $child_filename$$, $oldid$$, $child_filename$$), 0 > $newdir_ret$jscomp$5_ret$$) {
            return $newdir_ret$jscomp$5_ret$$;
          }
        }
      }
      await this.DeleteData($diverted_old_idx_olddir$$);
      $olddirid_ret$jscomp$6_ret$$ = this.Unlink($olddirid_ret$jscomp$6_ret$$, $oldname$$);
      if (0 > $olddirid_ret$jscomp$6_ret$$) {
        return $olddirid_ret$jscomp$6_ret$$;
      }
    }
  } else {
    this.unlink_from_dir($olddirid_ret$jscomp$6_ret$$, $oldname$$), this.link_under_dir($foreign_fs_new_real_inode_newdirid$$, $oldid$$, $foreign_id$jscomp$6_newname$$), $inode$$.qid.version++;
  }
  this.NotifyListeners($oldid$$, "rename", {oldpath:$oldpath$$});
  return 0;
};
FS.prototype.Write = async function($foreign_id$jscomp$7_id$$, $offset$$, $count$$, $buffer$$) {
  this.NotifyListeners($foreign_id$jscomp$7_id$$, "write");
  var $inode$$ = this.inodes[$foreign_id$jscomp$7_id$$];
  if (this.is_forwarder($inode$$)) {
    $foreign_id$jscomp$7_id$$ = $inode$$.foreign_id, await this.follow_fs($inode$$).Write($foreign_id$jscomp$7_id$$, $offset$$, $count$$, $buffer$$);
  } else {
    var $data$$ = await this.get_buffer($foreign_id$jscomp$7_id$$);
    !$data$$ || $data$$.length < $offset$$ + $count$$ ? (await this.ChangeSize($foreign_id$jscomp$7_id$$, Math.floor(3 * ($offset$$ + $count$$) / 2)), $inode$$.size = $offset$$ + $count$$, $data$$ = await this.get_buffer($foreign_id$jscomp$7_id$$)) : $inode$$.size < $offset$$ + $count$$ && ($inode$$.size = $offset$$ + $count$$);
    $buffer$$ && $data$$.set($buffer$$.subarray(0, $count$$), $offset$$);
    await this.set_data($foreign_id$jscomp$7_id$$, $data$$);
  }
};
FS.prototype.Read = async function($foreign_id$jscomp$8_inodeid$$, $offset$$, $count$$) {
  const $inode$$ = this.inodes[$foreign_id$jscomp$8_inodeid$$];
  return this.is_forwarder($inode$$) ? ($foreign_id$jscomp$8_inodeid$$ = $inode$$.foreign_id, await this.follow_fs($inode$$).Read($foreign_id$jscomp$8_inodeid$$, $offset$$, $count$$)) : await this.get_data($foreign_id$jscomp$8_inodeid$$, $offset$$, $count$$);
};
FS.prototype.Search = function($parent_inode$jscomp$8_parentid$$, $childid_foreign_id$jscomp$9_name$$) {
  $parent_inode$jscomp$8_parentid$$ = this.inodes[$parent_inode$jscomp$8_parentid$$];
  if (this.is_forwarder($parent_inode$jscomp$8_parentid$$)) {
    const $foreign_parentid$$ = $parent_inode$jscomp$8_parentid$$.foreign_id;
    $childid_foreign_id$jscomp$9_name$$ = this.follow_fs($parent_inode$jscomp$8_parentid$$).Search($foreign_parentid$$, $childid_foreign_id$jscomp$9_name$$);
    return -1 === $childid_foreign_id$jscomp$9_name$$ ? -1 : this.get_forwarder($parent_inode$jscomp$8_parentid$$.mount_id, $childid_foreign_id$jscomp$9_name$$);
  }
  $childid_foreign_id$jscomp$9_name$$ = $parent_inode$jscomp$8_parentid$$.direntries.get($childid_foreign_id$jscomp$9_name$$);
  return void 0 === $childid_foreign_id$jscomp$9_name$$ ? -1 : $childid_foreign_id$jscomp$9_name$$;
};
FS.prototype.CountUsedInodes = function() {
  let $count$$ = this.inodes.length;
  for (const {fs:$fs$$, backtrack:$backtrack$$} of this.mounts) {
    $count$$ += $fs$$.CountUsedInodes(), $count$$ -= $backtrack$$.size;
  }
  return $count$$;
};
FS.prototype.CountFreeInodes = function() {
  let $count$$ = 1048576;
  for (const {fs:$fs$$} of this.mounts) {
    $count$$ += $fs$$.CountFreeInodes();
  }
  return $count$$;
};
FS.prototype.GetTotalSize = function() {
  let $size$$ = this.used_size;
  for (const {fs:$fs$$} of this.mounts) {
    $size$$ += $fs$$.GetTotalSize();
  }
  return $size$$;
};
FS.prototype.GetSpace = function() {
  let $size$$ = this.total_size;
  for (const {fs:$fs$$} of this.mounts) {
    $size$$ += $fs$$.GetSpace();
  }
  return this.total_size;
};
FS.prototype.GetDirectoryName = function($idx$$) {
  const $parent_inode$$ = this.inodes[this.GetParent($idx$$)];
  if (this.is_forwarder($parent_inode$$)) {
    return this.follow_fs($parent_inode$$).GetDirectoryName(this.inodes[$idx$$].foreign_id);
  }
  if (!$parent_inode$$) {
    return "";
  }
  for (const [$name$$, $childid$$] of $parent_inode$$.direntries) {
    if ($childid$$ === $idx$$) {
      return $name$$;
    }
  }
  dbg_assert(!1, "Filesystem: Found directory inode whose parent doesn't link to it");
  return "";
};
FS.prototype.GetFullPath = function($idx$$) {
  dbg_assert(this.IsDirectory($idx$$), "Filesystem: Cannot get full path of non-directory inode");
  for (var $path$$ = ""; 0 != $idx$$;) {
    $path$$ = "/" + this.GetDirectoryName($idx$$) + $path$$, $idx$$ = this.GetParent($idx$$);
  }
  return $path$$.substring(1);
};
FS.prototype.Link = function($parentid$$, $targetid$$, $name$$) {
  if (this.IsDirectory($targetid$$)) {
    return -EPERM;
  }
  const $parent_inode$$ = this.inodes[$parentid$$], $inode$$ = this.inodes[$targetid$$];
  if (this.is_forwarder($parent_inode$$)) {
    return this.is_forwarder($inode$$) && $inode$$.mount_id === $parent_inode$$.mount_id ? this.follow_fs($parent_inode$$).Link($parent_inode$$.foreign_id, $inode$$.foreign_id, $name$$) : (dbg_log("XXX: Attempted to hardlink a file into a child filesystem - skipped", LOG_9P), -EPERM);
  }
  if (this.is_forwarder($inode$$)) {
    return dbg_log("XXX: Attempted to hardlink file across filesystems - skipped", LOG_9P), -EPERM;
  }
  this.link_under_dir($parentid$$, $targetid$$, $name$$);
  return 0;
};
FS.prototype.Unlink = function($foreign_parentid$jscomp$7_parentid$$, $name$$) {
  if ("." === $name$$ || ".." === $name$$) {
    return -EPERM;
  }
  const $idx$$ = this.Search($foreign_parentid$jscomp$7_parentid$$, $name$$), $inode$$ = this.inodes[$idx$$], $parent_inode$$ = this.inodes[$foreign_parentid$jscomp$7_parentid$$];
  if (this.is_forwarder($parent_inode$$)) {
    return dbg_assert(this.is_forwarder($inode$$), "Children of forwarders should be forwarders"), $foreign_parentid$jscomp$7_parentid$$ = $parent_inode$$.foreign_id, this.follow_fs($parent_inode$$).Unlink($foreign_parentid$jscomp$7_parentid$$, $name$$);
  }
  if (this.IsDirectory($idx$$) && !this.IsEmpty($idx$$)) {
    return -ENOTEMPTY;
  }
  this.unlink_from_dir($foreign_parentid$jscomp$7_parentid$$, $name$$);
  0 === $inode$$.nlinks && ($inode$$.status = STATUS_UNLINKED, this.NotifyListeners($idx$$, "delete"));
  return 0;
};
FS.prototype.DeleteData = async function($idx$$) {
  const $inode$$ = this.inodes[$idx$$];
  this.is_forwarder($inode$$) ? await this.follow_fs($inode$$).DeleteData($inode$$.foreign_id) : ($inode$$.size = 0, delete this.inodedata[$idx$$]);
};
FS.prototype.get_buffer = async function($idx$$) {
  const $inode$$ = this.inodes[$idx$$];
  dbg_assert($inode$$, `Filesystem get_buffer: idx ${$idx$$} does not point to an inode`);
  return this.inodedata[$idx$$] ? this.inodedata[$idx$$] : $inode$$.status === STATUS_ON_STORAGE ? (dbg_assert($inode$$.sha256sum, "Filesystem get_data: found inode on server without sha256sum"), await this.storage.read($inode$$.sha256sum, 0, $inode$$.size)) : null;
};
FS.prototype.get_data = async function($idx$$, $offset$$, $count$$) {
  const $inode$$ = this.inodes[$idx$$];
  dbg_assert($inode$$, `Filesystem get_data: idx ${$idx$$} does not point to an inode`);
  return this.inodedata[$idx$$] ? this.inodedata[$idx$$].subarray($offset$$, $offset$$ + $count$$) : $inode$$.status === STATUS_ON_STORAGE ? (dbg_assert($inode$$.sha256sum, "Filesystem get_data: found inode on server without sha256sum"), await this.storage.read($inode$$.sha256sum, $offset$$, $count$$)) : null;
};
FS.prototype.set_data = async function($idx$$, $buffer$$) {
  this.inodedata[$idx$$] = $buffer$$;
  this.inodes[$idx$$].status === STATUS_ON_STORAGE && (this.inodes[$idx$$].status = STATUS_OK, this.storage.uncache(this.inodes[$idx$$].sha256sum));
};
FS.prototype.GetInode = function($idx$jscomp$14_inode$$) {
  dbg_assert(!isNaN($idx$jscomp$14_inode$$), "Filesystem GetInode: NaN idx");
  dbg_assert(0 <= $idx$jscomp$14_inode$$ && $idx$jscomp$14_inode$$ < this.inodes.length, "Filesystem GetInode: out of range idx:" + $idx$jscomp$14_inode$$);
  $idx$jscomp$14_inode$$ = this.inodes[$idx$jscomp$14_inode$$];
  return this.is_forwarder($idx$jscomp$14_inode$$) ? this.follow_fs($idx$jscomp$14_inode$$).GetInode($idx$jscomp$14_inode$$.foreign_id) : $idx$jscomp$14_inode$$;
};
FS.prototype.ChangeSize = async function($idx$$, $newsize$$) {
  var $inode$$ = this.GetInode($idx$$), $temp$$ = await this.get_data($idx$$, 0, $inode$$.size);
  if ($newsize$$ != $inode$$.size) {
    var $data$$ = new Uint8Array($newsize$$);
    $inode$$.size = $newsize$$;
    $temp$$ && $data$$.set($temp$$.subarray(0, Math.min($temp$$.length, $inode$$.size)), 0);
    await this.set_data($idx$$, $data$$);
  }
};
FS.prototype.SearchPath = function($path$jscomp$8_walk$$) {
  $path$jscomp$8_walk$$ = $path$jscomp$8_walk$$.replace("//", "/");
  $path$jscomp$8_walk$$ = $path$jscomp$8_walk$$.split("/");
  0 < $path$jscomp$8_walk$$.length && 0 === $path$jscomp$8_walk$$[$path$jscomp$8_walk$$.length - 1].length && $path$jscomp$8_walk$$.pop();
  0 < $path$jscomp$8_walk$$.length && 0 === $path$jscomp$8_walk$$[0].length && $path$jscomp$8_walk$$.shift();
  const $n$$ = $path$jscomp$8_walk$$.length;
  var $parentid$$ = -1, $id$$ = 0;
  let $forward_path$$ = null;
  for (var $i$$ = 0; $i$$ < $n$$; $i$$++) {
    if ($parentid$$ = $id$$, $id$$ = this.Search($parentid$$, $path$jscomp$8_walk$$[$i$$]), !$forward_path$$ && this.is_forwarder(this.inodes[$parentid$$]) && ($forward_path$$ = "/" + $path$jscomp$8_walk$$.slice($i$$).join("/")), -1 == $id$$) {
      return $i$$ < $n$$ - 1 ? {id:-1, parentid:-1, name:$path$jscomp$8_walk$$[$i$$], forward_path:$forward_path$$} : {id:-1, parentid:$parentid$$, name:$path$jscomp$8_walk$$[$i$$], forward_path:$forward_path$$};
    }
  }
  return {id:$id$$, parentid:$parentid$$, name:$path$jscomp$8_walk$$[$i$$], forward_path:$forward_path$$};
};
FS.prototype.GetRecursiveList = function($dirid_i$$, $list$$) {
  if (this.is_forwarder(this.inodes[$dirid_i$$])) {
    const $foreign_fs$$ = this.follow_fs(this.inodes[$dirid_i$$]), $mount_id$$ = this.inodes[$dirid_i$$].mount_id, $foreign_start$$ = $list$$.length;
    $foreign_fs$$.GetRecursiveList(this.inodes[$dirid_i$$].foreign_id, $list$$);
    for ($dirid_i$$ = $foreign_start$$; $dirid_i$$ < $list$$.length; $dirid_i$$++) {
      $list$$[$dirid_i$$].parentid = this.get_forwarder($mount_id$$, $list$$[$dirid_i$$].parentid);
    }
  } else {
    for (const [$name$$, $id$$] of this.inodes[$dirid_i$$].direntries) {
      "." !== $name$$ && ".." !== $name$$ && ($list$$.push({parentid:$dirid_i$$, name:$name$$}), this.IsDirectory($id$$) && this.GetRecursiveList($id$$, $list$$));
    }
  }
};
FS.prototype.RecursiveDelete = function($i$jscomp$113_ids_path$$) {
  var $toDelete$$ = [];
  $i$jscomp$113_ids_path$$ = this.SearchPath($i$jscomp$113_ids_path$$);
  if (-1 !== $i$jscomp$113_ids_path$$.id) {
    for (this.GetRecursiveList($i$jscomp$113_ids_path$$.id, $toDelete$$), $i$jscomp$113_ids_path$$ = $toDelete$$.length - 1; 0 <= $i$jscomp$113_ids_path$$; $i$jscomp$113_ids_path$$--) {
      const $ret$$ = this.Unlink($toDelete$$[$i$jscomp$113_ids_path$$].parentid, $toDelete$$[$i$jscomp$113_ids_path$$].name);
      dbg_assert(0 === $ret$$, "Filesystem RecursiveDelete failed at parent=" + $toDelete$$[$i$jscomp$113_ids_path$$].parentid + ", name='" + $toDelete$$[$i$jscomp$113_ids_path$$].name + "' with error code: " + -$ret$$);
    }
  }
};
FS.prototype.DeleteNode = function($path$jscomp$10_ret$jscomp$10_ret$$) {
  var $ids$$ = this.SearchPath($path$jscomp$10_ret$jscomp$10_ret$$);
  -1 != $ids$$.id && ((this.inodes[$ids$$.id].mode & S_IFMT) == S_IFREG ? ($path$jscomp$10_ret$jscomp$10_ret$$ = this.Unlink($ids$$.parentid, $ids$$.name), dbg_assert(0 === $path$jscomp$10_ret$jscomp$10_ret$$, "Filesystem DeleteNode failed with error code: " + -$path$jscomp$10_ret$jscomp$10_ret$$)) : (this.inodes[$ids$$.id].mode & S_IFMT) == S_IFDIR && (this.RecursiveDelete($path$jscomp$10_ret$jscomp$10_ret$$), $path$jscomp$10_ret$jscomp$10_ret$$ = this.Unlink($ids$$.parentid, $ids$$.name), dbg_assert(0 === 
  $path$jscomp$10_ret$jscomp$10_ret$$, "Filesystem DeleteNode failed with error code: " + -$path$jscomp$10_ret$jscomp$10_ret$$)));
};
FS.prototype.NotifyListeners = function($id$$, $action$$, $info$$) {
};
FS.prototype.Check = function() {
  for (var $i$$ = 1; $i$$ < this.inodes.length; $i$$++) {
    if (this.inodes[$i$$].status != STATUS_INVALID) {
      var $inode$jscomp$22_inode$$ = this.GetInode($i$$);
      0 > $inode$jscomp$22_inode$$.nlinks && message.Debug("Error in filesystem: negative nlinks=" + $inode$jscomp$22_inode$$.nlinks + " at id =" + $i$$);
      if (this.IsDirectory($i$$)) {
        $inode$jscomp$22_inode$$ = this.GetInode($i$$);
        this.IsDirectory($i$$) && 0 > this.GetParent($i$$) && message.Debug("Error in filesystem: negative parent id " + $i$$);
        for (const [$name$$, $id$$] of $inode$jscomp$22_inode$$.direntries) {
          0 === $name$$.length && message.Debug("Error in filesystem: inode with no name and id " + $id$$);
          for (const $c$$ of $name$$) {
            32 > $c$$ && message.Debug("Error in filesystem: Unallowed char in filename");
          }
        }
      }
    }
  }
};
FS.prototype.FillDirectory = function($data$jscomp$215_dirid$$) {
  var $child$jscomp$1_inode$$ = this.inodes[$data$jscomp$215_dirid$$];
  if (this.is_forwarder($child$jscomp$1_inode$$)) {
    this.follow_fs($child$jscomp$1_inode$$).FillDirectory($child$jscomp$1_inode$$.foreign_id);
  } else {
    var $offset$jscomp$74_size$$ = 0;
    for (const $name$$ of $child$jscomp$1_inode$$.direntries.keys()) {
      $offset$jscomp$74_size$$ += 24 + UTF8.UTF8Length($name$$);
    }
    $data$jscomp$215_dirid$$ = this.inodedata[$data$jscomp$215_dirid$$] = new Uint8Array($offset$jscomp$74_size$$);
    $child$jscomp$1_inode$$.size = $offset$jscomp$74_size$$;
    $offset$jscomp$74_size$$ = 0;
    for (const [$name$$, $id$$] of $child$jscomp$1_inode$$.direntries) {
      $child$jscomp$1_inode$$ = this.GetInode($id$$), $offset$jscomp$74_size$$ += marshall.Marshall(["Q", "d", "b", "s"], [$child$jscomp$1_inode$$.qid, $offset$jscomp$74_size$$ + 13 + 8 + 1 + 2 + UTF8.UTF8Length($name$$), $child$jscomp$1_inode$$.mode >> 12, $name$$], $data$jscomp$215_dirid$$, $offset$jscomp$74_size$$);
    }
  }
};
FS.prototype.RoundToDirentry = function($dirid$jscomp$2_offset$$, $offset_target$$) {
  const $data$$ = this.inodedata[$dirid$jscomp$2_offset$$];
  dbg_assert($data$$, `FS directory data for dirid=${$dirid$jscomp$2_offset$$} should be generated`);
  dbg_assert($data$$.length, "FS directory should have at least an entry");
  if ($offset_target$$ >= $data$$.length) {
    return $data$$.length;
  }
  for ($dirid$jscomp$2_offset$$ = 0;;) {
    const $next_offset$$ = marshall.Unmarshall(["Q", "d"], $data$$, {offset:$dirid$jscomp$2_offset$$})[1];
    if ($next_offset$$ > $offset_target$$) {
      break;
    }
    $dirid$jscomp$2_offset$$ = $next_offset$$;
  }
  return $dirid$jscomp$2_offset$$;
};
FS.prototype.IsDirectory = function($idx$jscomp$16_inode$$) {
  $idx$jscomp$16_inode$$ = this.inodes[$idx$jscomp$16_inode$$];
  return this.is_forwarder($idx$jscomp$16_inode$$) ? this.follow_fs($idx$jscomp$16_inode$$).IsDirectory($idx$jscomp$16_inode$$.foreign_id) : ($idx$jscomp$16_inode$$.mode & S_IFMT) === S_IFDIR;
};
FS.prototype.IsEmpty = function($idx$jscomp$17_inode$$) {
  $idx$jscomp$17_inode$$ = this.inodes[$idx$jscomp$17_inode$$];
  if (this.is_forwarder($idx$jscomp$17_inode$$)) {
    return this.follow_fs($idx$jscomp$17_inode$$).IsDirectory($idx$jscomp$17_inode$$.foreign_id);
  }
  for (const $name$$ of $idx$jscomp$17_inode$$.direntries.keys()) {
    if ("." !== $name$$ && ".." !== $name$$) {
      return !1;
    }
  }
  return !0;
};
FS.prototype.GetChildren = function($idx$jscomp$18_inode$$) {
  dbg_assert(this.IsDirectory($idx$jscomp$18_inode$$), "Filesystem: cannot get children of non-directory inode");
  $idx$jscomp$18_inode$$ = this.inodes[$idx$jscomp$18_inode$$];
  if (this.is_forwarder($idx$jscomp$18_inode$$)) {
    return this.follow_fs($idx$jscomp$18_inode$$).GetChildren($idx$jscomp$18_inode$$.foreign_id);
  }
  const $children$$ = [];
  for (const $name$$ of $idx$jscomp$18_inode$$.direntries.keys()) {
    "." !== $name$$ && ".." !== $name$$ && $children$$.push($name$$);
  }
  return $children$$;
};
FS.prototype.GetParent = function($idx$jscomp$19_inode$$) {
  dbg_assert(this.IsDirectory($idx$jscomp$19_inode$$), "Filesystem: cannot get parent of non-directory inode");
  $idx$jscomp$19_inode$$ = this.inodes[$idx$jscomp$19_inode$$];
  if (this.should_be_linked($idx$jscomp$19_inode$$)) {
    return $idx$jscomp$19_inode$$.direntries.get("..");
  }
  const $foreign_dirid$$ = this.follow_fs($idx$jscomp$19_inode$$).GetParent($idx$jscomp$19_inode$$.foreign_id);
  dbg_assert(-1 !== $foreign_dirid$$, "Filesystem: should not have invalid parent ids");
  return this.get_forwarder($idx$jscomp$19_inode$$.mount_id, $foreign_dirid$$);
};
FS.prototype.PrepareCAPs = function($id$jscomp$22_inode$$) {
  $id$jscomp$22_inode$$ = this.GetInode($id$jscomp$22_inode$$);
  if ($id$jscomp$22_inode$$.caps) {
    return $id$jscomp$22_inode$$.caps.length;
  }
  $id$jscomp$22_inode$$.caps = new Uint8Array(20);
  $id$jscomp$22_inode$$.caps[0] = 0;
  $id$jscomp$22_inode$$.caps[1] = 0;
  $id$jscomp$22_inode$$.caps[2] = 0;
  $id$jscomp$22_inode$$.caps[3] = 2;
  $id$jscomp$22_inode$$.caps[4] = 255;
  $id$jscomp$22_inode$$.caps[5] = 255;
  $id$jscomp$22_inode$$.caps[6] = 255;
  $id$jscomp$22_inode$$.caps[7] = 255;
  $id$jscomp$22_inode$$.caps[8] = 255;
  $id$jscomp$22_inode$$.caps[9] = 255;
  $id$jscomp$22_inode$$.caps[10] = 255;
  $id$jscomp$22_inode$$.caps[11] = 255;
  $id$jscomp$22_inode$$.caps[12] = 63;
  $id$jscomp$22_inode$$.caps[13] = 0;
  $id$jscomp$22_inode$$.caps[14] = 0;
  $id$jscomp$22_inode$$.caps[15] = 0;
  $id$jscomp$22_inode$$.caps[16] = 63;
  $id$jscomp$22_inode$$.caps[17] = 0;
  $id$jscomp$22_inode$$.caps[18] = 0;
  $id$jscomp$22_inode$$.caps[19] = 0;
  return $id$jscomp$22_inode$$.caps.length;
};
function FSMountInfo($filesystem$$) {
  this.fs = $filesystem$$;
  this.backtrack = new Map;
}
FSMountInfo.prototype.get_state = function() {
  const $state$$ = [];
  $state$$[0] = this.fs;
  $state$$[1] = [...this.backtrack];
  return $state$$;
};
FSMountInfo.prototype.set_state = function($state$$) {
  this.fs = $state$$[0];
  this.backtrack = new Map($state$$[1]);
};
FS.prototype.set_forwarder = function($idx$$, $mount_id$$, $foreign_id$$) {
  const $inode$$ = this.inodes[$idx$$];
  dbg_assert(0 === $inode$$.nlinks, "Filesystem: attempted to convert an inode into forwarder before unlinking the inode");
  this.is_forwarder($inode$$) && this.mounts[$inode$$.mount_id].backtrack.delete($inode$$.foreign_id);
  $inode$$.status = STATUS_FORWARDING;
  $inode$$.mount_id = $mount_id$$;
  $inode$$.foreign_id = $foreign_id$$;
  this.mounts[$mount_id$$].backtrack.set($foreign_id$$, $idx$$);
};
FS.prototype.create_forwarder = function($mount_id$$, $foreign_id$$) {
  const $inode$$ = this.CreateInode(), $idx$$ = this.inodes.length;
  this.inodes.push($inode$$);
  $inode$$.fid = $idx$$;
  this.set_forwarder($idx$$, $mount_id$$, $foreign_id$$);
  return $idx$$;
};
FS.prototype.is_forwarder = function($inode$$) {
  return $inode$$.status === STATUS_FORWARDING;
};
FS.prototype.is_a_root = function($idx$$) {
  return 0 === this.GetInode($idx$$).fid;
};
FS.prototype.get_forwarder = function($mount_id$$, $foreign_id$$) {
  var $mount$jscomp$1_result$$ = this.mounts[$mount_id$$];
  dbg_assert(0 <= $foreign_id$$, "Filesystem get_forwarder: invalid foreign_id: " + $foreign_id$$);
  dbg_assert($mount$jscomp$1_result$$, "Filesystem get_forwarder: invalid mount number: " + $mount_id$$);
  $mount$jscomp$1_result$$ = $mount$jscomp$1_result$$.backtrack.get($foreign_id$$);
  return void 0 === $mount$jscomp$1_result$$ ? this.create_forwarder($mount_id$$, $foreign_id$$) : $mount$jscomp$1_result$$;
};
FS.prototype.delete_forwarder = function($inode$$) {
  dbg_assert(this.is_forwarder($inode$$), "Filesystem delete_forwarder: expected forwarder");
  $inode$$.status = STATUS_INVALID;
  this.mounts[$inode$$.mount_id].backtrack.delete($inode$$.foreign_id);
};
FS.prototype.follow_fs = function($inode$$) {
  const $mount$$ = this.mounts[$inode$$.mount_id];
  dbg_assert(this.is_forwarder($inode$$), "Filesystem follow_fs: inode should be a forwarding inode");
  dbg_assert($mount$$, "Filesystem follow_fs: inode<id=" + $inode$$.fid + "> should point to valid mounted FS");
  return $mount$$.fs;
};
FS.prototype.Mount = function($mount_id$jscomp$4_parent$jscomp$6_path$$, $fs$jscomp$8_idx$$) {
  dbg_assert($fs$jscomp$8_idx$$.qidcounter === this.qidcounter, "Cannot mount filesystem whose qid numbers aren't synchronised with current filesystem.");
  var $path_infos$jscomp$1_ret$$ = this.SearchPath($mount_id$jscomp$4_parent$jscomp$6_path$$);
  if (-1 === $path_infos$jscomp$1_ret$$.parentid) {
    return dbg_log("Mount failed: parent for path not found: " + $mount_id$jscomp$4_parent$jscomp$6_path$$, LOG_9P), -ENOENT;
  }
  if (-1 !== $path_infos$jscomp$1_ret$$.id) {
    return dbg_log("Mount failed: file already exists at path: " + $mount_id$jscomp$4_parent$jscomp$6_path$$, LOG_9P), -EEXIST;
  }
  if ($path_infos$jscomp$1_ret$$.forward_path) {
    return $mount_id$jscomp$4_parent$jscomp$6_path$$ = this.inodes[$path_infos$jscomp$1_ret$$.parentid], $path_infos$jscomp$1_ret$$ = this.follow_fs($mount_id$jscomp$4_parent$jscomp$6_path$$).Mount($path_infos$jscomp$1_ret$$.forward_path, $fs$jscomp$8_idx$$), 0 > $path_infos$jscomp$1_ret$$ ? $path_infos$jscomp$1_ret$$ : this.get_forwarder($mount_id$jscomp$4_parent$jscomp$6_path$$.mount_id, $path_infos$jscomp$1_ret$$);
  }
  $mount_id$jscomp$4_parent$jscomp$6_path$$ = this.mounts.length;
  this.mounts.push(new FSMountInfo($fs$jscomp$8_idx$$));
  $fs$jscomp$8_idx$$ = this.create_forwarder($mount_id$jscomp$4_parent$jscomp$6_path$$, 0);
  this.link_under_dir($path_infos$jscomp$1_ret$$.parentid, $fs$jscomp$8_idx$$, $path_infos$jscomp$1_ret$$.name);
  return $fs$jscomp$8_idx$$;
};
function FSLockRegion() {
  this.type = P9_LOCK_TYPE_UNLCK;
  this.start = 0;
  this.length = Infinity;
  this.proc_id = -1;
  this.client_id = "";
}
FSLockRegion.prototype.get_state = function() {
  const $state$$ = [];
  $state$$[0] = this.type;
  $state$$[1] = this.start;
  $state$$[2] = Infinity === this.length ? 0 : this.length;
  $state$$[3] = this.proc_id;
  $state$$[4] = this.client_id;
  return $state$$;
};
FSLockRegion.prototype.set_state = function($state$$) {
  this.type = $state$$[0];
  this.start = $state$$[1];
  this.length = 0 === $state$$[2] ? Infinity : $state$$[2];
  this.proc_id = $state$$[3];
  this.client_id = $state$$[4];
};
FSLockRegion.prototype.clone = function() {
  const $new_region$$ = new FSLockRegion;
  $new_region$$.set_state(this.get_state());
  return $new_region$$;
};
FSLockRegion.prototype.conflicts_with = function($region$$) {
  return this.proc_id === $region$$.proc_id && this.client_id === $region$$.client_id || this.type === P9_LOCK_TYPE_UNLCK || $region$$.type === P9_LOCK_TYPE_UNLCK || this.type !== P9_LOCK_TYPE_WRLCK && $region$$.type !== P9_LOCK_TYPE_WRLCK || this.start + this.length <= $region$$.start || $region$$.start + $region$$.length <= this.start ? !1 : !0;
};
FSLockRegion.prototype.is_alike = function($region$$) {
  return $region$$.proc_id === this.proc_id && $region$$.client_id === this.client_id && $region$$.type === this.type;
};
FSLockRegion.prototype.may_merge_after = function($region$$) {
  return this.is_alike($region$$) && $region$$.start + $region$$.length === this.start;
};
FS.prototype.DescribeLock = function($type$$, $start$$, $length$$, $proc_id$$, $client_id$$) {
  dbg_assert($type$$ === P9_LOCK_TYPE_RDLCK || $type$$ === P9_LOCK_TYPE_WRLCK || $type$$ === P9_LOCK_TYPE_UNLCK, "Filesystem: Invalid lock type: " + $type$$);
  dbg_assert(0 <= $start$$, "Filesystem: Invalid negative lock starting offset: " + $start$$);
  dbg_assert(0 < $length$$, "Filesystem: Invalid non-positive lock length: " + $length$$);
  const $lock$$ = new FSLockRegion;
  $lock$$.type = $type$$;
  $lock$$.start = $start$$;
  $lock$$.length = $length$$;
  $lock$$.proc_id = $proc_id$$;
  $lock$$.client_id = $client_id$$;
  return $lock$$;
};
FS.prototype.GetLock = function($id$jscomp$23_inode$$, $request$$) {
  $id$jscomp$23_inode$$ = this.inodes[$id$jscomp$23_inode$$];
  if (this.is_forwarder($id$jscomp$23_inode$$)) {
    var $foreign_id$jscomp$13_region$$ = $id$jscomp$23_inode$$.foreign_id;
    return this.follow_fs($id$jscomp$23_inode$$).GetLock($foreign_id$jscomp$13_region$$, $request$$);
  }
  for ($foreign_id$jscomp$13_region$$ of $id$jscomp$23_inode$$.locks) {
    if ($request$$.conflicts_with($foreign_id$jscomp$13_region$$)) {
      return $foreign_id$jscomp$13_region$$.clone();
    }
  }
  return null;
};
FS.prototype.Lock = function($foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$, $request$$, $flags$jscomp$13_i$jscomp$115_new_region$$) {
  const $inode$$ = this.inodes[$foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$];
  if (this.is_forwarder($inode$$)) {
    return $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$ = $inode$$.foreign_id, this.follow_fs($inode$$).Lock($foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$, $request$$, $flags$jscomp$13_i$jscomp$115_new_region$$);
  }
  $request$$ = $request$$.clone();
  if ($request$$.type !== P9_LOCK_TYPE_UNLCK && this.GetLock($foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$, $request$$)) {
    return P9_LOCK_BLOCKED;
  }
  for ($flags$jscomp$13_i$jscomp$115_new_region$$ = 0; $flags$jscomp$13_i$jscomp$115_new_region$$ < $inode$$.locks.length; $flags$jscomp$13_i$jscomp$115_new_region$$++) {
    $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$ = $inode$$.locks[$flags$jscomp$13_i$jscomp$115_new_region$$];
    dbg_assert(0 < $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.length, "Filesystem: Found non-positive lock region length: " + $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.length);
    dbg_assert($foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.type === P9_LOCK_TYPE_RDLCK || $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.type === P9_LOCK_TYPE_WRLCK, "Filesystem: Found invalid lock type: " + $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.type);
    dbg_assert(!$inode$$.locks[$flags$jscomp$13_i$jscomp$115_new_region$$ - 1] || $inode$$.locks[$flags$jscomp$13_i$jscomp$115_new_region$$ - 1].start <= $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.start, "Filesystem: Locks should be sorted by starting offset");
    if ($foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.start + $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.length <= $request$$.start) {
      continue;
    }
    if ($request$$.start + $request$$.length <= $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.start) {
      break;
    }
    if ($foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.proc_id !== $request$$.proc_id || $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.client_id !== $request$$.client_id) {
      dbg_assert(!$foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.conflicts_with($request$$), "Filesytem: Found conflicting lock region, despite already checked for conflicts");
      continue;
    }
    var $i$$ = $request$$.start + $request$$.length;
    const $length1$$ = $request$$.start - $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.start, $length2$$ = $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.start + $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.length - $i$$;
    if (0 < $length1$$ && 0 < $length2$$ && $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.type === $request$$.type) {
      return P9_LOCK_SUCCESS;
    }
    0 < $length1$$ && ($foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.length = $length1$$);
    if (0 >= $length1$$ && 0 < $length2$$) {
      $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.start = $i$$, $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.length = $length2$$;
    } else {
      if (0 < $length2$$) {
        for (; $flags$jscomp$13_i$jscomp$115_new_region$$ < $inode$$.locks.length && $inode$$.locks[$flags$jscomp$13_i$jscomp$115_new_region$$].start < $i$$;) {
          $flags$jscomp$13_i$jscomp$115_new_region$$++;
        }
        $inode$$.locks.splice($flags$jscomp$13_i$jscomp$115_new_region$$, 0, this.DescribeLock($foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.type, $i$$, $length2$$, $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.proc_id, $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$.client_id));
      } else {
        0 >= $length1$$ && ($inode$$.locks.splice($flags$jscomp$13_i$jscomp$115_new_region$$, 1), $flags$jscomp$13_i$jscomp$115_new_region$$--);
      }
    }
  }
  if ($request$$.type !== P9_LOCK_TYPE_UNLCK) {
    $flags$jscomp$13_i$jscomp$115_new_region$$ = $request$$;
    $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$ = !1;
    for ($i$$ = 0; $i$$ < $inode$$.locks.length && !($flags$jscomp$13_i$jscomp$115_new_region$$.may_merge_after($inode$$.locks[$i$$]) && ($inode$$.locks[$i$$].length += $request$$.length, $flags$jscomp$13_i$jscomp$115_new_region$$ = $inode$$.locks[$i$$], $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$ = !0), $request$$.start <= $inode$$.locks[$i$$].start); $i$$++) {
    }
    $foreign_id$jscomp$14_has_merged_id$jscomp$24_region$$ || ($inode$$.locks.splice($i$$, 0, $flags$jscomp$13_i$jscomp$115_new_region$$), $i$$++);
    for (; $i$$ < $inode$$.locks.length; $i$$++) {
      if ($inode$$.locks[$i$$].is_alike($flags$jscomp$13_i$jscomp$115_new_region$$)) {
        $inode$$.locks[$i$$].may_merge_after($flags$jscomp$13_i$jscomp$115_new_region$$) && ($flags$jscomp$13_i$jscomp$115_new_region$$.length += $inode$$.locks[$i$$].length, $inode$$.locks.splice($i$$, 1));
        break;
      }
    }
  }
  return P9_LOCK_SUCCESS;
};
FS.prototype.read_dir = function($dir$jscomp$1_p$jscomp$2_path$$) {
  $dir$jscomp$1_p$jscomp$2_path$$ = this.SearchPath($dir$jscomp$1_p$jscomp$2_path$$);
  if (-1 !== $dir$jscomp$1_p$jscomp$2_path$$.id) {
    return $dir$jscomp$1_p$jscomp$2_path$$ = this.GetInode($dir$jscomp$1_p$jscomp$2_path$$.id), Array.from($dir$jscomp$1_p$jscomp$2_path$$.direntries.keys()).filter($path$$ => "." !== $path$$ && ".." !== $path$$);
  }
};
FS.prototype.read_file = function($file$jscomp$6_p$$) {
  $file$jscomp$6_p$$ = this.SearchPath($file$jscomp$6_p$$);
  if (-1 === $file$jscomp$6_p$$.id) {
    return Promise.resolve(null);
  }
  const $inode$$ = this.GetInode($file$jscomp$6_p$$.id);
  return this.Read($file$jscomp$6_p$$.id, 0, $inode$$.size);
};
var VIRTIO_MAGIC_REG = 0, VIRTIO_VERSION_REG = 4, VIRTIO_DEVICE_REG = 8, VIRTIO_VENDOR_REG = 12, VIRTIO_HOSTFEATURES_REG = 16, VIRTIO_HOSTFEATURESSEL_REG = 20, VIRTIO_GUESTFEATURES_REG = 32, VIRTIO_GUESTFEATURESSEL_REG = 36, VIRTIO_GUEST_PAGE_SIZE_REG = 40, VIRTIO_QUEUESEL_REG = 48, VIRTIO_QUEUENUMMAX_REG = 52, VIRTIO_QUEUENUM_REG = 56, VIRTIO_QUEUEALIGN_REG = 60, VIRTIO_QUEUEPFN_REG = 64, VIRTIO_QUEUENOTIFY_REG = 80, VIRTIO_INTERRUPTSTATUS_REG = 96, VIRTIO_INTERRUPTACK_REG = 100, VIRTIO_STATUS_REG = 
112, VRING_DESC_F_NEXT = 1, VRING_DESC_F_WRITE = 2, VRING_DESC_F_INDIRECT = 4;
function hex8($n$$) {
  return h($n$$);
}
var message = {Debug:function($log$$) {
  dbg_log([].slice.apply(arguments).join(" "), LOG_9P);
}, Abort:function() {
  if (DEBUG) {
    throw Error("message.Abort()");
  }
}}, LoadBinaryResource;
LoadBinaryResource = "undefined" !== typeof XMLHttpRequest ? function($url$$, $OnSuccess$$, $OnError$$) {
  var $req$$ = new XMLHttpRequest;
  $req$$.open("GET", $url$$, !0);
  $req$$.responseType = "arraybuffer";
  $req$$.onreadystatechange = function() {
    if (4 == $req$$.readyState) {
      if (200 != $req$$.status && 0 != $req$$.status) {
        $OnError$$("Error: Could not load file " + $url$$);
      } else {
        var $arrayBuffer$$ = $req$$.response;
        $arrayBuffer$$ ? $OnSuccess$$($arrayBuffer$$) : $OnError$$("Error: No data received from: " + $url$$);
      }
    }
  };
  $req$$.send(null);
} : function($url$$, $OnSuccess$$, $OnError$$) {
  require("fs").readFile($url$$, function($err$$, $data$$) {
    $err$$ ? $OnError$$($err$$) : $OnSuccess$$($data$$.buffer);
  });
};
var marshall = {Marshall:function($typelist$$, $input$$, $struct$$, $offset$$) {
  for (var $item$$, $size$$ = 0, $i$$ = 0; $i$$ < $typelist$$.length; $i$$++) {
    switch($item$$ = $input$$[$i$$], $typelist$$[$i$$]) {
      case "w":
        $struct$$[$offset$$++] = $item$$ & 255;
        $struct$$[$offset$$++] = $item$$ >> 8 & 255;
        $struct$$[$offset$$++] = $item$$ >> 16 & 255;
        $struct$$[$offset$$++] = $item$$ >> 24 & 255;
        $size$$ += 4;
        break;
      case "d":
        $struct$$[$offset$$++] = $item$$ & 255;
        $struct$$[$offset$$++] = $item$$ >> 8 & 255;
        $struct$$[$offset$$++] = $item$$ >> 16 & 255;
        $struct$$[$offset$$++] = $item$$ >> 24 & 255;
        $struct$$[$offset$$++] = 0;
        $struct$$[$offset$$++] = 0;
        $struct$$[$offset$$++] = 0;
        $struct$$[$offset$$++] = 0;
        $size$$ += 8;
        break;
      case "h":
        $struct$$[$offset$$++] = $item$$ & 255;
        $struct$$[$offset$$++] = $item$$ >> 8;
        $size$$ += 2;
        break;
      case "b":
        $struct$$[$offset$$++] = $item$$;
        $size$$ += 1;
        break;
      case "s":
        var $lengthoffset$$ = $offset$$, $length$$ = 0;
        $struct$$[$offset$$++] = 0;
        $struct$$[$offset$$++] = 0;
        $size$$ += 2;
        for (var $j$$ of $item$$) {
          UnicodeToUTF8Stream($j$$.charCodeAt(0)).forEach(function($c$$) {
            $struct$$[$offset$$++] = $c$$;
            $size$$ += 1;
            $length$$++;
          });
        }
        $struct$$[$lengthoffset$$ + 0] = $length$$ & 255;
        $struct$$[$lengthoffset$$ + 1] = $length$$ >> 8 & 255;
        break;
      case "Q":
        marshall.Marshall(["b", "w", "d"], [$item$$.type, $item$$.version, $item$$.path], $struct$$, $offset$$);
        $offset$$ += 13;
        $size$$ += 13;
        break;
      default:
        message.Debug("Marshall: Unknown type=" + $typelist$$[$i$$]);
    }
  }
  return $size$$;
}, Unmarshall:function($typelist$$, $struct$$, $state$$) {
  let $offset$$ = $state$$.offset;
  for (var $output$$ = [], $i$$ = 0; $i$$ < $typelist$$.length; $i$$++) {
    switch($typelist$$[$i$$]) {
      case "w":
        var $len$jscomp$22_qid_val$$ = $struct$$[$offset$$++];
        $len$jscomp$22_qid_val$$ += $struct$$[$offset$$++] << 8;
        $len$jscomp$22_qid_val$$ += $struct$$[$offset$$++] << 16;
        $len$jscomp$22_qid_val$$ += $struct$$[$offset$$++] << 24 >>> 0;
        $output$$.push($len$jscomp$22_qid_val$$);
        break;
      case "d":
        $len$jscomp$22_qid_val$$ = $struct$$[$offset$$++];
        $len$jscomp$22_qid_val$$ += $struct$$[$offset$$++] << 8;
        $len$jscomp$22_qid_val$$ += $struct$$[$offset$$++] << 16;
        $len$jscomp$22_qid_val$$ += $struct$$[$offset$$++] << 24 >>> 0;
        $offset$$ += 4;
        $output$$.push($len$jscomp$22_qid_val$$);
        break;
      case "h":
        $len$jscomp$22_qid_val$$ = $struct$$[$offset$$++];
        $output$$.push($len$jscomp$22_qid_val$$ + ($struct$$[$offset$$++] << 8));
        break;
      case "b":
        $output$$.push($struct$$[$offset$$++]);
        break;
      case "s":
        $len$jscomp$22_qid_val$$ = $struct$$[$offset$$++];
        $len$jscomp$22_qid_val$$ += $struct$$[$offset$$++] << 8;
        for (var $str$$ = "", $utf8converter$$ = new UTF8StreamToUnicode, $j$$ = 0; $j$$ < $len$jscomp$22_qid_val$$; $j$$++) {
          var $c$$ = $utf8converter$$.Put($struct$$[$offset$$++]);
          -1 != $c$$ && ($str$$ += String.fromCharCode($c$$));
        }
        $output$$.push($str$$);
        break;
      case "Q":
        $state$$.offset = $offset$$;
        $len$jscomp$22_qid_val$$ = marshall.Unmarshall(["b", "w", "d"], $struct$$, $state$$);
        $offset$$ = $state$$.offset;
        $output$$.push({type:$len$jscomp$22_qid_val$$[0], version:$len$jscomp$22_qid_val$$[1], path:$len$jscomp$22_qid_val$$[2], });
        break;
      default:
        message.Debug("Error in Unmarshall: Unknown type=" + $typelist$$[$i$$]);
    }
  }
  $state$$.offset = $offset$$;
  return $output$$;
}};
var UTF8 = {};
function UTF8StreamToUnicode() {
  this.stream = new Uint8Array(5);
  this.ofs = 0;
  this.Put = function($key$$) {
    this.stream[this.ofs] = $key$$;
    this.ofs++;
    switch(this.ofs) {
      case 1:
        if (128 > this.stream[0]) {
          return this.ofs = 0, this.stream[0];
        }
        break;
      case 2:
        if (192 == (this.stream[0] & 224) && 128 == (this.stream[1] & 192)) {
          return this.ofs = 0, (this.stream[0] & 31) << 6 | this.stream[1] & 63;
        }
    }
    return -1;
  };
}
function UnicodeToUTF8Stream($key$$) {
  if (128 > $key$$) {
    return [$key$$];
  }
  if (2048 > $key$$) {
    return [192 | $key$$ >> 6 & 31, 128 | $key$$ & 63];
  }
}
UTF8.UTF8Length = function($s$$) {
  for (var $length$$ = 0, $i$$ = 0; $i$$ < $s$$.length; $i$$++) {
    var $c$$ = $s$$.charCodeAt($i$$);
    $length$$ += 128 > $c$$ ? 1 : 2;
  }
  return $length$$;
};
}).call(this);
