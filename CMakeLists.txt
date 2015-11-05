#############################################
#
# CMakeLists.txt for Lame.js
#
#############################################

cmake_minimum_required(VERSION 2.6)

project(lame.js)

# CMakeLists.txt should be alongside the lame folder
set(lame_root ${CMAKE_CURRENT_SOURCE_DIR})
if(NOT EXISTS ${lame_root}/lame)
    message(FATAL_ERROR
      "Lame not found in ${lame_root}")
endif()

# Lib folder
set(libmp3lame_folder "${lame_root}/lame/libmp3lame")
set(mpglib_folder "${lame_root}/lame/mpglib")

include_directories(${libmp3lame_folder} ${mpglib_folder})
include_directories("${lame_root}/lame/include")

# Platform-specific config
include_directories("${lame_root}/platform/include")

# Lib source files
set(lib_src_files VbrTag.c bitstream.c encoder.c fft.c gain_analysis.c id3tag.c lame.c newmdct.c presets.c psymodel.c quantize.c quantize_pvt.c reservoir.c set_get.c tables.c takehiro.c util.c vbrquantize.c version.c mpglib_interface.c)

set(lib_srcs "")
foreach(cfile ${lib_src_files})
    set(lib_srcs ${lib_srcs} "${libmp3lame_folder}/${cfile}")
endforeach(cfile)

# mpglib source files
set(mpglib_src_files common.c dct64_i386.c decode_i386.c interface.c layer1.c layer2.c layer3.c tabinit.c)

set(mpglib_srcs "")
foreach(cfile ${mpglib_src_files})
    set(mpglib_srcs ${mpglib_srcs} "${mpglib_folder}/${cfile}")
endforeach(cfile)

add_definitions(-DHAVE_CONFIG_H)

set(lame_lib_js "lame.js")
set(lame_lib "lame")

# We are using the C++ binding utility of emscripten, this needs to be added to the compilation command
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --bind")

# Add include dir in build tree as we'll place config header files there
include_directories("${CMAKE_BINARY_DIR}/include")

# Building a shared library to be converted to JavaScript
add_library(${lame_lib} SHARED "src/lamejs.cpp" ${lib_srcs} ${mpglib_srcs})


# Adding custom target for the JavaScript library.
add_custom_target(${lame_lib_js} ALL
  COMMAND ${CMAKE_C_COMPILER} -O2 --bind --memory-init-file 0 ${CMAKE_SHARED_LIBRARY_PREFIX}${lame_lib}${CMAKE_SHARED_LIBRARY_SUFFIX} -o ${lame_lib_js}
  DEPENDS ${lame_lib}
  )

