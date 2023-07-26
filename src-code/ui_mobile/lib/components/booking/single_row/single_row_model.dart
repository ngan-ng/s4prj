import '/components/booking/block_seat/block_seat_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class SingleRowModel extends FlutterFlowModel {
  ///  State fields for stateful widgets in this component.

  // Models for BlockSeat dynamic component.
  late FlutterFlowDynamicModels<BlockSeatModel> blockSeatModels;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {
    blockSeatModels = FlutterFlowDynamicModels(() => BlockSeatModel());
  }

  void dispose() {
    blockSeatModels.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
