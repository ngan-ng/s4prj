import 'package:flutter/material.dart';
import 'backend/api_requests/api_manager.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'flutter_flow/flutter_flow_util.dart';
import 'dart:convert';

class FFAppState extends ChangeNotifier {
  static final FFAppState _instance = FFAppState._internal();

  factory FFAppState() {
    return _instance;
  }

  FFAppState._internal();

  Future initializePersistedState() async {}

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  List<dynamic> _bookings = [jsonDecode('{}')];
  List<dynamic> get bookings => _bookings;
  set bookings(List<dynamic> _value) {
    _bookings = _value;
  }

  void addToBookings(dynamic _value) {
    _bookings.add(_value);
  }

  void removeFromBookings(dynamic _value) {
    _bookings.remove(_value);
  }

  void removeAtIndexFromBookings(int _index) {
    _bookings.removeAt(_index);
  }

  void updateBookingsAtIndex(
    int _index,
    dynamic Function(dynamic) updateFn,
  ) {
    _bookings[_index] = updateFn(_bookings[_index]);
  }

  dynamic _departFlight = jsonDecode('{}');
  dynamic get departFlight => _departFlight;
  set departFlight(dynamic _value) {
    _departFlight = _value;
  }

  dynamic _returnFlight = jsonDecode('{}');
  dynamic get returnFlight => _returnFlight;
  set returnFlight(dynamic _value) {
    _returnFlight = _value;
  }
}

LatLng? _latLngFromString(String? val) {
  if (val == null) {
    return null;
  }
  final split = val.split(',');
  final lat = double.parse(split.first);
  final lng = double.parse(split.last);
  return LatLng(lat, lng);
}

void _safeInit(Function() initializeField) {
  try {
    initializeField();
  } catch (_) {}
}

Future _safeInitAsync(Function() initializeField) async {
  try {
    await initializeField();
  } catch (_) {}
}
